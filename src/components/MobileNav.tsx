import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Upload,
  FileText,
  History,
  Info,
  Zap,
  DollarSign,
  HelpCircle,
  FileBarChart,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

/**
 * Bottom tab bar for mobile. We show the 5 most-used destinations so the
 * bar doesn't crowd. Everything else lives in the drawer / settings.
 */
export const MobileNav: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const publicLinks = [
    { to: "/", label: "About", icon: Info },
    { to: "/quickstart", label: "Start", icon: Zap },
    { to: "/pricing", label: "Pricing", icon: DollarSign },
    { to: "/faqs", label: "FAQs", icon: HelpCircle },
  ];

  // Trim to the 5 highest-traffic auth routes; the rest live in the topbar menu.
  const authenticatedLinks = [
    { to: "/dashboard", label: "Home", icon: LayoutDashboard },
    { to: "/upload", label: "Upload", icon: Upload },
    { to: "/extracted", label: "Review", icon: FileText },
    { to: "/history", label: "History", icon: History },
    { to: "/reports", label: "Reports", icon: FileBarChart },
  ];

  const links = isAuthenticated ? authenticatedLinks : publicLinks;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[var(--bg-secondary)]/85 backdrop-blur-xl border-t border-[var(--border-color)] md:hidden z-40">
      <div className="flex items-center justify-around px-2 py-1.5">
        {links.map((link) => {
          const isActive =
            location.pathname === link.to ||
            (link.to !== "/" &&
              location.pathname.startsWith(link.to + "/"));
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className="relative flex-1 flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium"
            >
              {isActive && (
                <motion.span
                  layoutId="mobile-nav-active"
                  className="absolute inset-x-3 inset-y-1 rounded-lg bg-[color:var(--accent-soft)]"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <span
                className={`relative z-10 transition-colors ${
                  isActive
                    ? "text-[color:var(--accent)]"
                    : "text-[var(--text-secondary)]"
                }`}
              >
                <link.icon size={20} />
              </span>
              <span
                className={`relative z-10 transition-colors ${
                  isActive
                    ? "text-[color:var(--accent)]"
                    : "text-[var(--text-secondary)]"
                }`}
              >
                {link.label}
              </span>
            </NavLink>
          );
        })}
      </div>
      {/* iOS home-indicator safe area */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
};
