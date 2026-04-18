import React, { useEffect, useRef, useState } from "react";
import { Send, Sparkles, Trash2 } from "lucide-react";
import { useChatbot } from "./ChatbotContext";
import { ChatMessageBubble } from "./ChatMessage";

interface Props {
  /** Show the clear-conversation button. */
  showClear?: boolean;
  /** Optional extra class for the root container (widget overrides height). */
  className?: string;
}

const SUGGESTIONS = [
  "How do I upload a bank statement?",
  "What report types are available?",
  "How do I enable 2FA?",
  "Which file formats are supported?",
];

/** The actual chat surface - message list, typing indicator, input row.
 * Reused by the floating widget and the Help-page live-chat card. */
export const ChatPanel: React.FC<Props> = ({
  showClear = true,
  className = "",
}) => {
  const { messages, isSending, send, clear, markRead } = useChatbot();
  const [draft, setDraft] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom whenever messages change or typing indicator toggles.
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, isSending]);

  useEffect(() => {
    markRead();
  }, [markRead]);

  const handleSend = async () => {
    const text = draft.trim();
    if (!text || isSending) return;
    setDraft("");
    await send(text);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Show suggestions only when conversation is just the greeting.
  const showSuggestions = messages.length <= 1 && !isSending;

  return (
    <div
      className={`flex flex-col h-full bg-[var(--bg-secondary)] ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-color)]">
        <div className="flex items-center gap-2.5">
          <div
            aria-hidden
            className="w-8 h-8 rounded-full bg-[#14e7ff]/10 border border-[#14e7ff]/30 flex items-center justify-center"
          >
            <Sparkles size={15} className="text-[#14e7ff]" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              FINSURE Assistant
            </p>
            <p className="text-[11px] text-[var(--text-primary)] opacity-60">
              Ask anything about the app
            </p>
          </div>
        </div>

        {showClear && (
          <button
            type="button"
            onClick={clear}
            aria-label="Clear conversation"
            title="Clear conversation"
            className="p-1.5 rounded-md text-[var(--text-primary)]/60 hover:text-[#14e7ff] hover:bg-[#14e7ff]/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14e7ff]/50"
          >
            <Trash2 size={15} />
          </button>
        )}
      </div>

      {/* Messages */}
      <div
        ref={listRef}
        aria-live="polite"
        aria-label="Chat messages"
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5 scroll-smooth finsure-chat-scroll"
      >
        {messages.map((m) => (
          <ChatMessageBubble key={m.id} message={m} />
        ))}

        {isSending && (
          <div className="flex gap-2.5" aria-label="Assistant is typing">
            <div className="w-8 h-8 rounded-full bg-[#14e7ff]/10 border border-[#14e7ff]/30 flex items-center justify-center flex-shrink-0">
              <Sparkles size={14} className="text-[#14e7ff]" />
            </div>
            <div className="rounded-2xl rounded-tl-sm bg-[var(--bg-primary)] border border-[var(--border-color)] px-3.5 py-3 flex items-center gap-1.5">
              <span className="finsure-typing-dot" />
              <span
                className="finsure-typing-dot"
                style={{ animationDelay: "120ms" }}
              />
              <span
                className="finsure-typing-dot"
                style={{ animationDelay: "240ms" }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Suggestion chips */}
      {showSuggestions && (
        <div className="px-4 pb-2 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => send(s)}
              className="text-xs px-3 py-1.5 rounded-full border border-[var(--border-color)] text-[var(--text-primary)]/80 hover:text-[#14e7ff] hover:border-[#14e7ff]/50 hover:bg-[#14e7ff]/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14e7ff]/40"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="border-t border-[var(--border-color)] px-3 py-3 bg-[var(--bg-secondary)]">
        <div className="flex items-end gap-2">
          <label htmlFor="finsure-chat-input" className="sr-only">
            Message FINSURE Assistant
          </label>
          <textarea
            id="finsure-chat-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onKeyDown}
            rows={1}
            placeholder="Ask about FINSURE…"
            className="flex-1 resize-none max-h-28 bg-[var(--bg-primary)] border border-[var(--border-color)] focus:border-[#14e7ff]/60 focus:outline-none focus:ring-2 focus:ring-[#14e7ff]/20 rounded-xl px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-primary)]/40 transition-colors"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!draft.trim() || isSending}
            aria-label="Send message"
            className="w-11 h-11 flex-shrink-0 rounded-xl bg-[#0ab6ff] text-black font-semibold flex items-center justify-center hover:bg-[#14e7ff] transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14e7ff]/60 shadow-[0_0_0_1px_rgba(20,231,255,0.25)]"
          >
            <Send size={17} />
          </button>
        </div>
        <p className="mt-1.5 text-[10.5px] text-[var(--text-primary)]/40 px-1">
          Press Enter to send · Shift + Enter for a new line
        </p>
      </div>
    </div>
  );
};
