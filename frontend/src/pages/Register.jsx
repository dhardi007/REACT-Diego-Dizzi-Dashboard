// Register.jsx - Beautiful Register Page
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/ui/Input';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle2, Zap, Shield, Users, Globe, ArrowLeft } from 'lucide-react';

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    rol: 'empleado',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [strength, setStrength] = useState(0);

  const calculateStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[a-z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    setStrength(score);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'password') calculateStrength(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    if (formData.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    setIsLoading(true);
    try {
      await register(formData);
      setSuccess('¡Cuenta creada exitosamente! Redirigiendo...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message || 'Error al crear la cuenta');
    } finally {
      setIsLoading(false);
    }
  };

  const getStrengthColor = () => {
    if (strength <= 1) return 'bg-red-500';
    if (strength <= 2) return 'bg-orange-500';
    if (strength <= 3) return 'bg-yellow-500';
    if (strength === 4) return 'bg-lime-500';
    return 'bg-green-500';
  };

  const getStrengthLabel = () => {
    if (strength <= 1) return 'Muy débil';
    if (strength <= 2) return 'Débil';
    if (strength <= 3) return 'Media';
    if (strength === 4) return 'Fuerte';
    return 'Muy fuerte';
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/50 animate-scale-in">
            {/* Header */}
            <div className="text-center mb-8">
              <Link to="/login" className="absolute top-0 left-0 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors" aria-label="Volver al login">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-emerald-600 shadow-lg shadow-accent/30 mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white drop-shadow-lg mb-2">Crear Cuenta</h1>
              <p className="text-white/80 drop-shadow-md">Únete a Dizzi Dashboard hoy</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-sm animate-slide-up">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/20 border border-green-500/30 text-green-300 text-sm animate-scale-in">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>{success}</span>
                </div>
              )}

              <div>
                <label htmlFor="nombre" className="label text-white/90">Nombre completo</label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <Input
                    id="nombre"
                    name="nombre"
                    type="text"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Juan Pérez"
                    required
                    autoComplete="name"
                    className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:border-primary focus:ring-primary/30"
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="label text-white/90">Correo electrónico</label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    required
                    autoComplete="email"
                    className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:border-primary focus:ring-primary/30"
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="label text-white/90">Contraseña</label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Mínimo 8 caracteres"
                    required
                    autoComplete="new-password"
                    className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:border-primary focus:ring-primary/30"
                    style={{ paddingLeft: '2.5rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {formData.password && (
                  <div className="mt-2 space-y-1.5">
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                        style={{ width: `${(strength / 5) * 100}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/50">Fuerza: {getStrengthLabel()}</span>
                      <span className="text-white/40">{formData.password.length}/8+ chars</span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="label text-white/90">Confirmar contraseña</label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repite tu contraseña"
                    required
                    autoComplete="new-password"
                    className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:border-primary focus:ring-primary/30"
                    style={{ paddingLeft: '2.5rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                    aria-label={showConfirmPassword ? 'Ocultar confirmación' : 'Mostrar confirmación'}
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="rol" className="label text-white/90">Rol</label>
                <div className="relative mt-1">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <select
                    name="rol"
                    value={formData.rol}
                    onChange={handleChange}
                    required
                    className="input bg-white/10 border-white/20 text-white appearance-none pr-10 cursor-pointer"
                  >
                    <option value="empleado">👤 Empleado</option>
                    <option value="admin">👑 Administrador</option>
                  </select>
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
                    Creando cuenta...
                  </>
                ) : (
                  'Crear Cuenta'
                )}
              </button>

              <div className="flex items-center justify-between text-xs text-white/50">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-white/30 text-primary focus:ring-primary" required />
                  <span className="text-white/70">Acepto los <a href="#" className="text-primary hover:text-primary/80 font-medium">Términos y Condiciones</a></span>
                </label>
              </div>
            </form>

            {/* Features */}
            <div className="mt-8 space-y-3">
              <p className="text-center text-white/50 text-xs mb-4">Con tu cuenta obtienes</p>
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

            <div className="mt-8 text-center">
              <p className="text-white/50 text-sm">
                ¿Ya tienes cuenta?{' '}
                <Link to="/login" className="text-primary hover:text-primary/80 font-medium">
                  Inicia sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;