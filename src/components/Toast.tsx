import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { toastManager } from "../utils/toast";

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
}

const TONES: Record<
  Toast["type"],
  { icon: React.ComponentType<any>; iconColor: string; accent: string }
> = {
  success: {
    icon: CheckCircle,
    iconColor: "text-emerald-500",
    accent: "from-emerald-500 to-emerald-400",
  },
  error: {
    icon: XCircle,
    iconColor: "text-rose-500",
    accent: "from-rose-500 to-rose-400",
  },
  warning: {
    icon: AlertTriangle,
    iconColor: "text-amber-500",
    accent: "from-amber-500 to-amber-400",
  },
  info: {
    icon: Info,
    iconColor: "text-[color:var(--accent)]",
    accent: "from-[color:var(--accent)] to-[color:var(--accent-hover)]",
  },
};

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const unsubscribe = toastManager.subscribe(setToasts);
    return unsubscribe;
  }, []);

  return (
    <div className="fixed top-4 right-4 z-[70] flex flex-col gap-2 max-w-md w-[calc(100vw-2rem)] md:w-auto pointer-events-none">
      <AnimatePresence initial={false}>
        {toasts.map((toast) => {
          const tone = TONES[toast.type];
          const Icon = tone.icon;
          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, x: 32, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 32, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="pointer-events-auto relative overflow-hidden bg-[var(--bg-secondary)]/90 backdrop-blur-xl border border-[var(--border-color)] rounded-xl p-3.5 pl-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] flex items-start gap-3"
            >
              {/* Left accent strip */}
              <span
                aria-hidden
                className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${tone.accent}`}
              />
              <Icon size={18} className={`${tone.iconColor} flex-shrink-0 mt-0.5`} />
              <p className="flex-1 text-sm text-[var(--text-primary)] leading-snug">
                {toast.message}
              </p>
              <button
                onClick={() => toastManager.dismiss(toast.id)}
                aria-label="Dismiss"
                className="w-6 h-6 flex items-center justify-center rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors flex-shrink-0"
              >
                <X size={14} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
