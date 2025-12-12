import React, { useState } from 'react';
import { Search, Bell, Upload, Menu, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface TopbarProps {
  onMenuClick?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-[#151c27] border-b border-[#14e7ff]/20 px-4 py-3 flex items-center gap-4">
      <button
        onClick={onMenuClick}
        className="md:hidden text-[#e7f0fa] hover:text-[#14e7ff] transition-colors"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>

      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#e7f0fa]/60" size={20} />
          <input
            type="text"
            placeholder="Search transactions, reports..."
            className="w-full bg-[#0c111a] text-[#e7f0fa] pl-10 pr-4 py-2 rounded-lg border border-[#14e7ff]/20 focus:border-[#14e7ff] focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/upload')}
          className="hidden sm:flex items-center gap-2 bg-[#0ab6ff] hover:bg-[#14e7ff] text-[#0c111a] px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Upload size={18} />
          <span>Upload</span>
        </button>

        <button className="relative text-[#e7f0fa] hover:text-[#14e7ff] transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#14e7ff] rounded-full"></span>
        </button>

        {user && (
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full border-2 border-[#14e7ff]"
              />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-[#151c27] border border-[#14e7ff]/20 rounded-lg shadow-lg py-2 z-50">
                <button
                  onClick={() => {
                    navigate('/settings');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-[#e7f0fa] hover:bg-[#14e7ff]/10 transition-colors"
                >
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-[#e7f0fa] hover:bg-[#14e7ff]/10 transition-colors flex items-center gap-2"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
