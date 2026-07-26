// Calculadora.jsx - Beautiful Calculator
import { useState, useEffect } from 'react';
import { evaluate } from 'mathjs';
import { X, CheckCircle, Copy, RotateCcw } from 'lucide-react';

function Calculadora() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [copied, setCopied] = useState(false);

  const addToInput = (value) => {
    if (input === 'Error') setInput('');
    setInput(input + value);
  };

  const calculate = () => {
    if (!input) return;
    try {
      const res = evaluate(input);
      const rounded = Math.round(res * 100000000) / 100000000;
      setResult(rounded);
      setHistory([`${input} = ${rounded}`, ...history].slice(0, 10));
      setInput(String(rounded));
    } catch (error) {
      setInput('Error');
      setResult(null);
    }
  };

  const clear = () => {
    setInput('');
    setResult(null);
  };

  const copyResult = () => {
    if (result !== null) {
      navigator.clipboard.writeText(String(result));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const clearHistory = () => setHistory([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') addToInput(e.key);
      else if (['+', '-', '*', '/', '.'].includes(e.key)) addToInput(e.key);
      else if (e.key === 'Enter' || e.key === '=') calculate();
      else if (e.key === 'Escape' || e.key === 'Backspace') {
        if (e.key === 'Escape') clear();
        else setInput(input.slice(0, -1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input, result]);

  const buttons = [
    ['C', '⌫', '%', '/'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=',],
  ];

  return (
    <div className="max-w-md mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center mb-6 animate-slide-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Calculadora Pro
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Calculadora Científica</h1>
        <p className="text-gray-600 dark:text-gray-400">Potente, bonita y con historial</p>
      </div>

      {/* Display */}
      <div className="card overflow-hidden mb-6 animate-slide-up stagger-1">
        {/* History toggle */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Display</p>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-1"
            >
              {showHistory ? 'Ocultar historial' : 'Ver historial'}
            </button>
          </div>
          <div className="flex items-center gap-2">
            {result !== null && (
              <button
                onClick={copyResult}
                className="btn-ghost btn-sm p-2"
                aria-label={copied ? 'Copiado' : 'Copiar resultado'}
              >
                {copied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
            )}
            <button
              onClick={clear}
              className="btn-ghost btn-sm p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
              aria-label="Limpiar todo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Display */}
        <div className="p-6">
          <div className="min-h-[80px] flex items-end justify-end">
            <div className="w-full text-right">
              {result !== null && (
                <div className="text-right mb-2 min-h-[24px]">
                  <span className="text-sm text-gray-400 dark:text-gray-500 font-mono">{input}</span>
                </div>
              )}
              <div className="font-mono text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tabular-nums animate-instant-reveal">
                {input || '0'}
              </div>
              {result !== null && input !== String(result) && (
                <div className="text-right mt-2 min-h-[24px]">
                  <span className="text-lg text-primary font-semibold font-mono tabular-nums">{result}</span>
                  <span className="ml-2 text-xs text-green-500">✓ Calculado</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* History Panel */}
{showHistory && history.length > 0 && (
          <div className="border-t border-gray-100 dark:border-gray-800 max-h-64 overflow-y-auto">
            <div className="flex items-center justify-between p-3 border-b border-gray-100 dark:border-gray-800">
              <div className="font-medium text-gray-700 dark:text-gray-300">Historial ({history.length})</div>
              <button onClick={clearHistory} className="text-xs text-red-500 hover:text-red-700">Limpiar todo</button>
            </div>
            <div className="p-3 space-y-2 max-h-48 overflow-y-auto">
              {history.map((entry, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group"
                  onClick={() => {
                    const parts = entry.split(' = ');
                    setInput(parts[0]);
                    setResult(parseFloat(parts[1]));
                  }}
                >
                  <span className="text-sm font-mono text-gray-700 dark:text-gray-300 truncate pr-2">{entry.split(' = ')[0]}</span>
                  <span className="text-sm font-bold text-primary ml-2">{history[i].split(' = ')[1]}</span>
                </div>
              ))}
              {history.length === 0 && (
                <p className="text-center text-gray-400 py-8 text-sm">No hay cálculos aún</p>
              )}
            </div>
          </div>
        )}
            </div>
          </div>
        }
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-4 gap-2 animate-slide-up stagger-1" role="application" aria-label="Teclado de calculadora">
        {buttons.flatMap((row, rowIndex) =>
          row.map((btn, colIndex) => {
            const isOperator = ['/', '×', '-', '+', '%'].includes(btn);
            const isAction = ['C', '⌫', '='].includes(btn);
            const isNumber = !isOperator && !isAction;

            let className = 'btn h-14 text-lg font-medium transition-all duration-150';
            if (isNumber) className += ' btn-secondary hover:bg-gray-100 dark:hover:bg-gray-700';
            else if (isOperator) className += ' btn-secondary bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30';
            else if (btn === 'C') className += ' btn-secondary bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30';
            else if (btn === '⌫') className += ' btn-secondary bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/30';
            else if (btn === '=') className += ' btn-primary btn-lg row-span-2 h-28';

            const handleClick = () => {
              if (btn === 'C') clear();
              else if (btn === '⌫') setInput(input.slice(0, -1));
              else if (btn === '=') calculate();
              else if (btn === '×') addToInput('*');
              else addToInput(btn);
            };

            if (btn === '=') {
              return (
                <button
                  key={`btn-${rowIndex}-${colIndex}`}
                  onClick={handleClick}
                  className={className}
                  style={{ gridRow: 'span 2' }}
                  aria-label="Calcular resultado"
                >
                  =
                </button>
              );
            }

            return (
              <button
                key={`btn-${rowIndex}-${colIndex}`}
                onClick={handleClick}
                className={className}
                aria-label={btn === '⌫' ? 'Borrar último' : btn === 'C' ? 'Limpiar' : btn}
              >
                {btn}
              </button>
            );
          })
        )}
      </div>

      {/* Keyboard hints */}
      <div className="mt-6 card p-4 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/10 dark:border-primary/20 animate-slide-up stagger-2">
        <div className="flex items-start gap-3">
          <span className="w-5 h-5 text-primary mt-0.5 flex-shrink-0">⌨️</span>
          <div>
            <p className="font-medium text-gray-900 dark:text-white mb-2">Atajos de teclado</p>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
              <div><kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">0-9</kbd> Números</div>
              <div><kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">+ - * /</kbd> Operadores</div>
              <div><kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">Enter</kbd> = Calcular</div>
              <div><kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">Escape</kbd> Limpiar</div>
              <div><kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">Backspace</kbd> Borrar</div>
              <div><kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">.</kbd> Decimal</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculadora;