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
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/50 animate-scale-in">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30 mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white drop-shadow-lg mb-2">Dizzi Dashboard</h1>
              <p className="text-white/80 drop-shadow-md">Inicia sesión para continuar</p>
            </div>

            {/* Demo credentials */}
            <div className="mb-6 p-3 rounded-lg bg-white/5 border border-white/10 text-center animate-fade-in">
              <p className="text-xs text-white/60 font-medium">Credenciales demo:</p>
              <p className="text-sm font-mono text-white/90 font-medium mt-1">admin@dashboard.com / admin123</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
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
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full btn-lg shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300"
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

              <div className="flex items-center justify-between text-xs text-white/50">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-white/30 text-primary focus:ring-primary" />
                  <span className="text-white/70">Recordarme</span>
                </label>
                <a href="#" className="text-primary hover:text-primary/80 font-medium">¿Olvidaste la contraseña?</a>
              </div>
            </form>

            {/* Demo info */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-center text-white/50 text-xs mb-4">O continua con</p>
              <div className="grid grid-cols-2 gap-3">
                <button className="btn-ghost btn-sm py-3 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors">
                  <svg className="w-5 h-5 mx-auto" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-1-13h2v7h-2zm0 10c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg>
                </button>
                <button className="btn-ghost btn-sm py-3 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors">
                  <svg className="w-5 h-5 mx-auto" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-1-13h2v7h-2zm0 10c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg>
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="mt-8 space-y-3">
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

            <p className="mt-8 text-center text-white/40 text-xs">
              © 2025 Dizzi Dashboard. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;