import React from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";

/**
 * A scroll-triggered fade + rise wrapper.
 *
 * Wrap any landing/public section in <Section> to get a tasteful 'whoosh
 * into view' once it scrolls past the viewport edge. Respects the user's
 * prefers-reduced-motion setting by falling back to instant fade-in.
 */
export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "article";
  delay?: number;
  /** px-rise distance before animating to rest. Default 24. */
  offset?: number;
  /** How much of the section must be visible before it fires. */
  amount?: number | "some" | "all";
  /** If true, animation runs every time it enters view (default once). */
  replay?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  as = "section",
  delay = 0,
  offset = 24,
  amount = 0.15,
  replay = false,
  children,
  className = "",
  ...rest
}) => {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : offset },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0.2 : 0.65,
        ease: [0.22, 1, 0.36, 1], // expo-ish ease-out
        delay,
      },
    },
  };

  const MotionTag = motion[as] as typeof motion.section;

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !replay, amount }}
      variants={variants}
      className={className}
      {...(rest as any)}
    >
      {children}
    </MotionTag>
  );
};
