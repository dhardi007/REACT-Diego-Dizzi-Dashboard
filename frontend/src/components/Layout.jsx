import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Home, Calculator, CheckSquare, Users, MousePointer } from 'lucide-react';
import Header from './Header';

function Layout() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const location = useLocation();

  const toggleTheme = () => {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      return next;
    });
  };

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/calculadora', label: 'Calculadora', icon: Calculator },
    { path: '/tareas', label: 'To Do List', icon: CheckSquare },
    { path: '/testimonios', label: 'Testimonios', icon: Users },
    { path: '/contador', label: 'Contador', icon: MousePointer },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-[#0a0615]">
      {/* Desktop Sidebar */}
      <aside className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-[#0d081d] lg:block shrink-0 border-r border-gray-200/50 dark:border-white/[0.06]">
        <div className="py-6 text-gray-500 dark:text-gray-400">
          <Link
            to="/"
            className="ml-6 text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-purple-500 hover:to-pink-500 transition-all inline-block"
          >
            DIZZI DASHBOARD
          </Link>
          <ul className="mt-8 space-y-1 px-3">
            {navItems.map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`group flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                      active
                        ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-400 shadow-sm border border-purple-500/10'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/[0.04] hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${active ? 'text-purple-500' : 'group-hover:text-purple-500 transition-colors'}`} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      {/* Mobile sidebar backdrop */}
      {isSideMenuOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/60 backdrop-blur-sm sm:items-center sm:justify-center"
          onClick={() => setIsSideMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 z-20 shrink-0 w-64 mt-0 overflow-y-auto bg-white dark:bg-[#0d081d] lg:hidden transition-all duration-300 ${
          isSideMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="py-4 text-gray-500 dark:text-gray-400">
          <Link
            to="/"
            className="ml-6 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            DIZZI DASHBOARD
          </Link>
          <ul className="mt-6 space-y-1 px-3">
            {navItems.map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsSideMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${
                      active
                        ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/[0.04]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 w-full">
        <Header dark={dark} toggleTheme={toggleTheme} toggleSideMenu={() => setIsSideMenuOpen(!isSideMenuOpen)} />

        <main className="h-full overflow-y-auto bg-gray-50 dark:bg-[#0a0615]">
          <div className="container px-6 mx-auto py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
