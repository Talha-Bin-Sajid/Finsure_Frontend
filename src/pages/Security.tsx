import React, { useState } from 'react';
import { Shield, Smartphone, Lock, CheckCircle } from 'lucide-react';
import { toast } from '../utils/toast';

export const Security: React.FC = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [showSetup, setShowSetup] = useState(false);

  const handleEnable2FA = () => {
    setShowSetup(true);
  };

  const handleVerify2FA = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode === '123456') {
      setTwoFactorEnabled(true);
      setShowSetup(false);
      setVerificationCode('');
      toast.success('Two-factor authentication enabled successfully!');
    } else {
      toast.error('Invalid verification code');
    }
  };

  const handleDisable2FA = () => {
    if (confirm('Are you sure you want to disable two-factor authentication?')) {
      setTwoFactorEnabled(false);
      toast.success('Two-factor authentication disabled');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Security Settings</h1>
        <p className="text-[var(--text-secondary)]">
          Manage your account security and authentication methods
        </p>
      </div>

      <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-[#14e7ff]/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Shield className="text-[#14e7ff]" size={24} />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">Two-Factor Authentication</h2>
            <p className="text-[var(--text-primary)] opacity-70 mb-4">
              Add an extra layer of security to your account by enabling two-factor authentication.
              You'll need to enter a code from your authenticator app when signing in.
            </p>
            {twoFactorEnabled ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-green-400/10 text-green-400 rounded-lg">
                  <CheckCircle size={20} />
                  <span className="font-medium">Enabled</span>
                </div>
                <button
                  onClick={handleDisable2FA}
                  className="px-6 py-2 bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-lg font-medium transition-colors"
                >
                  Disable
                </button>
              </div>
            ) : (
              <button
                onClick={handleEnable2FA}
                className="bg-[#0ab6ff] hover:bg-[#14e7ff] text-[#0c111a] px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Enable 2FA
              </button>
            )}
          </div>
        </div>
      </div>

      {showSetup && !twoFactorEnabled && (
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-6">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Set Up Two-Factor Authentication</h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-[#14e7ff]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[#14e7ff] font-bold">1</span>
              </div>
              <div>
                <h3 className="text-[var(--text-primary)] font-semibold mb-2">Download Authenticator App</h3>
                <p className="text-[var(--text-primary)] opacity-70">
                  Install Google Authenticator, Authy, or another authenticator app on your phone.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-[#14e7ff]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[#14e7ff] font-bold">2</span>
              </div>
              <div>
                <h3 className="text-[var(--text-primary)] font-semibold mb-2">Scan QR Code</h3>
                <div className="bg-white p-4 rounded-lg inline-block">
                  <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">QR Code Placeholder</span>
                  </div>
                </div>
                <p className="text-[var(--text-primary)] opacity-70 mt-2">
                  Or enter this code manually: <code className="bg-[var(--bg-primary)] px-2 py-1 rounded">ABCD-EFGH-IJKL</code>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-[#14e7ff]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[#14e7ff] font-bold">3</span>
              </div>
              <div className="flex-1">
                <h3 className="text-[var(--text-primary)] font-semibold mb-2">Enter Verification Code</h3>
                <form onSubmit={handleVerify2FA} className="space-y-4">
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-lg px-4 py-3 focus:border-[#14e7ff] focus:outline-none"
                  />
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="bg-[#0ab6ff] hover:bg-[#14e7ff] text-[#0c111a] px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Verify & Enable
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowSetup(false)}
                      className="px-6 py-3 bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-lg font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  Demo code: 123456
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-[#14e7ff]/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Lock className="text-[#14e7ff]" size={24} />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">Active Sessions</h2>
            <p className="text-[var(--text-primary)] opacity-70 mb-4">
              Manage your active sessions across different devices.
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-[var(--bg-primary)] rounded-lg">
                <div className="flex items-center gap-3">
                  <Smartphone className="text-[#14e7ff]" size={20} />
                  <div>
                    <p className="text-[var(--text-primary)] font-medium">Current Session</p>
                    <p className="text-sm text-[var(--text-secondary)]">Chrome on Windows · Active now</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-400/10 text-green-400 rounded-full text-sm">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};