// Contador.jsx - Beautiful Counter
import { useState } from 'react';
import { Plus, Minus, RotateCcw, Heart, Zap, Sparkles, History, Trophy, Star, Flame, Award } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';

const MILESTONE_CONFIG = [
  { value: 10, icon: 'Star', color: 'text-amber-500', label: 'Primeros pasos' },
  { value: 25, icon: 'Zap', color: 'text-yellow-500', label: '¡A toda máquina!' },
  { value: 50, icon: 'Flame', color: 'text-orange-500', label: '¡Imparable!' },
  { value: 100, icon: 'Trophy', color: 'text-yellow-500', label: 'Centenario' },
  { value: 250, icon: 'Award', color: 'text-purple-500', label: '¡Leyenda!' },
  { value: 500, icon: 'Flame', color: 'text-red-500', label: '¡En llamas!' },
  { value: 1000, icon: 'Trophy', color: 'text-yellow-500', label: 'Miles de clicks' },
  { value: 2500, icon: 'Award', color: 'text-pink-500', label: 'Dios del clic' },
  { value: 5000, icon: 'Flame', color: 'text-red-600', label: 'Infernal' },
  { value: 10000, icon: 'Trophy', color: 'text-yellow-500', label: '10K CLICKS' },
  { value: 100000, icon: 'Award', color: 'text-purple-600', label: '100K — Leyenda Suprema' },
  { value: 1000000, icon: 'Flame', color: 'text-red-600', label: '¡MILLÓN! — Eres una máquina' },
];

function Contador() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [milestone, setMilestone] = useState(null);
  const { addNotification } = useNotifications();

  const checkMilestone = (newCount) => {
    const config = MILESTONE_CONFIG.find(m => m.value === newCount);
    if (config) {
      setMilestone({ value: newCount, ...config });
      setTimeout(() => setMilestone(null), 3000);
      addNotification({
        icon: config.icon,
        text: `🎯 ${config.label} — ${newCount.toLocaleString()} clicks alcanzados`,
        color: config.color,
      });
    }
  };

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    setHistory([`+1 → ${newCount}`, ...history].slice(0, 10));
    checkMilestone(newCount);
  };

  const decrement = () => {
    const newCount = count - 1;
    setCount(newCount);
    setHistory([`-1 → ${newCount}`, ...history].slice(0, 10));
  };

  const reset = () => {
    setCount(0);
    setHistory([]);
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      {/* Header - full width */}
      <div className="text-center mb-8 md:mb-10 lg:mb-12 animate-slide-up">
        <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-medium mb-3 md:mb-4">
          <Zap className="w-3 h-3 md:w-4 md:h-4 animate-pulse" />
          Contador Interactivo
        </div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2">Contador Inteligente</h1>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">Toca el círculo para contar</p>
      </div>

      {/* Milestone Toast */}
      {milestone && (
        <div className="fixed top-4 right-4 z-50 animate-scale-in animate-slide-up">
          <div className="card p-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-lg">¡{milestone.label}!</p>
                <p className="text-sm opacity-90">{milestone.value.toLocaleString()} clicks alcanzados</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Left Column - Main Counter */}
        <div className="md:col-span-2 space-y-6 md:space-y-8">
          {/* Main Counter Display */}
          <div className="animate-scale-in">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 mx-auto cursor-pointer group" onClick={increment}>
              <svg className="absolute inset-0 -z-10 w-full h-full" viewBox="0 0 256 256">
                <circle cx="128" cy="128" r="114" fill="none" stroke="currentColor" strokeWidth="8" className="text-gray-100 dark:text-gray-800" />
                <circle cx="128" cy="128" r="114" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="716" strokeDashoffset={`${716 * (1 - Math.min(count / 100, 1))}`} strokeLinecap="round" className="text-primary transition-all duration-500 ease-out" style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 dark:text-white font-mono tabular-nums group-hover:scale-110 transition-transform duration-200">{count}</span>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1 md:mt-2 font-medium">clicks</p>
              </div>
              <div className="absolute inset-0 rounded-full bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
            {milestone && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="absolute top-1/2 left-1/2 w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.1}s`, transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-80px)` }} />
                ))}
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="grid grid-cols-3 gap-2 md:gap-3 animate-slide-up stagger-1">
            <button onClick={decrement} disabled={count === 0} className="btn-danger btn-lg h-12 md:h-14 lg:h-16 group" aria-label="Decrementar">
              <Minus className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>
            <button onClick={reset} className="btn-ghost btn-lg h-12 md:h-14 lg:h-16 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 group" aria-label="Reiniciar">
              <RotateCcw className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-180 transition-transform duration-300" />
            </button>
            <button onClick={increment} className="btn-primary btn-lg h-12 md:h-14 lg:h-16 shadow-lg shadow-primary/30 group" aria-label="Incrementar">
              <Plus className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform duration-300" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2 md:gap-3 animate-slide-up stagger-2">
            <button onClick={() => { setCount(c => c + 5); setHistory([`+5 → ${count + 5}`, ...history].slice(0, 10)); }} className="btn-secondary flex-1 text-sm md:text-base">
              <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" /> +5
            </button>
            <button onClick={() => { const nc = count - 5; setCount(nc); setHistory([`-5 → ${nc}`, ...history].slice(0, 10)); }} disabled={count < 5} className="btn-secondary flex-1 text-sm md:text-base">
              <Minus className="w-3.5 h-3.5 md:w-4 md:h-4" /> -5
            </button>
            <button onClick={() => { setCount(c => c * 2); setHistory([`×2 → ${count * 2}`, ...history].slice(0, 10)); }} disabled={count === 0} className="btn-accent flex-1 text-sm md:text-base">
              <Zap className="w-3.5 h-3.5 md:w-4 md:h-4" /> ×2
            </button>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-4 md:space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 md:gap-3 animate-slide-up stagger-3">
            <div className="card p-3 md:p-4 text-center">
              <p className="text-lg md:text-2xl font-bold text-primary">{count}</p>
              <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">Total</p>
            </div>
            <div className="card p-3 md:p-4 text-center">
              <p className="text-lg md:text-2xl font-bold text-accent">{history.filter(h => h.startsWith('+')).length}</p>
              <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">Inc</p>
            </div>
            <div className="card p-3 md:p-4 text-center">
              <p className="text-lg md:text-2xl font-bold text-red-500">{history.filter(h => h.startsWith('-')).length}</p>
              <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">Dec</p>
            </div>
          </div>

          {/* History */}
          {(history.length > 0 || count !== 0) && (
            <div className="card p-4 md:p-5 animate-slide-up stagger-2">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2 text-sm md:text-base">
                  <History className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  Historial
                </h3>
                {history.length > 0 && (
                  <button onClick={() => setHistory([])} className="text-xs md:text-sm text-primary hover:text-primary/80 font-medium">Limpiar</button>
                )}
              </div>
              <div className="space-y-1.5 md:space-y-2 max-h-36 md:max-h-48 overflow-y-auto">
                {history.length === 0 && <p className="text-center text-gray-500 dark:text-gray-400 py-6 md:py-8 text-sm">No hay historial aún</p>}
                {history.length > 0 && history.map((entry, i) => (
                  <div key={i} className="flex items-center justify-between p-2 md:p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg animate-slide-up stagger-1" style={{ animationDelay: `${i * 50}ms` }}>
                    <span className="font-mono text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">{entry}</span>
                    <span className="text-[10px] md:text-xs text-gray-400 dark:text-gray-500">{new Date().toLocaleTimeString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips - Keyboard Shortcuts */}
          <div className="card p-4 md:p-5 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/10 dark:border-primary/20 animate-slide-up stagger-2">
            <div className="flex items-start gap-2 md:gap-3">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white mb-1.5 md:mb-2 text-sm md:text-base">Consejos rápidos</p>
                <ul className="text-xs md:text-sm text-gray-600 dark:text-gray-400 space-y-1 md:space-y-1.5">
                  <li>• Usa <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-[10px] md:text-xs font-mono">Espacio</kbd> o <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-[10px] md:text-xs font-mono">Enter</kbd> para incrementar</li>
                  <li>• Usa <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-[10px] md:text-xs font-mono">-</kbd> o <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-[10px] md:text-xs font-mono">Backspace</kbd> para decrementar</li>
                  <li>• Presiona <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-[10px] md:text-xs font-mono">R</kbd> para reiniciar</li>
                  <li>• Hits: 10, 25, 50, 100, 250, 500, 1K, 2.5K, 5K, 10K, 100K, 1M</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contador;