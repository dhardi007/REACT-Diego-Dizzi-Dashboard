import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Sun, Moon, LogOut, User, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Header({ dark, toggleTheme, toggleSideMenu }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="z-10 py-4 bg-white dark:bg-gray-800 shadow-md">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        {/* Mobile hamburger - synced with sidebar (lg:hidden) */}
        <button
          className="header-icon-btn lg:hidden mr-5 -ml-1"
          onClick={toggleSideMenu}
          aria-label="Menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Search Bar */}
        <div className="flex justify-center flex-1 lg:mr-32">
          <div className="relative w-full max-w-xl mr-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input
              className="w-full py-2 pl-10 pr-4 text-sm text-gray-700 bg-gray-100 border-0 rounded-md dark:bg-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              type="text"
              placeholder="Search for projects"
              aria-label="Search"
            />
          </div>
        </div>

        {/* Right side icons - Estilo minimalista Windmill */}
        <ul className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <li>
            <button
              className="header-icon-btn"
              onClick={toggleTheme}
              aria-label="Toggle color mode"
            >
              {dark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </li>

          {/* Notifications */}
          <li className="relative">
            <button
              className="header-icon-btn"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span
                aria-hidden="true"
                className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
              ></span>
            </button>
          </li>

          {/* Profile */}
          <li>
            <button
              className="header-icon-btn"
              aria-label="Account"
            >
              {user ? (
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-medium text-sm">
                  {user.name?.charAt(0).toUpperCase() || 'D'}
                </div>
              ) : (
                <User className="w-5 h-5" />
              )}
            </button>
          </li>

          {/* Logout */}
          <li>
            <button
              onClick={handleLogout}
              className="header-icon-btn"
              aria-label="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
