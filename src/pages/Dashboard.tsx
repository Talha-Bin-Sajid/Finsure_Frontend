import React, { useEffect, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Upload,
  FileText,
  X,
  Plus,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  mockApi,
  accountsApi,
  historyApi,
  dashboardApi,
  banksApi,
  Bank,
} from "../services/apiClient";
import { toast } from "../utils/toast";
import { useAuth } from "../contexts/AuthContext";
import { AnimatedButton } from "../components/ui/AnimatedButton";

interface SummaryData {
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  taxableIncome: number;
}

interface RecentUpload {
  fileName: string;
  uploadDate: string;
  status: string;
  fileType: string;
}

interface ActivityItem {
  id: string;
  type: string;
  message: string;
  timestamp: string;
}

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [recentUploads, setRecentUploads] = useState<RecentUpload[]>([]);
  const [, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddAccountModal, setShowAddAccountModal] = useState(false);
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [isSubmittingAccount, setIsSubmittingAccount] = useState(false);
  const [banks, setBanks] = useState<Bank[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    banksApi.getAll().then(setBanks).catch(() => setBanks([]));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryData, activitiesData, history] = await Promise.all([
          dashboardApi.getOverview(),
          mockApi.dashboard.getActivities(),
          historyApi.getMyUploadHistory(),
        ]);
        setSummary(summaryData);
        setActivities(activitiesData);
        setRecentUploads(history.slice(0, 5));
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0,
    }).format(amount);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const handleAddAccount = async () => {
    if (!bankName || !accountNumber) {
      toast.error("Please fill all fields");
      return;
    }
    setIsSubmittingAccount(true);
    try {
      await accountsApi.addAccount({ bank: bankName, acc_no: accountNumber });
      toast.success("Bank account added successfully");
      setShowAddAccountModal(false);
      setBankName("");
      setAccountNumber("");
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Failed to add account");
    } finally {
      setIsSubmittingAccount(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[color:var(--accent)]" />
      </div>
    );
  }

  const summaryCards = summary
    ? [
        {
          title: "Total Income",
          value: formatCurrency(summary.totalIncome),
          icon: TrendingUp,
          accent: "text-emerald-500",
          tint: "bg-emerald-500/10 border-emerald-500/20",
          delta: "+12.4%",
        },
        {
          title: "Total Expenses",
          value: formatCurrency(summary.totalExpenses),
          icon: TrendingDown,
          accent: "text-rose-500",
          tint: "bg-rose-500/10 border-rose-500/20",
          delta: "-3.1%",
        },
        {
          title: "Net Profit",
          value: formatCurrency(summary.netProfit),
          icon: DollarSign,
          accent: "text-[color:var(--accent)]",
          tint: "bg-[color:var(--accent-soft)] border-[color:var(--accent-ring)]",
          delta: "+8.9%",
        },
        {
          title: "Taxable Income",
          value: formatCurrency(summary.taxableIncome),
          icon: Activity,
          accent: "text-amber-500",
          tint: "bg-amber-500/10 border-amber-500/20",
          delta: "+2.0%",
        },
      ]
    : [];

  return (
    <div className="space-y-8">
      {/* ===== Greeting header ===== */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[color:var(--accent-ring)] bg-[color:var(--accent-soft)] text-[color:var(--accent)] text-xs font-medium"
          >
            <Sparkles size={12} />
            You're all caught up
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)]"
          >
            Welcome back
            {user?.name ? `, ${user.name.split(" ")[0]}` : ""}.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="mt-1 text-[var(--text-secondary)]"
          >
            Here's the shape of your money today.
          </motion.p>
        </div>

        <div className="flex flex-wrap gap-2">
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowAddAccountModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm text-[color:var(--accent)] border border-[color:var(--accent-ring)] bg-[color:var(--accent-soft)] hover:bg-[var(--bg-tertiary)] transition-colors"
          >
            <Plus size={16} />
            Add account
          </motion.button>
          <AnimatedButton
            size="sm"
            onClick={() => navigate("/upload")}
            trailingIcon={<Upload size={14} />}
          >
            Upload file
          </AnimatedButton>
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/reports")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm text-[var(--text-primary)] border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-[color:var(--accent)] transition-colors"
          >
            <FileText size={16} />
            Reports
          </motion.button>
        </div>
      </div>

      {/* ===== Stat cards ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {summaryCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 + index * 0.06 }}
            whileHover={{ y: -3 }}
            className="group relative overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-5 hover:border-[color:var(--accent)]/50 hover:shadow-[0_20px_40px_-20px_var(--accent-glow)] transition-all"
          >
            {/* Corner glow on hover */}
            <div className="pointer-events-none absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[color:var(--accent)]/0 group-hover:bg-[color:var(--accent)]/10 blur-2xl transition-colors" />

            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-10 h-10 rounded-xl border flex items-center justify-center ${card.tint}`}
              >
                <card.icon className={card.accent} size={18} />
              </div>
              <span className="text-xs font-medium text-[var(--text-secondary)]">
                {card.delta}
              </span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
              {card.title}
            </p>
            <p className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">
              {card.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* ===== Recent uploads ===== */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border-color)]">
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              Recent uploads
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Your five most recent statement ingests.
            </p>
          </div>
          <button
            onClick={() => navigate("/history")}
            className="text-xs font-medium text-[color:var(--accent)] hover:text-[color:var(--accent-hover)] inline-flex items-center gap-1 transition-colors"
          >
            View all
            <ArrowUpRight size={14} />
          </button>
        </div>

        {recentUploads.length === 0 ? (
          <div className="text-center py-14 px-6">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-[color:var(--accent-soft)] border border-[color:var(--accent-ring)] flex items-center justify-center mb-4">
              <Upload className="text-[color:var(--accent)]" size={22} />
            </div>
            <p className="text-[var(--text-primary)] font-medium">
              No uploads yet
            </p>
            <p className="text-sm text-[var(--text-secondary)] mt-1 mb-5">
              Upload your first statement to see it here.
            </p>
            <AnimatedButton
              size="sm"
              onClick={() => navigate("/upload")}
              trailingIcon={<Upload size={14} />}
            >
              Upload your first file
            </AnimatedButton>
          </div>
        ) : (
          <ul className="divide-y divide-[var(--border-color)]">
            {recentUploads.map((upload, i) => (
              <motion.li
                key={`${upload.fileName}-${upload.uploadDate}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.35 + i * 0.05 }}
                onClick={() => navigate("/history")}
                className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-[var(--bg-tertiary)]/60 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-[color:var(--accent-soft)] border border-[color:var(--accent-ring)] flex items-center justify-center shrink-0">
                    <FileText
                      className="text-[color:var(--accent)]"
                      size={16}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                      {upload.fileName}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      {formatDate(upload.uploadDate)}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium shrink-0 ${
                    upload.status === "completed"
                      ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                  }`}
                >
                  {upload.status}
                </span>
              </motion.li>
            ))}
          </ul>
        )}
      </motion.div>

      {/* ===== Add Account modal ===== */}
      <AnimatePresence>
        {showAddAccountModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddAccountModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl w-full max-w-md p-6 relative shadow-[0_40px_80px_-30px_var(--accent-glow)]"
            >
              <button
                onClick={() => setShowAddAccountModal(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-secondary)] hover:text-red-400 hover:bg-red-500/10 transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>

              <h2 className="text-xl font-bold text-[var(--text-primary)]">
                Add bank account
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mt-1 mb-5">
                We'll use this to route future statement uploads.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                    Bank
                  </label>
                  <select
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl px-3.5 py-3 text-[var(--text-primary)] focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent-ring)] focus:outline-none transition-all"
                  >
                    <option value="">Select bank</option>
                    {banks.map((b) => (
                      <option key={b.id} value={b.name}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                    Account number
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="0000 0000 0000"
                    value={accountNumber}
                    onChange={(e) =>
                      setAccountNumber(e.target.value.replace(/\D/g, ""))
                    }
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl px-3.5 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent-ring)] focus:outline-none transition-all"
                  />
                </div>

                <AnimatedButton
                  size="md"
                  className="w-full"
                  disabled={isSubmittingAccount}
                  onClick={handleAddAccount}
                >
                  {isSubmittingAccount ? "Saving…" : "Save account"}
                </AnimatedButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
