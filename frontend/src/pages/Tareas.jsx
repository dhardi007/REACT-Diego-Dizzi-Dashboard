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

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    const today = new Date();
    const diff = date.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    if (days < 0) return { text: 'Vencido', className: 'text-red-600 dark:text-red-400' };
    if (days === 0) return { text: 'Hoy', className: 'text-primary' };
    if (days === 1) return { text: 'Mañana', className: 'text-amber-600' };
    if (days <= 7) return { text: `En ${days} días`, className: 'text-amber-600' };
    return { text: new Date(dateStr).toLocaleDateString('es-ES'), className: 'text-gray-500 dark:text-gray-400' };
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-10 animate-slide-up">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Task Manager
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Mis Tareas</h1>
            <p className="text-gray-600 dark:text-gray-400">Organiza, prioriza y completa</p>
          </div>
          <button
            onClick={() => { setFormData({ text: '', priority: 'medium', tags: '', dueDate: '' }); setShowForm(true); }}
            className="btn-primary btn-lg shadow-lg shadow-primary/30"
          >
            <Plus className="w-5 h-5" />
            Nueva tarea
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-6 animate-slide-up stagger-1">
          <div className="card p-4 text-center hover:shadow-md transition-shadow">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
          </div>
          <div className="card p-4 text-center hover:shadow-md transition-shadow">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.active}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Pendientes</p>
          </div>
          <div className="card p-4 text-center hover:shadow-md transition-shadow">
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.completed}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Completadas</p>
          </div>
          <div className="card p-4 text-center hover:shadow-md transition-shadow">
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.overdue}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Vencidas</p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="card p-4 mb-6 animate-slide-up stagger-1">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar tareas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="input w-auto"
              >
                <option value="all">Todas</option>
                <option value="active">Pendientes</option>
                <option value="completed">Completadas</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input w-auto"
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
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 rounded-t-2xl flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{editingId ? 'Editar tarea' : 'Nueva tarea'}</h3>
              <button onClick={resetForm} className="btn-ghost p-2 hover:bg-gray-100 dark:hover:bg-gray-800">×</button>
            </div>
            <form onSubmit={editingId ? (e) => updateTodo(e, editingId) : addTodo} className="p-6 space-y-5">
              <div>
                <label className="label">Tarea</label>
                <textarea
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  rows={3}
                  className="input resize-none"
                  placeholder="¿Qué necesitas hacer?"
                  required
                  autoFocus
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Prioridad</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="input"
                  >
                    <option value="high">🔴 Alta</option>
                    <option value="medium">🟡 Media</option>
                    <option value="low">🟢 Baja</option>
                  </select>
                </div>
                <div>
                  <label className="label">Fecha límite</label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="input"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div>
                <label className="label">Etiquetas (separadas por comas)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="input"
                  placeholder="ej: diseño, frontend, urgente"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn-secondary flex-1"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1"
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
        {filteredTodos.length === 0 ? (
          <div className="card p-12 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {search ? 'No se encontraron tareas' : todos.length === 0 ? 'No hay tareas aún' : filter === 'completed' ? 'No hay tareas completadas' : '¡Todo completado!'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {search ? 'Intenta con otra búsqueda' : filter === 'completed' ? 'Completa algunas tareas para verlas aquí' : '¡Crea tu primera tarea para empezar!'}
            </p>
            {!search && !editingId && (
              <button onClick={() => setShowForm(true)} className="btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Crear primera tarea
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3" role="list" aria-label="Lista de tareas">
            {filteredTodos.map((todo, index) => (
              <article
                key={todo.id}
                className={`card p-4 animate-slide-up stagger-1 relative group ${
                  todo.completed ? 'opacity-70 bg-gray-50 dark:bg-gray-800/50' : ''
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
                role="listitem"
              >
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleComplete(todo.id)}
                    className={`relative w-6 h-6 rounded-lg border-2 flex-shrink-0 mt-0.5 transition-all duration-200 ${
                      todo.completed
                        ? 'bg-primary border-primary'
                        : 'border-gray-300 dark:border-gray-600 hover:border-primary/50'
                    }`}
                    aria-label={todo.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
                    aria-checked={todo.completed}
                    role="checkbox"
                  >
                    {todo.completed && <CheckCircle2 className="w-4 h-4 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
                  </button>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className={`font-medium text-gray-900 dark:text-white ${todo.completed ? 'line-through text-gray-400 dark:text-gray-500' : ''}`}>
                        {todo.text}
                      </h3>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {todo.starred && <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
                        {todo.dueDate && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                            📅 {new Date(todo.dueDate).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' })}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {todo.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {todo.tags.slice(0, 4).map((tag, i) => (
                          <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                            {tag}
                          </span>
                        ))}
                        {todo.tags.length > 4 && <span className="text-xs text-gray-500 dark:text-gray-400">+{todo.tags.length - 4} más</span>}
                      </div>
                    )}

                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <span className={`w-2 h-2 rounded-full ${priorityConfig[todo.priority].color}`} />
                        <span className={priorityConfig[todo.priority].text}>{priorityConfig[todo.priority].label}</span>
                      </span>
                      {todo.dueDate && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {(() => {
                            const diff = Math.ceil((new Date(todo.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
                            if (diff < 0) return <span className="text-red-600 dark:text-red-400">Vencido</span>;
                            if (diff === 0) return <span className="text-primary">Hoy</span>;
                            if (diff === 1) return <span className="text-amber-600">Mañana</span>;
                            return <span>En {diff} días</span>;
                          })()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => startEdit(todo)}
                    className="btn-ghost btn-sm p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    aria-label="Editar"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="btn-ghost btn-sm p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 hover:text-red-700"
                    aria-label="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Empty State for Filters */}
      {todos.length > 0 && filteredTodos.length === 0 && (
        <div className="card p-8 text-center animate-fade-in">
          <p className="text-gray-500 dark:text-gray-400">No hay tareas que coincidan con tu filtro</p>
        </div>
      )}

      {/* Footer Stats */}
      <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 animate-slide-up stagger-2">
        <span>{stats.active} de {stats.total} tareas pendientes</span>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSortBy(sortBy === 'priority' ? 'created' : 'priority')}
            className={`text-xs font-medium ${sortBy === 'priority' ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}
          >
            Ordenar por prioridad
          </button>
          <button
            onClick={() => setSortBy(sortBy === 'due' ? 'created' : 'due')}
            className={`text-xs font-medium ${sortBy === 'due' ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}
          >
            Ordenar por fecha
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tareas;