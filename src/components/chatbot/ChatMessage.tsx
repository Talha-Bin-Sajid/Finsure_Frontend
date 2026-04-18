import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Bot, User } from "lucide-react";
import type { ChatMessage as Msg } from "./ChatbotContext";

interface Props {
  message: Msg;
}

export const ChatMessageBubble: React.FC<Props> = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
      data-role={message.role}
    >
      <div
        aria-hidden
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border ${
          isUser
            ? "bg-[#0ab6ff]/15 border-[#0ab6ff]/40 text-[#14e7ff]"
            : "bg-[#14e7ff]/10 border-[#14e7ff]/30 text-[#14e7ff]"
        }`}
      >
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>

      <div
        className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed border ${
          isUser
            ? "bg-[#0ab6ff]/12 border-[#0ab6ff]/30 text-[var(--text-primary)] rounded-tr-sm"
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
    </div>
  );
};
