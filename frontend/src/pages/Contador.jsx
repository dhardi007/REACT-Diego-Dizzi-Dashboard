// Contador.jsx - Beautiful Counter
import { useState } from 'react';
import { Plus, Minus, RotateCcw, Heart, Zap, Sparkles } from 'lucide-react';

function Contador() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [milestone, setMilestone] = useState(null);

  const checkMilestone = (newCount) => {
    const milestones = [10, 25, 50, 100, 250, 500, 1000];
    if (milestones.includes(newCount)) {
      setMilestone(newCount);
      setTimeout(() => setMilestone(null), 3000);
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
    <div className="max-w-md mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8 animate-slide-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Zap className="w-4 h-4 animate-pulse" />
          Contador Interactivo
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Contador Inteligente</h1>
        <p className="text-gray-600 dark:text-gray-400">Simple, elegante y con historial</p>
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
                <p className="font-bold text-lg">¡Logro desbloqueado!</p>
                <p className="text-sm opacity-90">{milestone} clicks alcanzados</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Counter Display */}
      <div className="relative mb-8 animate-scale-in">
        <div className="relative w-56 h-56 mx-auto">
          {/* Background rings */}
          <svg className="absolute inset-0 -z-10" viewBox="0 0 224 224">
            <circle
              cx="112"
              cy="112"
              r="100"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-gray-100 dark:text-gray-800"
            />
            <circle
              cx="112"
              cy="112"
              r="100"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray="628"
              strokeDashoffset={`${628 * (1 - Math.min(count / 100, 1))}`}
              strokeLinecap="round"
              className="text-primary transition-all duration-500 ease-out"
              style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
            />
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white font-mono tabular-nums animate-pulse-soft">
              {count}
            </span>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">clicks</p>
          </div>
        </div>
        
        {/* Floating particles on milestone */}
        {milestone && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-2 h-2 bg-amber-400 rounded-full animate-pulse"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-80px)`
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="grid grid-cols-3 gap-3 mb-8 animate-slide-up stagger-1">
        <button
          onClick={decrement}
          disabled={count === 0}
          className="btn-danger btn-lg h-14 group"
          aria-label="Decrementar"
        >
          <Minus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
        </button>
        <button
          onClick={reset}
          className="btn-ghost btn-lg h-14 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 group"
          aria-label="Reiniciar"
        >
          <RotateCcw className="w-6 h-6 group-hover:rotate-180 transition-transform duration-300" />
        </button>
        <button
          onClick={increment}
          className="btn-primary btn-lg h-14 shadow-lg shadow-primary/30 group"
          aria-label="Incrementar"
        >
          <Plus className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
        </button>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3 mb-8 animate-slide-up stagger-2">
        <button
          onClick={() => { setCount(c => c + 5); setHistory([`+5 → ${count + 5}`, ...history].slice(0, 10)); }}
          className="btn-secondary flex-1"
        >
          <Plus className="w-4 h-4" /> +5
        </button>
        <button
          onClick={() => { const nc = count - 5; setCount(nc); setHistory([`-5 → ${nc}`, ...history].slice(0, 10)); }}
          disabled={count < 5}
          className="btn-secondary flex-1"
        >
          <Minus className="w-4 h-4" /> -5
        </button>
        <button
          onClick={() => { setCount(c => c * 2); setHistory([`×2 → ${count * 2}`, ...history].slice(0, 10)); }}
          disabled={count === 0}
          className="btn-accent flex-1"
        >
          <Zap className="w-4 h-4" /> ×2
        </button>
      </div>

      {/* History */}
      {(history.length > 0 || count !== 0) && (
        <div className="card p-5 animate-slide-up stagger-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <History className="w-5 h-5 text-primary" />
              Historial reciente
          </h3>
            {history.length > 0 && (
              <button
                onClick={() => setHistory([])}
                className="text-sm text-primary hover:text-primary/80 font-medium"
              >
                Limpiar
              </button>
            )}
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {history.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 py-8">No hay historial aún</p>
            )}
            {history.length > 0 && history.map((entry, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg animate-slide-up stagger-1"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span className="font-mono text-sm font-medium text-gray-700 dark:text-gray-300">{entry}</span>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 animate-slide-up stagger-3">
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-primary">{count}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Total actual</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-accent">{history.filter(h => h.startsWith('+')).length}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Incrementos</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-red-500">{history.filter(h => h.startsWith('-')).length}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Decrementos</p>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-8 card p-4 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/10 dark:border-primary/20">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-gray-900 dark:text-white mb-1">Consejos rápidos</p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Usa <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">Espacio</kbd> o <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">Enter</kbd> para incrementar</li>
              <li>• Usa <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">-</kbd> o <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">Backspace</kbd> para decrementar</li>
              <li>• Presiona <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">R</kbd> para reiniciar</li>
              <li>• Los hitos se celebran en: 10, 25, 50, 100, 250, 500, 1000</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contador;