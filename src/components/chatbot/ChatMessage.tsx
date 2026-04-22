import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Sparkles, User } from "lucide-react";
import type { ChatMessage as Msg } from "./ChatbotContext";

interface Props {
  message: Msg;
}

const formatTime = (ts: number) =>
  new Date(ts).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

export const ChatMessageBubble: React.FC<Props> = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`group flex gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
      data-role={message.role}
    >
      {/* Avatar */}
      {isUser ? (
        <div
          aria-hidden
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)]"
        >
          <User size={15} />
        </div>
      ) : (
        <div
          aria-hidden
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white"
          style={{
            background:
              "linear-gradient(135deg, var(--accent), var(--accent-hover))",
            boxShadow: "0 4px 14px -4px var(--accent-glow)",
          }}
        >
          <Sparkles size={14} />
        </div>
      )}

      {/* Bubble + timestamp */}
      <div
        className={`flex flex-col max-w-[82%] ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed border shadow-sm ${
            isUser
              ? "bg-[color:var(--accent-soft)] border-[color:var(--accent-ring)] text-[var(--text-primary)] rounded-tr-sm"
              : message.error
              ? "bg-red-500/10 border-red-500/30 text-[var(--text-primary)] rounded-tl-sm"
              : "bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-primary)] rounded-tl-sm"
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          ) : (
            <div className="finsure-chat-md break-words">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
        <span
          className={`text-[10px] text-[var(--text-secondary)]/60 mt-1 px-1 opacity-0 group-hover:opacity-100 transition-opacity ${
            isUser ? "text-right" : "text-left"
          }`}
        >
          {formatTime(message.createdAt)}
        </span>
      </div>
    </div>
  );
};
