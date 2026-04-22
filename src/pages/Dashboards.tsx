import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Sparkles } from "lucide-react";
import { SupersetDashboard } from "../components/dashboards/SupersetDashboard";

export const Dashboards: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6 md:p-8">
        {/* Gradient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--accent) 35%, transparent) 0%, transparent 65%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative flex items-start gap-4"
        >
          <div
            className="hidden sm:flex w-12 h-12 rounded-2xl items-center justify-center text-white shadow-[0_10px_30px_-10px_var(--accent-glow)]"
            style={{
              background:
                "linear-gradient(135deg, var(--accent), var(--accent-hover))",
            }}
          >
            <BarChart3 size={22} />
          </div>
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[color:var(--accent-ring)] bg-[color:var(--accent-soft)] text-[color:var(--accent)] text-xs font-medium">
              <Sparkles size={12} />
              Powered by Apache Superset
            </div>
            <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              Visual dashboards
            </h1>
            <p className="mt-1 text-[var(--text-secondary)] max-w-2xl">
              Interactive charts and visualizations of your financial data.
              Drill down into any metric without leaving the app.
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl overflow-hidden"
      >
        <SupersetDashboard />
      </motion.div>
    </div>
  );
};
