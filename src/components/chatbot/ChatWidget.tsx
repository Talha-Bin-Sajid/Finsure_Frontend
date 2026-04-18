import React, { useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { useChatbot } from "./ChatbotContext";
import { ChatPanel } from "./ChatPanel";

/** Floating bottom-right chat launcher + sliding panel.
 *
 * The button is sticky (fixed) to the viewport so it stays visible as the
 * user scrolls. Clicking it toggles a panel that mounts `ChatPanel`. */
export const ChatWidget: React.FC = () => {
  const { isOpen, toggle, close, unread } = useChatbot();

  // Close on Escape for quick dismissal.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  return (
    <>
      {/* Floating action button */}
      <button
        type="button"
        onClick={toggle}
        aria-label={isOpen ? "Close chat" : "Open FINSURE Assistant"}
        aria-expanded={isOpen}
        aria-controls="finsure-chat-widget-panel"
        className={[
          "fixed z-[60] right-5 bottom-5 md:right-6 md:bottom-6",
          "w-14 h-14 rounded-full flex items-center justify-center",
          "bg-[#0ab6ff] text-black shadow-[0_10px_30px_-8px_rgba(20,231,255,0.55),0_0_0_1px_rgba(20,231,255,0.45)]",
          "hover:bg-[#14e7ff] transition-all duration-200",
          "focus:outline-none focus-visible:ring-4 focus-visible:ring-[#14e7ff]/35",
          isOpen ? "rotate-0" : "hover:scale-[1.04]",
        ].join(" ")}
      >
        {isOpen ? <X size={22} strokeWidth={2.2} /> : <MessageCircle size={24} strokeWidth={2.2} />}

        {/* Unread indicator */}
        {!isOpen && unread > 0 && (
          <span
            aria-label={`${unread} unread`}
            className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 rounded-full bg-red-500 text-white text-[10px] font-semibold flex items-center justify-center border-2 border-[var(--bg-primary)]"
          >
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {/* Panel */}
      <div
        id="finsure-chat-widget-panel"
        role="dialog"
        aria-modal="false"
        aria-label="FINSURE Assistant"
        aria-hidden={!isOpen}
        className={[
          "fixed z-[59] right-4 md:right-6",
          "bottom-[88px] md:bottom-[96px]",
          "w-[min(380px,calc(100vw-2rem))] h-[min(560px,calc(100vh-120px))]",
          "rounded-2xl overflow-hidden border border-[var(--border-color)]",
          "bg-[var(--bg-secondary)] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.55),0_0_0_1px_rgba(20,231,255,0.15)]",
          "transition-all duration-200 origin-bottom-right",
          isOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-2 scale-95 pointer-events-none",
        ].join(" ")}
      >
        {/* Only render the panel contents when open to avoid running effects in the background. */}
        {isOpen && <ChatPanel showClear />}
      </div>
    </>
  );
};
