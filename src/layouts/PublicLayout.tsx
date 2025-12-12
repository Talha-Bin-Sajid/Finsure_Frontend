import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { MobileNav } from '../components/MobileNav';

export const PublicLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0c111a]">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />

      <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
        <header className="bg-[#151c27] border-b border-[#14e7ff]/20 px-4 md:px-6 py-3 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-[#14e7ff] md:hidden">FINSURE</h1>
          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={() => navigate('/login')}
              className="text-[#e7f0fa] hover:text-[#14e7ff] px-4 py-2 transition-colors"
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
