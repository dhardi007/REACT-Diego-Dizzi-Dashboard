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
    const icons = {
      home: (
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      ),
      calculator: (
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      ),
      tasks: (
        <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      ),
      chart: (
        <>
          <path d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </>
      ),
      cursor: (
        <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
      ),
    };
    return icons[iconName];
  };

  return (
    <div className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${dark ? 'dark' : ''}`}>
      {/* Desktop Sidebar */}
      <aside className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block shrink-0 shadow-md">
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

      {/* Mobile sidebar backdrop */}
      {isSideMenuOpen && (
        <div
          className="fixed inset-0 z-10 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
          onClick={() => setIsSideMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 z-20 shrink-0 w-64 mt-0 overflow-y-auto bg-white dark:bg-gray-800 md:hidden transition-transform duration-150 ${
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
          className="md:hidden fixed top-3 left-3 z-30 p-2 rounded-md bg-purple-600 text-white shadow-lg focus:outline-none"
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
