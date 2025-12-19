import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

function Layout() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const location = useLocation();

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle('theme-dark');
  };

  // Set initial theme
  useState(() => {
    document.documentElement.classList.add('theme-dark');
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
    <div className={`${dark ? 'dark' : ''}`}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block shrink-0">
          <div className="py-4 text-gray-500 dark:text-gray-400">
            <Link
              to="/"
              className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
            >
              Diego Proyecto
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
            <div className="px-6 my-6 space-y-4">
              <button className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                Create account
                <span className="ml-2" aria-hidden="true">+</span>
              </button>

               <button
                className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-gray-600 transition-colors duration-150 bg-gray-100 border border-transparent rounded-lg dark:text-gray-400 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:shadow-outline-purple"
                onClick={toggleTheme}
              >
                 <span>{dark ? 'Light' : 'Dark'}</span>
                {dark ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" /></svg>
                ) : (
                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
                )}
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile sidebar backdrop */}
        {isSideMenuOpen && (
          <div
            className="fixed inset-0 z-10 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
              className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
            >
              Diego Proyecto
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
             <div className="px-6 my-6 space-y-4">
               {/* Theme Toggle in Mobile Sidebar */}
              <button
                className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition-colors duration-150 bg-gray-100 border border-transparent rounded-lg dark:text-gray-200 dark:bg-gray-700 active:bg-purple-600 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:shadow-outline-purple"
                onClick={toggleTheme}
              >
                <span>{dark ? 'Light Mode' : 'Dark Mode'}</span>
                {dark ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" /></svg>
                ) : (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
                )}
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 w-full bg-gray-50 dark:bg-gray-900">
           {/* Hamburger for mobile only, floating */}
          <button
            className="md:hidden fixed top-4 left-4 z-30 p-2 rounded-md bg-purple-600 text-white shadow-lg focus:outline-none"
            onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>


          {/* Main content - This is where routed components will render */}
          <main className="h-full overflow-y-auto">
            <div className="container px-6 mx-auto py-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;
