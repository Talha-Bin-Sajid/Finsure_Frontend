import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Decorative animated background: two blurred cyan orbs that drift in a
 * lazy loop. Sits behind hero sections to add depth without stealing focus.
 *
 * - pointer-events-none so it never blocks clicks
 * - aria-hidden so screen readers skip it
 * - gives up animating when the user asks for reduced motion
 */
export const GradientOrbs: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const reduce = useReducedMotion();

  const orbBase =
    "absolute rounded-full blur-3xl mix-blend-screen opacity-60 dark:opacity-70";

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <motion.div
        className={`${orbBase} w-[520px] h-[520px] -top-40 -left-40 bg-[#14e7ff]/30`}
        animate={
          reduce
            ? undefined
            : {
                x: [0, 60, -20, 0],
                y: [0, 40, 80, 0],
              }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className={`${orbBase} w-[420px] h-[420px] top-20 right-[-120px] bg-[#0ab6ff]/25`}
        animate={
          reduce
            ? undefined
            : {
                x: [0, -40, 30, 0],
                y: [0, 80, 20, 0],
              }
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className={`${orbBase} w-[360px] h-[360px] bottom-[-100px] left-1/3 bg-[#14e7ff]/20`}
        animate={
          reduce
            ? undefined
            : {
                x: [0, 30, -30, 0],
                y: [0, -40, -10, 0],
              }
        }
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};
