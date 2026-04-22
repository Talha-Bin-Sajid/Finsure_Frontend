import React, { useState, useEffect } from "react";
import {
  Filter,
  ChevronDown,
  FileText,
  Calendar,
  Search,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { historyApi, banksApi, Bank } from "../services/apiClient";
import { useNavigate } from "react-router-dom";

interface HistoryItem {
  fileName: string;
  uploadDate: string;
  status: string;
  fileType: string;
  bank: string;
  transactionCount: number;
}

export const History: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<HistoryItem[]>([]);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBank, setSelectedBank] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [historyData, banksData] = await Promise.all([
          historyApi.getMyUploadHistory(),
          banksApi.getAll(),
        ]);
        setHistory(historyData);
        setFilteredHistory(historyData);
        setBanks(banksData);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...history];
    if (selectedBank !== "all")
      filtered = filtered.filter((item) => item.bank === selectedBank);
    if (selectedStatus !== "all")
      filtered = filtered.filter((item) => item.status === selectedStatus);
    const q = query.trim().toLowerCase();
    if (q) filtered = filtered.filter((item) => item.fileName.toLowerCase().includes(q));
    setFilteredHistory(filtered);
  }, [selectedBank, selectedStatus, query, history]);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[color:var(--accent)]" />
      </div>
    );
  }

  const activeFilterCount =
    (selectedBank !== "all" ? 1 : 0) + (selectedStatus !== "all" ? 1 : 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[color:var(--accent-ring)] bg-[color:var(--accent-soft)] text-[color:var(--accent)] text-xs font-medium"
          >
            <Sparkles size={12} />
            {history.length} total uploads
          </motion.div>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
            Upload history
          </h1>
          <p className="mt-1 text-[var(--text-secondary)]">
            Every statement you've ingested. Click any row to jump into its
            extracted transactions.
          </p>
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowFilters((v) => !v)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm text-[color:var(--accent)] border border-[color:var(--accent-ring)] bg-[color:var(--accent-soft)] hover:bg-[var(--bg-tertiary)] transition-colors self-start"
        >
          <Filter size={16} />
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-[color:var(--accent)] text-white">
              {activeFilterCount}
            </span>
          )}
          <ChevronDown
            size={16}
            className={`transition-transform ${showFilters ? "rotate-180" : ""}`}
          />
        </motion.button>
      </div>

      {/* Search + Filters */}
      <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-4 space-y-4">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by file name…"
            className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/70 pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border-color)] focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent-ring)] focus:outline-none transition-all text-sm"
          />
        </div>

        <AnimatePresence initial={false}>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[var(--border-color)]">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                    Bank
                  </label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-lg px-3 py-2.5 text-sm focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent-ring)] focus:outline-none"
                  >
                    <option value="all">All banks</option>
                    {banks.map((b) => (
                      <option key={b.id} value={b.name}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                    Status
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-lg px-3 py-2.5 text-sm focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent-ring)] focus:outline-none"
                  >
                    <option value="all">All statuses</option>
                    <option value="completed">Completed</option>
                    <option value="processing">Processing</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* List */}
      <div className="space-y-3">
        {filteredHistory.length === 0 ? (
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-12 text-center">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-[color:var(--accent-soft)] border border-[color:var(--accent-ring)] flex items-center justify-center mb-4">
              <FileText className="text-[color:var(--accent)]" size={22} />
            </div>
            <p className="text-[var(--text-primary)] font-medium">
              No files match your filters
            </p>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Try clearing the filter or searching by a different name.
            </p>
          </div>
        ) : (
          filteredHistory.map((item, i) => (
            <motion.div
              key={`${item.fileName}-${item.uploadDate}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.3) }}
              whileHover={{ y: -2 }}
              onClick={() => navigate("/extracted")}
              className="group bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[color:var(--accent)]/60 hover:shadow-[0_12px_30px_-20px_var(--accent-glow)] rounded-2xl p-5 transition-all cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-[color:var(--accent-soft)] border border-[color:var(--accent-ring)] flex items-center justify-center flex-shrink-0">
                    <FileText className="text-[color:var(--accent)]" size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-[var(--text-primary)] truncate">
                      {item.fileName}
                    </h3>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--text-secondary)]">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(item.uploadDate)}
                      </span>
                      <span>{item.transactionCount} transactions</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-[color:var(--accent-soft)] text-[color:var(--accent)] border border-[color:var(--accent-ring)]">
                    {item.bank}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-color)]">
                    {item.fileType.replace(/_/g, " ")}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-medium border ${
                      item.status === "completed"
                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {filteredHistory.length > 0 && (
        <div className="flex justify-center pt-2">
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-lg hover:border-[color:var(--accent)] text-sm transition-colors disabled:opacity-50">
              Previous
            </button>
            <span className="text-sm text-[var(--text-secondary)] px-3">
              Page 1 of 1
            </span>
            <button className="px-4 py-2 bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-lg hover:border-[color:var(--accent)] text-sm transition-colors disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
