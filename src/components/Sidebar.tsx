import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Upload,
  FileText,
  History,
  FileBarChart,
  BarChart3,
  Settings,
  Shield,
  HelpCircle,
  DollarSign,
  Zap,
  Info,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const { isAuthenticated, user } = useAuth();

  const publicLinks = [
    { to: '/', label: 'About', icon: Info },
    { to: '/quickstart', label: 'Quickstart', icon: Zap },
    { to: '/pricing', label: 'Pricing', icon: DollarSign },
    { to: '/faqs', label: 'FAQs', icon: HelpCircle },
  ];

  const authenticatedLinks = [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/upload', label: 'Upload', icon: Upload },
    { to: '/extracted', label: 'Extraction', icon: FileText },
    { to: '/history', label: 'History', icon: History },
    { to: '/reports', label: 'Reports', icon: FileBarChart },
    { to: '/dashboards', label: 'Dashboards', icon: BarChart3 },
    { to: '/settings', label: 'Settings', icon: Settings },
    { to: '/security', label: 'Security', icon: Shield },
    { to: '/help', label: 'Help', icon: HelpCircle },
  ];

  const links = isAuthenticated ? authenticatedLinks : publicLinks;

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-[var(--bg-secondary)] border-r border-[var(--border-color)] transition-all duration-300 z-40 ${
        isCollapsed ? 'w-20' : 'w-64'
      } hidden md:block`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)]">
          {!isCollapsed && (
            <h1 className="text-2xl font-bold text-[#14e7ff]">FINSURE</h1>
          )}
          {isCollapsed && (
            <h1 className="text-2xl font-bold text-[#14e7ff]">F</h1>
          )}
          <button
            onClick={onToggle}
            className="text-[var(--text-primary)] hover:text-[#14e7ff] transition-colors"
            aria-label="Toggle sidebar"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {isAuthenticated && user && (
          <div className="p-4 border-b border-[var(--border-color)]">
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full border-2 border-[#14e7ff]"
              />
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text-primary)] truncate">{user.name}</p>
                  <p className="text-xs text-[var(--text-secondary)] truncate">{user.email}</p>
                </div>
              )}
            </div>
          </div>
        )}

        <nav className="flex-1 overflow-y-auto py-4">
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors ${
                  isActive ? 'bg-[#14e7ff]/20 border-r-2 border-[#14e7ff]' : ''
                } ${isCollapsed ? 'justify-center' : ''}`
              }
              title={isCollapsed ? link.label : undefined}
            >
              <link.icon size={20} />
              {!isCollapsed && <span>{link.label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};