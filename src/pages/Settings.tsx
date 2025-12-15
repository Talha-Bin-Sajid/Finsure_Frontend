import React, { useState } from 'react';
import { User, Lock, Bell, Download, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '../utils/toast';

export const Settings: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile updated successfully');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    toast.success('Password changed successfully');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleNotificationsUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Notification preferences updated');
  };

  const handleDataExport = () => {
    toast.info('Preparing your data export. You will receive an email when ready.');
  };

  const handleAccountDelete = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      toast.error('Account deletion initiated. You will receive a confirmation email.');
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'data', label: 'Data & Privacy', icon: Download }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Settings</h1>
        <p className="text-[var(--text-secondary)]">Manage your account settings and preferences</p>
      </div>

      <div className="flex gap-6 flex-col lg:flex-row">
        <div className="lg:w-64 flex-shrink-0">
          <nav className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#14e7ff]/20 text-[#14e7ff]'
                    : 'text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
                }`}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1">
          {activeTab === 'profile' && (
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-6">
              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Profile Information</h2>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-lg px-4 py-3 focus:border-[#14e7ff] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-lg px-4 py-3 focus:border-[#14e7ff] focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#0ab6ff] hover:bg-[#14e7ff] text-[#0c111a] px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-6">
              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Change Password</h2>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-lg px-4 py-3 focus:border-[#14e7ff] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-lg px-4 py-3 focus:border-[#14e7ff] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-lg px-4 py-3 focus:border-[#14e7ff] focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#0ab6ff] hover:bg-[#14e7ff] text-[#0c111a] px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Update Password
                </button>
              </form>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-6">
              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Notification Preferences</h2>
              <form onSubmit={handleNotificationsUpdate} className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[var(--bg-primary)] rounded-lg">
                  <div>
                    <h3 className="text-[var(--text-primary)] font-medium">Email Notifications</h3>
                    <p className="text-sm text-[var(--text-secondary)]">Receive updates via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emailNotifications}
                      onChange={(e) => setEmailNotifications(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[var(--bg-secondary)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#14e7ff]"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-[var(--bg-primary)] rounded-lg">
                  <div>
                    <h3 className="text-[var(--text-primary)] font-medium">Push Notifications</h3>
                    <p className="text-sm text-[var(--text-secondary)]">Receive browser notifications</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pushNotifications}
                      onChange={(e) => setPushNotifications(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[var(--bg-secondary)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#14e7ff]"></div>
                  </label>
                </div>
                <button
                  type="submit"
                  className="bg-[#0ab6ff] hover:bg-[#14e7ff] text-[#0c111a] px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Save Preferences
                </button>
              </form>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="space-y-6">
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-6">
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Export Your Data</h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  Download a copy of all your data including transactions, reports, and documents.
                </p>
                <button
                  onClick={handleDataExport}
                  className="flex items-center gap-2 bg-[#0ab6ff] hover:bg-[#14e7ff] text-[#0c111a] px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <Download size={18} />
                  <span>Request Data Export</span>
                </button>
              </div>

              <div className="bg-[var(--bg-secondary)] border border-red-500/20 rounded-lg p-6">
                <h2 className="text-xl font-bold text-red-400 mb-4">Delete Account</h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <button
                  onClick={handleAccountDelete}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <Trash2 size={18} />
                  <span>Delete Account</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};