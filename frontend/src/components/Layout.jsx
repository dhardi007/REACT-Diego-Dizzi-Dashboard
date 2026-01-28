import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Header from './Header';

function Layout() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const location = useLocation();

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle('theme-dark');
    if (dark) {
        document.documentElement.classList.remove('dark');
    } else {
        document.documentElement.classList.add('dark');
    }
  };

  // Set initial theme
  useEffect(() => {
    document.documentElement.classList.add('theme-dark');
    document.documentElement.classList.add('dark');
  }, []);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Dashboard', icon: 'home' },
    { path: '/calculadora', label: 'Calculadora', icon: 'calculator' },
    { path: '/tareas', label: 'To Do List', icon: 'tasks' },
    { path: '/testimonios', label: 'Testimonios', icon: 'chart' },
    { path: '/contador', label: 'Contador', icon: 'cursor' },
  ];

  const getIcon = (iconName) => {
    const { Home, Calculator, CheckSquare, Users, MousePointer } = require('lucide-react');

    const icons = {
      home: Home,
      calculator: Calculator,
      tasks: CheckSquare,
      chart: Users,
      cursor: MousePointer,
    };

    const IconComponent = icons[iconName];
    return <IconComponent className="w-5 h-5" />;
  };

  return (
    <div className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${dark ? 'dark' : ''}`}>
      {/* Desktop Sidebar */}
      <aside className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 lg:block shrink-0 shadow-xl border-r border-gray-200/50 dark:border-gray-700/50">
        <div className="py-6 text-gray-500 dark:text-gray-400">
          <Link
            to="/"
            className="ml-6 text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-purple-500 hover:to-pink-500 transition-all"
          >
            Diego Dizzi
          </Link>
          <ul className="mt-8 space-y-2 px-3">
            {navItems.map((item) => (
              <li key={item.path} className="relative">
                {isActive(item.path) && (
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-purple-600 to-pink-600 rounded-r-lg"
                    aria-hidden="true"
                  />
                )}
                <Link
                  to={item.path}
                  className={`group flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  <span className={`transition-transform duration-200 ${isActive(item.path) ? 'scale-110' : 'group-hover:scale-110'}`}>
                    {getIcon(item.icon)}
                  </span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Mobile sidebar backdrop */}
      {isSideMenuOpen && (
        <div
          className="fixed inset-0 z-10 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
          onClick={() => setIsSideMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 z-20 shrink-0 w-64 mt-0 overflow-y-auto bg-white dark:bg-gray-800 lg:hidden transition-transform duration-150 ${
          isSideMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="py-4 text-gray-500 dark:text-gray-400">
          <Link
            to="/"
            className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
          >
            Diego Dizzi
          </Link>
          <ul className="mt-6">
            {navItems.map((item) => (
              <li key={item.path} className="relative px-6 py-3">
                {isActive(item.path) && (
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                    aria-hidden="true"
                  />
                )}
                <Link
                  to={item.path}
                  onClick={() => setIsSideMenuOpen(false)}
                  className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 ${
                    isActive(item.path)
                      ? 'text-gray-800 dark:text-gray-100'
                      : ''
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {getIcon(item.icon)}
                  </svg>
                  <span className="ml-4">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 w-full relative">
        <Header dark={dark} toggleTheme={toggleTheme} />

        {/* Hamburger for mobile - Positioned absolutely/fixed relative to viewport if needed,
            but here we can just rely on the Header having a spot or similar.
            Actually, let's keep a floating button for mobile if Header doesn't cover it well,
            OR integrate it into Header. For now, bringing back the floating button but styled better. */}
        <button
          className="lg:hidden fixed top-3 left-3 z-30 p-2 rounded-md bg-purple-600 text-white shadow-lg focus:outline-none"
          onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
          aria-label="Menu"
        >
           <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>

        <main className="h-full overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="container px-6 mx-auto py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
