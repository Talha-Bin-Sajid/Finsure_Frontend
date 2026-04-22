import React from "react";
import { Outlet } from "react-router-dom";
import { PublicNavbar } from "../components/public/PublicNavbar";
import { PublicFooter } from "../components/public/PublicFooter";

/**
 * Public marketing shell.
 *
 * Fixed translucent nav + page content + footer. We deliberately do NOT
 * wrap <Outlet /> in <AnimatePresence mode="wait">: Outlet reads the live
 * router context, so the exiting page instantly flips to the new route's
 * content mid-exit. Combined with per-page layoutId pills (Pricing's
 * billing toggle, nav pill) that raced on route change and crashed the
 * render. Each page does its own entrance animation on mount.
 */
export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <PublicNavbar />

      {/* Spacer so content isn't hidden under the fixed navbar */}
      <div className="h-16" aria-hidden />

      <main className="flex-1">
        <Outlet />
      </main>

      <PublicFooter />
    </div>
  );
};
