// Tareas.jsx - Beautiful Todo List
import { useState, useEffect } from 'react';
import { Plus, CheckCircle, Circle, Trash2, Edit, Filter, ChevronDown, MoreHorizontal, Star, Calendar, Tag, Clock, CheckCircle2, Archive, Search } from 'lucide-react';

const STORAGE_KEY = 'beautiful-todos';

const initialTodos = [
  { id: 1, text: 'Diseñar nuevo dashboard', completed: true, priority: 'high', tags: ['diseño', 'ui'], dueDate: '2025-01-20', createdAt: Date.now() - 86400000 },
  { id: 2, text: 'Implementar autenticación JWT', completed: false, priority: 'high', tags: ['backend', 'auth'], dueDate: '2025-01-25', createdAt: Date.now() - 172800000 },
  { id: 3, text: 'Escribir tests unitarios', completed: false, priority: 'medium', tags: ['testing', 'frontend'], dueDate: '2025-02-01', createdAt: Date.now() - 259200000 },
  { id: 4, text: 'Revisar pull requests del equipo', completed: true, priority: 'low', tags: ['code-review'], createdAt: Date.now() - 345600000 },
  { id: 5, text: 'Actualizar documentación API', completed: false, priority: 'medium', tags: ['docs', 'api'], dueDate: '2025-02-10', createdAt: Date.now() - 432000000 },
  { id: 6, text: 'Configurar CI/CD pipeline', completed: false, priority: 'high', tags: ['devops', 'ci-cd'], dueDate: '2025-01-30', createdAt: Date.now() - 518400000 },
];

const priorityConfig = {
  high: { label: 'Alta', color: 'bg-red-500', text: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-500/10' },
  medium: { label: 'Media', color: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/10' },
  low: { label: 'Baja', color: 'bg-gray-400', text: 'text-gray-600 dark:text-gray-400', bg: 'bg-gray-50 dark:bg-gray-500/10' },
};

function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const [showMenu, setShowMenu] = useState(false);

  const due = formatDueDate(todo.dueDate);
  const priorityColor = todo.priority === 'high' ? 'border-l-red-500' : todo.priority === 'medium' ? 'border-l-amber-500' : 'border-l-gray-400';

  return (
    <div
      className={`group card p-3 md:p-4 lg:p-5 border-l-4 ${priorityColor} transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${todo.completed ? 'opacity-75' : ''}`}
      role="listitem"
    >
      <div className="flex items-start gap-3 md:gap-4">
        <button
          onClick={() => onToggle(todo.id)}
          className={`mt-0.5 transition-colors duration-200 ${todo.completed ? 'text-emerald-500' : 'text-gray-300 dark:text-gray-600 hover:text-primary'}`}
        >
          {todo.completed ? <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" /> : <Circle className="w-5 h-5 md:w-6 md:h-6" />}
        </button>
        <div className="flex-1 min-w-0">
          <p className={`text-sm md:text-base lg:text-lg font-medium ${todo.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-white'}`}>
            {todo.text}
          </p>
          <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mt-1.5 md:mt-2">
            <span className={`inline-flex items-center gap-1 px-1.5 md:px-2 py-0.5 rounded-full text-[10px] md:text-xs lg:text-sm font-medium ${priorityConfig[todo.priority].bg} ${priorityConfig[todo.priority].text}`}>
              <span className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full ${priorityConfig[todo.priority].color}`} />
              {priorityConfig[todo.priority].label}
            </span>
            {todo.tags?.map(tag => (
              <span key={tag} className="inline-flex items-center gap-1 px-1.5 md:px-2 py-0.5 rounded-full text-[10px] md:text-xs lg:text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                <Tag className="w-2.5 h-2.5 md:w-3 md:h-3" />
                {tag}
              </span>
            ))}
            {due && (
              <span className={`inline-flex items-center gap-1 px-1.5 md:px-2 py-0.5 rounded-full text-[10px] md:text-xs lg:text-sm font-medium ${due.className}`}>
                <Calendar className="w-2.5 h-2.5 md:w-3 md:h-3" />
                {due.text}
              </span>
            )}
            <span className="inline-flex items-center gap-1 px-1.5 md:px-2 py-0.5 rounded-full text-[10px] md:text-xs lg:text-sm font-medium text-gray-400">
              <Clock className="w-2.5 h-2.5 md:w-3 md:h-3" />
              {new Date(todo.createdAt).toLocaleDateString('es-ES')}
            </span>
          </div>
        </div>
        <div className="relative flex items-center gap-0.5 md:gap-1">
          <button
            onClick={() => onEdit(todo)}
            className="p-1.5 md:p-2 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 transition-all opacity-0 group-hover:opacity-100"
            title="Editar"
          >
            <Edit className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-1.5 md:p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
            title="Eliminar"
          >
            <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function formatDueDate(dateStr) {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  const today = new Date();
  const diff = date.getTime() - today.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (days < 0) return { text: 'Vencido', className: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10' };
  if (days === 0) return { text: 'Hoy', className: 'text-primary bg-primary/10' };
  if (days === 1) return { text: 'Mañana', className: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10' };
  if (days <= 7) return { text: `En ${days} días`, className: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10' };
  return { text: new Date(dateStr).toLocaleDateString('es-ES'), className: 'text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800' };
}

function Tareas() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialTodos;
  });
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ text: '', priority: 'medium', tags: '', dueDate: '' });
  const [sortBy, setSortBy] = useState('created');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = todos
    .filter(todo => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    })
    .filter(todo => todo.text.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'priority') {
        const p = { high: 3, medium: 2, low: 1 };
        return p[b.priority] - p[a.priority];
      }
      if (sortBy === 'due') {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return b.createdAt - a.createdAt;
    });

  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length,
    overdue: todos.filter(t => t.dueDate && !t.completed && new Date(t.dueDate) < new Date()).length,
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (!formData.text.trim()) return;
    
    const newTodo = {
      id: Date.now(),
      text: formData.text.trim(),
      completed: false,
      priority: formData.priority,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      dueDate: formData.dueDate || null,
      createdAt: Date.now(),
    };
    
    setTodos([newTodo, ...todos]);
    resetForm();
  };

  const updateTodo = (e, id) => {
    e.preventDefault();
    setTodos(todos.map(t => t.id === id ? { ...t, ...formData, tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean) } : t));
    resetForm();
  };

  const resetForm = () => {
    setFormData({ text: '', priority: 'medium', tags: '', dueDate: '' });
    setShowForm(false);
    setEditingId(null);
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setFormData({
      text: todo.text,
      priority: todo.priority,
      tags: todo.tags.join(', '),
      dueDate: todo.dueDate || '',
    });
    setShowForm(true);
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-6 md:mb-8 lg:mb-10 animate-slide-up">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-medium mb-3 md:mb-4">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-pulse" />
              Task Manager
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-1">Mis Tareas</h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">Organiza, prioriza y completa</p>
          </div>
          <button
            onClick={() => { setFormData({ text: '', priority: 'medium', tags: '', dueDate: '' }); setShowForm(true); }}
            className="btn-primary btn-lg shadow-lg shadow-primary/30 self-start"
          >
            <Plus className="w-4 h-4 md:w-5 md:h-5" />
            Nueva tarea
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-4 md:mb-6 animate-slide-up stagger-1">
          <div className="card p-3 md:p-4 text-center hover:shadow-md transition-shadow">
            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            <p className="text-[10px] md:text-xs lg:text-sm text-gray-500 dark:text-gray-400">Total</p>
          </div>
          <div className="card p-3 md:p-4 text-center hover:shadow-md transition-shadow">
            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.active}</p>
            <p className="text-[10px] md:text-xs lg:text-sm text-gray-500 dark:text-gray-400">Pendientes</p>
          </div>
          <div className="card p-3 md:p-4 text-center hover:shadow-md transition-shadow">
            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-emerald-600 dark:text-emerald-400">{stats.completed}</p>
            <p className="text-[10px] md:text-xs lg:text-sm text-gray-500 dark:text-gray-400">Completadas</p>
          </div>
          <div className="card p-3 md:p-4 text-center hover:shadow-md transition-shadow">
            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-red-600 dark:text-red-400">{stats.overdue}</p>
            <p className="text-[10px] md:text-xs lg:text-sm text-gray-500 dark:text-gray-400">Vencidas</p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="card p-3 md:p-4 mb-4 md:mb-6 animate-slide-up stagger-1">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar tareas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input pl-9 md:pl-10 text-sm md:text-base"
              />
            </div>
            <div className="flex items-center gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="input w-auto text-sm md:text-base"
              >
                <option value="all">Todas</option>
                <option value="active">Pendientes</option>
                <option value="completed">Completadas</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input w-auto text-sm md:text-base"
              >
                <option value="created">Recientes</option>
                <option value="priority">Prioridad</option>
                <option value="due">Fecha límite</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Form */}
      {(showForm || editingId) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => resetForm()}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 md:p-5 rounded-t-2xl flex items-center justify-between">
              <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 dark:text-white">{editingId ? 'Editar tarea' : 'Nueva tarea'}</h3>
              <button onClick={resetForm} className="btn-ghost p-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-lg">×</button>
            </div>
            <form onSubmit={editingId ? (e) => updateTodo(e, editingId) : addTodo} className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-5">
              <div>
                <label className="label text-sm md:text-base">Tarea</label>
                <textarea
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  rows={3}
                  className="input resize-none text-sm md:text-base"
                  placeholder="¿Qué necesitas hacer?"
                  required
                  autoFocus
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="label text-sm md:text-base">Prioridad</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="input text-sm md:text-base"
                  >
                    <option value="high">🔴 Alta</option>
                    <option value="medium">🟡 Media</option>
                    <option value="low">🟢 Baja</option>
                  </select>
                </div>
                <div>
                  <label className="label text-sm md:text-base">Fecha límite</label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="input text-sm md:text-base"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div>
                <label className="label text-sm md:text-base">Etiquetas (separadas por comas)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="input text-sm md:text-base"
                  placeholder="ej: diseño, frontend, urgente"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn-secondary flex-1 text-sm md:text-base"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1 text-sm md:text-base"
                >
                  {editingId ? 'Guardar cambios' : 'Crear tarea'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Todo List */}
      <div className="animate-slide-up stagger-1">
        {todos.length === 0 ? (
          <div className="card p-8 md:p-12 text-center animate-fade-in">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-3 md:mb-4">
              <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
            </div>
            <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-1 md:mb-2">No hay tareas aún</h3>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mb-4 md:mb-6">¡Crea tu primera tarea para empezar!</p>
            <button onClick={() => setShowForm(true)} className="btn-primary text-sm md:text-base">
              <Plus className="w-4 h-4 mr-2" />
              Crear primera tarea
            </button>
          </div>
        ) : (
          <div className="space-y-6 md:space-y-8">
            {/* Pendientes Section */}
            <section>
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-blue-500" />
                <h2 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 dark:text-white">Pendientes</h2>
                <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">({todos.filter(t => !t.completed).length})</span>
              </div>
              {todos.filter(t => !t.completed).length === 0 ? (
                <div className="card p-6 md:p-8 text-center">
                  <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">¡Todo completado! 🎉</p>
                </div>
              ) : (
                <div className="space-y-2 md:space-y-3" role="list" aria-label="Tareas pendientes">
                  {todos.filter(t => !t.completed).sort((a, b) => b.createdAt - a.createdAt).map((todo, index) => (
                    <TodoItem key={todo.id} todo={todo} index={index} onToggle={toggleComplete} onEdit={startEdit} onDelete={deleteTodo} />
                  ))}
                </div>
              )}
            </section>

            {/* Completadas Section */}
            <section>
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-emerald-500" />
                <h2 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 dark:text-white">Completadas</h2>
                <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">({todos.filter(t => t.completed).length})</span>
              </div>
              {todos.filter(t => t.completed).length === 0 ? (
                <div className="card p-6 md:p-8 text-center">
                  <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">Completa tareas para verlas aquí</p>
                </div>
              ) : (
                <div className="space-y-2 md:space-y-3" role="list" aria-label="Tareas completadas">
                  {todos.filter(t => t.completed).sort((a, b) => b.createdAt - a.createdAt).map((todo, index) => (
                    <TodoItem key={todo.id} todo={todo} index={index} onToggle={toggleComplete} onEdit={startEdit} onDelete={deleteTodo} />
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </div>

      {/* Empty State for Filters */}
      {todos.length > 0 && filteredTodos.length === 0 && (
        <div className="card p-6 md:p-8 text-center animate-fade-in">
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">No hay tareas que coincidan con tu filtro</p>
        </div>
      )}

      {/* Footer Stats */}
      <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs md:text-sm text-gray-500 dark:text-gray-400 animate-slide-up stagger-2">
        <span>{stats.active} de {stats.total} tareas pendientes</span>
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={() => setSortBy(sortBy === 'priority' ? 'created' : 'priority')}
            className={`text-[10px] md:text-xs font-medium ${sortBy === 'priority' ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}
          >
            Ordenar por prioridad
          </button>
          <button
            onClick={() => setSortBy(sortBy === 'due' ? 'created' : 'due')}
            className={`text-[10px] md:text-xs font-medium ${sortBy === 'due' ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}
          >
            Ordenar por fecha
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tareas;