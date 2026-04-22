import React, { useState } from "react";
import {
  User,
  Lock,
  Bell,
  Download,
  Trash2,
  Sparkles,
  Save,
  Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "../utils/toast";
import { authApi } from "../services/apiClient";

type TabId = "profile" | "security" | "notifications" | "data";

export const Settings: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState<TabId>("profile");

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await authApi.updateProfile({ name, email });
      toast.success(res.message || "Profile updated successfully");
      const updatedUser = {
        ...user!,
        name: res.user.name,
        email: res.user.email,
      };
      updateUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Failed to update profile");
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const res = await authApi.changePassword({
        current_password: currentPassword,
        new_password: newPassword,
      });
      toast.success(res.message || "Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Failed to change password");
    }
  };

  const handleNotificationsUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Notification preferences updated");
  };

  const handleDataExport = () => {
    toast.info("Preparing your data export. You will receive an email when ready.");
  };

  const handleAccountDelete = () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      toast.error(
        "Account deletion initiated. You will receive a confirmation email."
      );
    }
  };

  const tabs: { id: TabId; label: string; icon: any }[] = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Password", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "data", label: "Data & Privacy", icon: Download },
  ];

  const inputCls =
    "w-full bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-xl px-4 py-2.5 text-sm focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent-ring)] focus:outline-none transition-all";
  const labelCls =
    "block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5";
  const primaryBtn =
    "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-medium text-sm shadow-[0_10px_30px_-10px_var(--accent-glow)]";
  const primaryBtnStyle = {
    background:
      "linear-gradient(135deg, var(--accent), var(--accent-hover))",
  } as const;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[color:var(--accent-ring)] bg-[color:var(--accent-soft)] text-[color:var(--accent)] text-xs font-medium"
        >
          <Sparkles size={12} />
          Account preferences
        </motion.div>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
          Settings
        </h1>
        <p className="mt-1 text-[var(--text-secondary)]">
          Fine-tune your profile, security, notifications and data.
        </p>
      </div>

      <div className="flex gap-6 flex-col lg:flex-row">
        {/* Side nav */}
        <aside className="lg:w-64 flex-shrink-0">
          <nav className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-2 relative">
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                >
                  {active && (
                    <motion.span
                      layoutId="settings-tab-pill"
                      className="absolute inset-0 rounded-xl bg-[color:var(--accent-soft)] border border-[color:var(--accent-ring)]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span
                    className={`relative flex items-center gap-3 ${
                      active
                        ? "text-[color:var(--accent)]"
                        : "text-[var(--text-primary)] hover:text-[color:var(--accent)]"
                    }`}
                  >
                    <tab.icon size={16} />
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Panels */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "profile" && (
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[color:var(--accent-soft)] border border-[color:var(--accent-ring)] flex items-center justify-center">
                      <User className="text-[color:var(--accent)]" size={18} />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                        Profile information
                      </h2>
                      <p className="text-xs text-[var(--text-secondary)]">
                        Shown across the app and on your exported reports.
                      </p>
                    </div>
                  </div>
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div>
                      <label className={labelCls}>Full name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputCls}
                      />
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className={primaryBtn}
                      style={primaryBtnStyle}
                    >
                      <Save size={16} />
                      Save changes
                    </motion.button>
                  </form>
                </div>
              )}

              {activeTab === "security" && (
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[color:var(--accent-soft)] border border-[color:var(--accent-ring)] flex items-center justify-center">
                      <Shield className="text-[color:var(--accent)]" size={18} />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                        Change password
                      </h2>
                      <p className="text-xs text-[var(--text-secondary)]">
                        Use at least 8 characters with a mix of letters and numbers.
                      </p>
                    </div>
                  </div>
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                      <label className={labelCls}>Current password</label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className={inputCls}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>New password</label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Confirm new password</label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={inputCls}
                        />
                      </div>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className={primaryBtn}
                      style={primaryBtnStyle}
                    >
                      <Save size={16} />
                      Update password
                    </motion.button>
                  </form>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[color:var(--accent-soft)] border border-[color:var(--accent-ring)] flex items-center justify-center">
                      <Bell className="text-[color:var(--accent)]" size={18} />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                        Notifications
                      </h2>
                      <p className="text-xs text-[var(--text-secondary)]">
                        Choose how and when we reach you.
                      </p>
                    </div>
                  </div>
                  <form onSubmit={handleNotificationsUpdate} className="space-y-3">
                    <ToggleRow
                      title="Email notifications"
                      desc="Monthly digest and important alerts via email"
                      checked={emailNotifications}
                      onChange={setEmailNotifications}
                    />
                    <ToggleRow
                      title="Push notifications"
                      desc="Browser pushes for jobs finishing and anomalies"
                      checked={pushNotifications}
                      onChange={setPushNotifications}
                    />
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className={`${primaryBtn} mt-2`}
                      style={primaryBtnStyle}
                    >
                      <Save size={16} />
                      Save preferences
                    </motion.button>
                  </form>
                </div>
              )}

              {activeTab === "data" && (
                <div className="space-y-6">
                  <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[color:var(--accent-soft)] border border-[color:var(--accent-ring)] flex items-center justify-center">
                        <Download className="text-[color:var(--accent)]" size={18} />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                          Export your data
                        </h2>
                        <p className="text-xs text-[var(--text-secondary)]">
                          A zipped archive of every transaction, report and
                          uploaded document.
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDataExport}
                      className={primaryBtn}
                      style={primaryBtnStyle}
                    >
                      <Download size={16} />
                      Request export
                    </motion.button>
                  </div>

                  <div className="bg-[var(--bg-secondary)] border border-rose-500/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                        <Trash2 className="text-rose-500" size={18} />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-rose-500">
                          Delete account
                        </h2>
                        <p className="text-xs text-[var(--text-secondary)]">
                          This is permanent. All data will be erased.
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAccountDelete}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-medium text-sm transition-colors"
                    >
                      <Trash2 size={16} />
                      Delete account
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// Reusable toggle row
const ToggleRow: React.FC<{
  title: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}> = ({ title, desc, checked, onChange }) => (
  <div className="flex items-center justify-between p-4 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl">
    <div>
      <h3 className="text-[var(--text-primary)] font-medium text-sm">{title}</h3>
      <p className="text-xs text-[var(--text-secondary)] mt-0.5">{desc}</p>
    </div>
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors ${
        checked ? "bg-[color:var(--accent)]" : "bg-[var(--bg-tertiary)]"
      }`}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow ${
          checked ? "left-[22px]" : "left-0.5"
        }`}
      />
    </button>
  </div>
);
