import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { MobileNav } from '../components/MobileNav';
import { Logo } from '../components/Logo';

export const PublicLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />

      <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
        <header className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)] px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="md:hidden">
            <Logo variant="inline" size={28} />
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={() => navigate('/login')}
              className="text-[var(--text-primary)] hover:text-[#14e7ff] px-4 py-2 transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="bg-[#0ab6ff] hover:bg-[#14e7ff] text-[#0c111a] px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Sign Up
            </button>
          </div>
        </header>

        <main className="p-4 md:p-6 pb-20 md:pb-6">
          <Outlet />
        </main>
      </div>

      <MobileNav />
    </div>
  );
};