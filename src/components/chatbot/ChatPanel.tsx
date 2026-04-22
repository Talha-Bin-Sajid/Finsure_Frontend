import React, { useEffect, useRef, useState } from "react";
import { Send, Sparkles, Trash2, Wand2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

/**
 * The actual chat surface - message list, typing indicator, input row.
 * Reused by the floating widget and the Help-page live-chat card.
 */
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
      className={`flex flex-col h-full bg-transparent ${className}`}
    >
      {/* Header */}
      <div className="relative flex items-center justify-between px-4 py-3.5 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/60 backdrop-blur-sm">
        {/* Top gradient seam for depth */}
        <div
          aria-hidden
          className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[color:var(--accent)]/60 to-transparent"
        />
        <div className="flex items-center gap-2.5">
          <div
            aria-hidden
            className="relative w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, var(--accent), var(--accent-hover))",
              boxShadow:
                "0 6px 20px -6px var(--accent-glow)",
            }}
          >
            <Sparkles size={16} className="text-white" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[var(--bg-secondary)]" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              FINSURE Assistant
            </p>
            <p className="text-[11px] text-[var(--text-secondary)] flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-emerald-500" />
              Online · replies instantly
            </p>
          </div>
        </div>

        {showClear && (
          <button
            type="button"
            onClick={clear}
            aria-label="Clear conversation"
            title="Clear conversation"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-secondary)] hover:text-[color:var(--accent)] hover:bg-[color:var(--accent-soft)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-ring)]"
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
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth finsure-chat-scroll"
      >
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              layout
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <ChatMessageBubble message={m} />
            </motion.div>
          ))}
        </AnimatePresence>

        {isSending && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-2.5"
            aria-label="Assistant is typing"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent), var(--accent-hover))",
                boxShadow:
                  "0 4px 14px -4px var(--accent-glow)",
              }}
            >
              <Sparkles size={14} className="text-white" />
            </div>
            <div className="rounded-2xl rounded-tl-sm bg-[var(--bg-primary)] border border-[var(--border-color)] px-4 py-3 flex items-center gap-1.5">
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
          </motion.div>
        )}
      </div>

      {/* Suggestion chips */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className="px-4 pb-2 flex flex-wrap gap-2"
          >
            <p className="w-full text-[10px] font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1 flex items-center gap-1">
              <Wand2 size={10} />
              Try asking
            </p>
            {SUGGESTIONS.map((s, i) => (
              <motion.button
                key={s}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.04 }}
                whileHover={{ y: -1 }}
                type="button"
                onClick={() => send(s)}
                className="text-xs px-3 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)]/80 hover:text-[color:var(--accent)] hover:border-[color:var(--accent-ring)] hover:bg-[color:var(--accent-soft)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-ring)]"
              >
                {s}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <div className="border-t border-[var(--border-color)] px-3 py-3 bg-[var(--bg-secondary)]/80 backdrop-blur-sm">
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
            className="flex-1 resize-none max-h-28 bg-[var(--bg-primary)] border border-[var(--border-color)] focus:border-[color:var(--accent)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-ring)] rounded-xl px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/70 transition-all"
          />
          <motion.button
            whileHover={{ scale: draft.trim() && !isSending ? 1.05 : 1 }}
            whileTap={{ scale: draft.trim() && !isSending ? 0.94 : 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            type="button"
            onClick={handleSend}
            disabled={!draft.trim() || isSending}
            aria-label="Send message"
            className="w-11 h-11 flex-shrink-0 rounded-xl text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
            style={{
              background:
                "linear-gradient(135deg, var(--accent), var(--accent-hover))",
              boxShadow:
                draft.trim() && !isSending
                  ? "0 10px 24px -8px var(--accent-glow)"
                  : "none",
            }}
          >
            <Send size={17} />
          </motion.button>
        </div>
        <p className="mt-1.5 text-[10.5px] text-[var(--text-secondary)]/70 px-1">
          Press Enter to send · Shift + Enter for a new line
        </p>
      </div>
    </div>
  );
};
