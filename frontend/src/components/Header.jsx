import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Sun, Moon, LogOut, Menu, X, Zap, CheckCircle, Info } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Header({ dark, toggleTheme, toggleSideMenu }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const notifications = [
    { icon: CheckCircle, text: 'Sesión iniciada correctamente', time: 'Ahora', color: 'text-green-500' },
    { icon: Info, text: 'Dashboard cargado con éxito', time: 'Hace 1 min', color: 'text-blue-500' },
  ];

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
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-white dark:ring-[#0d081d]" />
            </button>

            {showNotifications && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-20 animate-scale-in overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">Notificaciones</span>
                    <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((n, i) => {
                      const Icon = n.icon;
                      return (
                        <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <div className={`mt-0.5 ${n.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-700 dark:text-gray-300">{n.text}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{n.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
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
