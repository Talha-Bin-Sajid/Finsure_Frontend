import React from "react";
import { ChatPanel } from "./ChatPanel";

/** Full-height chat card used inside the Help page.
 *
 * Unlike the floating widget, this card is always mounted and visible;
 * it shares messages with the widget through `ChatbotProvider`. */
export const LiveChatCard: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div
      className={[
        "rounded-2xl overflow-hidden border border-[var(--border-color)]",
        "bg-[var(--bg-secondary)] shadow-[0_0_0_1px_rgba(20,231,255,0.08)]",
        "h-[560px] flex",
        className,
      ].join(" ")}
    >
      <ChatPanel className="w-full" showClear />
    </div>
  );
};
