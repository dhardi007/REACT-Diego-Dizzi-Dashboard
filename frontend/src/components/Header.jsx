import { useNavigate } from 'react-router-dom';
import { Bell, Sun, Moon, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Header({ dark, toggleTheme, toggleSideMenu }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="z-10 py-3 bg-white dark:bg-[#0d081d] border-b border-gray-200/50 dark:border-white/[0.06]">
      <div className="container flex items-center justify-between h-full px-6 mx-auto">
        {/* Mobile hamburger */}
        <button
          className="lg:hidden mr-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-colors text-gray-500 dark:text-gray-400"
          onClick={toggleSideMenu}
          aria-label="Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right icons */}
        <ul className="flex items-center space-x-1">
          <li>
            <button
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-colors text-gray-500 dark:text-gray-400"
              onClick={toggleTheme}
              aria-label="Toggle color mode"
            >
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </li>

          <li className="relative">
            <button
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-colors text-gray-500 dark:text-gray-400"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-[#0d081d]" />
            </button>
          </li>

          <li>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-colors text-gray-500 dark:text-gray-400"
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
