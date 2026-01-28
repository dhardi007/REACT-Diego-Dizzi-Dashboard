import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Sun, Moon, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Header({ dark, toggleTheme }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="z-10 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 transition-all duration-300">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        {/* Search Bar */}
        <div className="flex justify-center flex-1 lg:mr-32">
          <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              className="block w-full pl-10 pr-3 py-3 border border-gray-300/50 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all backdrop-blur-sm"
              type="text"
              placeholder="Buscar proyectos..."
              aria-label="Search"
            />
          </div>
        </div>

        <ul className="flex items-center shrink-0 space-x-4">
          {/* Theme Toggle */}
          <li className="flex">
            <button
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all hover:scale-110"
              onClick={toggleTheme}
              aria-label="Toggle Color Mode"
            >
              {dark ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-purple-600" />
              )}
            </button>
          </li>

          {/* Notifications */}
          <li className="relative">
            <button className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all hover:scale-110">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 inline-block w-2 h-2 bg-red-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
            </button>
          </li>

          {/* User Info */}
          {user && (
            <li className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white font-semibold text-sm">
                {user.name?.charAt(0).toUpperCase() || <User className="w-4 h-4" />}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {user.role}
                </p>
              </div>
            </li>
          )}

          {/* Logout Button */}
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Salir</span>
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
