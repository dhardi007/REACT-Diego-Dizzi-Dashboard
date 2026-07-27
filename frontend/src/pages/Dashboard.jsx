// Dashboard.jsx - Simple Project Dashboard
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, FolderOpen, Edit, Trash2, Star, Clock, CheckCircle, Search, MoreHorizontal, ArrowRight, ExternalLink, Heart, Code, Zap, Globe, Layers, GitBranch, Database, Server, Cloud, Mail, Users, Settings, Shield, BarChart2, TrendingUp, TrendingDown, Minus, Plus as PlusIcon, Filter, Menu, X, Eye, MessageSquare, Download, Upload, Share2 } from 'lucide-react';

const initialProjects = [
  {
    id: 1,
    name: 'Portfolio Website',
    description: 'Personal portfolio built with React and Tailwind',
    tags: 'React, Tailwind, Vite',
    status: 'active',
    progress: 75,
    updated: '2 hours ago',
    starred: true,
    link: 'https://github.com/dizzi1222/portfolio-terminal-dhardi',
    live: 'https://portfolio-terminal-dhardi.vercel.app',
  },
  {
    id: 2,
    name: 'Task Manager App',
    description: 'Full-stack task management with real-time updates',
    tags: 'React, Node.js, Socket.io',
    status: 'active',
    progress: 45,
    updated: '1 day ago',
    starred: false,
    link: 'https://github.com/dizzi1222',
  },
  {
    id: 3,
    name: 'Weather Dashboard',
    description: 'Beautiful weather app with location-based forecasts',
    tags: 'React, API, Charts',
    status: 'completed',
    progress: 100,
    updated: '3 days ago',
    starred: true,
    link: 'https://github.com/dizzi1222',
  },
  {
    id: 4,
    name: 'E-commerce UI Kit',
    description: 'Reusable components for modern e-commerce',
    tags: 'React, Storybook, TypeScript',
    status: 'draft',
    progress: 20,
    updated: '1 week ago',
    starred: false,
    link: 'https://github.com/dizzi1222',
  },
  {
    id: 5,
    name: 'Blog Platform',
    description: 'Markdown-based blog with CMS integration',
    tags: 'Next.js, MDX, Contentful',
    status: 'active',
    progress: 60,
    updated: '5 hours ago',
    starred: false,
    link: 'https://github.com/dizzi1222',
  },
  {
    id: 6,
    name: 'Design System',
    description: 'Consistent UI components for team adoption',
    tags: 'React, Storybook, Tailwind',
    status: 'review',
    progress: 85,
    updated: '2 days ago',
    starred: true,
    link: 'https://github.com/dizzi1222',
  },
];

const statusConfig = {
  active: { label: 'En progreso', color: 'bg-blue-500', text: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-500/10' },
  completed: { label: 'Completado', color: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
  draft: { label: 'Borrador', color: 'bg-gray-400', text: 'text-gray-600 dark:text-gray-400', bg: 'bg-gray-50 dark:bg-gray-500/10' },
  review: { label: 'En revisión', color: 'bg-purple-500', text: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-500/10' },
  paused: { label: 'Pausado', color: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/10' },
};

function Dashboard() {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    tags: '',
    status: 'draft',
  });

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                          p.description.toLowerCase().includes(search.toLowerCase()) ||
                          p.tags.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newProject.name.trim()) return;
    
    const project = {
      id: Date.now(),
      name: newProject.name.trim(),
      description: newProject.description.trim(),
      tags: newProject.tags.trim(),
      status: newProject.status,
      progress: newProject.status === 'completed' ? 100 : newProject.status === 'draft' ? 0 : 10,
      updated: 'Just now',
      starred: false,
      link: '#',
    };
    
    setProjects([project, ...projects]);
    resetForm();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!newProject.name.trim()) return;
    
    setProjects(projects.map(p => 
      p.id === editingProject.id 
        ? { ...p, ...newProject, updated: 'Just now' }
        : p
    ));
    resetForm();
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setNewProject({
      name: project.name,
      description: project.description,
      tags: project.tags,
      status: project.status,
    });
    setShowCreateModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Eliminar este proyecto?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleStar = (id) => {
    setProjects(projects.map(p => 
      p.id === id ? { ...p, starred: !p.starred } : p
    ));
  };

  const resetForm = () => {
    setNewProject({ name: '', description: '', tags: '', status: 'draft' });
    setEditingProject(null);
    setShowCreateModal(false);
  };

  const statusConfigMap = {
    active: { label: 'En progreso', color: 'bg-blue-500', text: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-500/10' },
    completed: { label: 'Completado', color: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
    draft: { label: 'Borrador', color: 'bg-gray-400', text: 'text-gray-600 dark:text-gray-400', bg: 'bg-gray-50 dark:bg-gray-500/10' },
    review: { label: 'En revisión', color: 'bg-purple-500', text: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-500/10' },
    paused: { label: 'Pausado', color: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/10' },
  };

  const getStatusConfig = (status) => statusConfigMap[status] || statusConfigMap.draft;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mis Proyectos</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Gestiona y organiza tus proyectos</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary"
        >
          <Plus className="w-4 h-4" />
          Nuevo Proyecto
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input pl-10"
            placeholder="Buscar por nombre, descripción o etiquetas..."
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="input w-auto sm:w-48"
        >
          <option value="all">Todos los estados</option>
          <option value="active">En progreso</option>
          <option value="completed">Completado</option>
          <option value="draft">Borrador</option>
          <option value="review">En revisión</option>
          <option value="paused">Pausado</option>
        </select>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="text-center py-16">
          <FolderOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No hay proyectos aún</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Crea tu primer proyecto para empezar</p>
          <button onClick={() => setShowCreateModal(true)} className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Crear mi primer proyecto
          </button>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No se encontraron proyectos</h3>
          <p className="text-gray-500 dark:text-gray-400">Intenta cambiar los filtros o la búsqueda</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects
            .filter(p => filteredProjects.includes(p))
            .sort((a, b) => (b.starred === a.starred ? 0 : b.starred ? 1 : -1) || b.id - a.id)
            .map((project) => {
              const status = getStatusConfig(project.status);
              return (
                <article
                  key={project.id}
                  className="card group animate-slide-up bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary-500/50"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white truncate">{project.name}</h3>
                          {project.starred && (
                            <button
                              onClick={(e) => { e.stopPropagation(); handleStar(project.id); }}
                              className="text-yellow-500 hover:scale-110 transition-transform"
                              aria-label="Desmarcar favorito"
                            >
                              <Star className="w-5 h-5 fill-current" />
                            </button>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{project.description}</p>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleEdit(project); }}
                        className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Editar proyecto"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.split(',').slice(0, 4).map((tag, i) => (
                        <span key={i} className="badge badge-primary text-xs">{tag.trim()}</span>
                      ))}
                      {project.tags.split(',').length > 4 && (
                        <span className="badge badge-primary text-xs">+{project.tags.split(',').length - 4} más</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`badge ${status.bg} ${status.text}`}>{getStatusConfig(project.status).label}</span>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{project.updated}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-6 pb-6 pt-0 border-t border-gray-100 dark:border-gray-700">
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-500 dark:text-gray-400">Progreso</span>
                        <span className="font-medium text-gray-900 dark:text-white">{project.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {project.live && (
                        <button className="btn-ghost btn-sm text-xs flex-1" onClick={(e) => { e.stopPropagation(); window.open(project.live, '_blank'); }}>
                          <Globe className="w-3.5 h-3.5 mr-1" />
                          Live
                        </button>
                      )}
                      <button className="btn-ghost btn-sm text-xs flex-1" onClick={(e) => { e.stopPropagation(); window.open(project.link, '_blank'); }}>
                        <Code className="w-3.5 h-3.5 mr-1" />
                        Ver código
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(project.id); }}
                        className="btn-ghost btn-sm text-xs text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        aria-label="Eliminar proyecto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default Dashboard;