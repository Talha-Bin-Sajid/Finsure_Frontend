import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Upload,
  FileText,
  History,
  Settings,
  Info,
  Zap,
  DollarSign,
  HelpCircle,
  BarChart3,
  FileBarChart,
  Shield,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const MobileNav: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const publicLinks = [
    { to: '/', icon: Info },
    { to: '/quickstart', icon: Zap },
    { to: '/pricing', icon: DollarSign },
    { to: '/faqs', icon: HelpCircle },
  ];

  const authenticatedLinks = [
    { to: '/dashboard',icon: LayoutDashboard },
    { to: '/upload', icon: Upload },
    { to: '/extracted',icon: FileText },
    { to: '/history', icon: History },
    { to: '/reports',  icon: FileBarChart },
    { to: '/dashboards', icon: BarChart3 },
    { to: '/settings', icon: Settings },
    { to: '/security', icon: Shield },
    { to: '/help', icon: HelpCircle },
  ];

  const links = isAuthenticated ? authenticatedLinks : publicLinks;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#151c27] border-t border-[#14e7ff]/20 md:hidden z-50">
      <div className="flex items-center justify-around py-2">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-4 py-2 text-[#e7f0fa] transition-colors ${
                isActive ? 'text-[#14e7ff]' : ''
              }`
            }
          >
            <link.icon size={20} />
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
