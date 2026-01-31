import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, AlertCircle, Github } from 'lucide-react';

const LOGO_PATH = '/logo-dashboard.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, password);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    setIsLoading(false);
  };

  const handleOAuthLogin = (provider) => {
    alert(`OAuth con ${provider} - Próximamente`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="hidden lg:flex flex-col justify-center text-white space-y-8 animate-fade-in-up">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-2xl border border-white/10 p-3">
              <img src={LOGO_PATH} alt="Diego Dizzi Logo" className="w-full h-full object-contain drop-shadow-lg" />
            </div>
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Diego Dizzi
              </h1>
              <p className="text-purple-300 font-semibold text-lg tracking-wide">
                Desarrollador Full Stack
              </p>
            </div>
          </div>

          {/* Tagline */}
          <div className="space-y-4">
            <h2 className="text-4xl font-bold leading-tight">
              Dashboard <span className="text-pink-400">Profesional</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-md">
              Gestiona tus proyectos, estadísticas y tareas en un entorno diseñado para la máxima productividad.
            </p>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-black/30 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 animate-scale-in">
            {/* Mobile Logo */}
            <div className="lg:hidden flex flex-col items-center mb-6">
               <img src={LOGO_PATH} alt="Logo" className="w-12 h-12 mb-4 drop-shadow-lg" />
               <h2 className="text-xl font-bold text-white">Diego Dizzi</h2>
            </div>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Bienvenido</h2>
              <p className="text-gray-400 text-sm">Inicia sesión para continuar</p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-6 p-3 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-3 animate-shake">
                <AlertCircle className="w-4 h-4 text-red-300 flex-shrink-0" />
                <p className="text-red-100 text-xs">{error}</p>
              </div>
            )}

            {/* OAuth Buttons - Compact Layout */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <button
                onClick={() => handleOAuthLogin('Google')}
                className="btn-ripple flex-1 flex items-center justify-center gap-2 py-2.5 bg-white hover:bg-[#F4F5F7] text-gray-900 hover:text-gray-700 font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-95 text-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Google</span>
              </button>

              <button
                onClick={() => handleOAuthLogin('GitHub')}
                className="btn-ripple flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#24292e] hover:bg-[#2f363d] text-white hover:text-gray-200 font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-95 border border-white/10 text-sm"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </button>
            </div>

            <div className="text-center mb-3">
              <span className="text-sm text-gray-400">O usa tu email</span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1 ml-1">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-500" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 border border-white/10 rounded-lg bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all hover:bg-white/10 text-sm"
                    placeholder="admin@dashboard.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1 ml-1">Contraseña</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-500" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 border border-white/10 rounded-lg bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all hover:bg-white/10 text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-ripple w-full flex items-center justify-center gap-2 py-3 px-4 mt-6 bg-white/10 hover:bg-[#262331] border border-white/10 text-white hover:text-purple-200 font-bold rounded-lg shadow-md hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <span>Iniciar Sesión</span>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-500 text-xs">
                Credenciales demo: <span className="font-mono text-purple-300">admin@dashboard.com</span>
              </p>
            </div>
          </div>

          <p className="text-center text-gray-500 mt-8 text-sm">
            © 2024 Diego Dizzi. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;




