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
        {/* Mobile hamburger - Only visible on mobile */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={toggleSideMenu}
          aria-label="Menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Search Bar */}
        <div className="flex justify-center flex-1 lg:mr-32">
          <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <Search className="w-4 h-4" />
            </div>
            <input
              className="w-full pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:placeholder-gray-500 focus:bg-white focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input"
              type="text"
              placeholder="Search for projects"
              aria-label="Search"
            />
          </div>
        </div>

        <ul className="flex items-center flex-shrink-0 space-x-6">
          {/* Theme Toggle */}
          <li className="flex">
            <button
              className="rounded-full focus:shadow-outline-purple focus:outline-none"
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
              className="relative align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span
                aria-hidden="true"
                className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
              ></span>
            </button>
          </li>

          {/* Profile Menu */}
          <li className="relative">
            <button
              className="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
              aria-label="Account"
            >
              {user ? (
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
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
              className="rounded-full focus:shadow-outline-purple focus:outline-none"
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
