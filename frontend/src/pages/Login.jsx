// Login.jsx - Beautiful Login Page
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/ui/Input';
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle2, Zap, Shield, Users, Globe } from 'lucide-react';

export function LoginPage() {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@dashboard.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitted(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    }
  };

  const features = [
    { icon: Shield, title: 'Seguro', desc: 'Autenticación JWT segura' },
    { icon: Zap, title: 'Rápido', desc: 'Acceso instantáneo' },
    { icon: Users, title: 'Equipo', desc: 'Gestión colaborativa' },
    { icon: Globe, title: 'Global', desc: 'Acceso desde cualquier lugar' },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
          {/* Card */}
          <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl px-8 py-12 md:px-10 md:py-14 lg:px-12 lg:py-16 shadow-2xl shadow-black/50 animate-scale-in">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30 mb-6 md:mb-7 lg:mb-8">
                <Zap className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg mb-2">Dizzi Dashboard</h1>
              <p className="text-white/80 drop-shadow-md">Inicia sesión para continuar</p>
            </div>

            {/* Demo credentials */}
            <div className="mb-8 p-3 rounded-lg bg-white/5 border border-white/10 text-center animate-fade-in">
              <p className="text-xs text-white/60 font-medium">Credenciales demo:</p>
              <p className="text-sm font-mono text-white/90 font-medium mt-1">admin@dashboard.com / admin123</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-sm animate-slide-up">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label htmlFor="email" className="label text-white/90">Correo electrónico</label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@dashboard.com"
                    disabled={isLoading}
                    className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:border-primary focus:ring-primary/30"
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="label text-white/90">Contraseña</label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-xs text-primary hover:text-primary/80 font-medium"
                  >
                    {showPassword ? 'Ocultar' : 'Mostrar'}
                  </button>
                </div>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={isLoading}
                    className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:border-primary focus:ring-primary/30"
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>

              <div className="text-center mt-10">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary btn-lg px-10 shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300"
                >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Iniciando sesión...
                  </>
                ) : (
                  'Iniciar Sesión'
                )}
              </button>
            </div>

              <div className="flex items-center justify-between text-xs text-white/50">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-white/30 text-primary focus:ring-primary" />
                  <span className="text-white/70">Recordarme</span>
                </label>
                <a href="#" className="text-primary hover:text-primary/80 font-medium">¿Olvidaste la contraseña?</a>
              </div>
            </form>

            {/* Demo info */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-center text-white/50 text-xs mb-4">O continua con</p>
              <div className="grid grid-cols-2 gap-3">
                <button className="btn-ghost btn-sm py-3 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors">
                  <svg className="w-5 h-5 mx-auto" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                </button>
                <button className="btn-ghost btn-sm py-3 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors">
                  <svg className="w-5 h-5 mx-auto" viewBox="0 0 24 24"><path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="mt-10 space-y-3">
              {[
                { icon: Shield, title: 'Seguro', desc: 'JWT + Refresh tokens' },
                { icon: Zap, title: 'Rápido', desc: 'Login < 500ms' },
                { icon: Users, title: 'Equipo', desc: 'Roles y permisos' },
                { icon: Globe, title: 'Global', desc: 'CDN worldwide' },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors animate-slide-up stagger-1" style={{ animationDelay: `${i * 100}ms` }}>
                  <f.icon className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-white font-medium text-sm">{f.title}</p>
                    <p className="text-white/50 text-xs">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-10 text-center text-white/40 text-xs">
              © 2025 Dizzi Dashboard. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;