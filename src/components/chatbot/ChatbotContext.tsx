import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { askChatbot, ChatTurn } from "./chatApi";

/** Single message stored in the UI - adds id and timestamps on top of the wire format. */
export interface ChatMessage extends ChatTurn {
  id: string;
  createdAt: number;
  error?: boolean;
}

interface ChatbotContextValue {
  messages: ChatMessage[];
  isOpen: boolean;
  isSending: boolean;
  unread: number;
  open: () => void;
  close: () => void;
  toggle: () => void;
  send: (text: string) => Promise<void>;
  clear: () => void;
  markRead: () => void;
}

const ChatbotContext = createContext<ChatbotContextValue | null>(null);

const STORAGE_KEY = "finsure.chatbot.messages";
const HISTORY_WINDOW = 6; // how many recent turns to send to the backend

const makeId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const greeting = (): ChatMessage => ({
  id: makeId(),
  role: "assistant",
  content:
    "Hi! I'm the **FINSURE Assistant**. Ask me about uploading documents, reviewing extracted transactions, generating reports, dashboards, security, or anything else about the app.",
  createdAt: Date.now(),
});

function loadInitial(): ChatMessage[] {
  if (typeof window === "undefined") return [greeting()];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [greeting()];
    const parsed = JSON.parse(raw) as ChatMessage[];
    if (!Array.isArray(parsed) || parsed.length === 0) return [greeting()];
    return parsed;
  } catch {
    return [greeting()];
  }
}

export const ChatbotProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(loadInitial);
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [unread, setUnread] = useState(0);
  const inflight = useRef<AbortController | null>(null);

  // Persist conversation.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore quota errors
    }
  }, [messages]);

  const open = useCallback(() => {
    setIsOpen(true);
    setUnread(0);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(
    () =>
      setIsOpen((v) => {
        if (!v) setUnread(0);
        return !v;
      }),
    [],
  );
  const markRead = useCallback(() => setUnread(0), []);

  const clear = useCallback(() => {
    inflight.current?.abort();
    inflight.current = null;
    setMessages([greeting()]);
    setIsSending(false);
  }, []);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isSending) return;

      const userMsg: ChatMessage = {
        id: makeId(),
        role: "user",
        content: trimmed,
        createdAt: Date.now(),
      };

      // Snapshot history *before* we append so we send exactly the prior turns
      // to the backend (not the new user message - that goes in `query`).
      const historyForApi: ChatTurn[] = messages
        .filter((m) => !m.error)
        .slice(-HISTORY_WINDOW)
        .map(({ role, content }) => ({ role, content }));

      setMessages((prev) => [...prev, userMsg]);
      setIsSending(true);

      const controller = new AbortController();
      inflight.current = controller;

      try {
        const response = await askChatbot({
          query: trimmed,
          history: historyForApi,
          signal: controller.signal,
        });

        setMessages((prev) => [
          ...prev,
          {
            id: makeId(),
            role: "assistant",
            content: response,
            createdAt: Date.now(),
          },
        ]);

        // Bump unread only if the widget/panel is closed when the reply arrives.
        setUnread((u) => (isOpen ? u : u + 1));
      } catch (err: unknown) {
        if (controller.signal.aborted) return;
        const detail =
          (err as { response?: { data?: { detail?: string } } })?.response?.data
            ?.detail ||
          (err as Error)?.message ||
          "Something went wrong. Please try again.";
        setMessages((prev) => [
          ...prev,
          {
            id: makeId(),
            role: "assistant",
            content: `⚠️ ${detail}`,
            createdAt: Date.now(),
            error: true,
          },
        ]);
      } finally {
        if (inflight.current === controller) inflight.current = null;
        setIsSending(false);
      }
    },
    [messages, isOpen, isSending],
  );

  const value = useMemo<ChatbotContextValue>(
    () => ({
      messages,
      isOpen,
      isSending,
      unread,
      open,
      close,
      toggle,
      send,
      clear,
      markRead,
    }),
    [
      messages,
      isOpen,
      isSending,
      unread,
      open,
      close,
      toggle,
      send,
      clear,
      markRead,
    ],
  );

  return (
    <ChatbotContext.Provider value={value}>{children}</ChatbotContext.Provider>
  );
};

export function useChatbot(): ChatbotContextValue {
  const ctx = useContext(ChatbotContext);
  if (!ctx)
    throw new Error("useChatbot must be used inside a <ChatbotProvider>");
  return ctx;
}
