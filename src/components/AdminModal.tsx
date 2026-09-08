import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ShieldCheck, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  LogOut, 
  Upload, 
  Database, 
  Key, 
  Check, 
  Copy, 
  Sparkles, 
  Lock, 
  AlertCircle, 
  RotateCcw,
  ExternalLink,
  Github,
  Tag,
  Search,
  Eye,
  Activity,
  BarChart3,
  RefreshCw,
  EyeOff
} from 'lucide-react';
import { Project, ProjectCategory } from '../types';
import { fetchVisitStats, VisitStats } from '../lib/visits';
import { 
  getSupabaseClient, 
  getSupabaseSettings, 
  saveSupabaseSettings, 
  isSupabaseConnected, 
  saveProject, 
  deleteProject, 
  resetToInitialProjects,
  SUPABASE_SETUP_SQL 
} from '../lib/supabase';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onProjectsUpdated: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  projects,
  onProjectsUpdated,
}) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // Active view tab: 'projects' | 'edit' | 'supabase' | 'visits'
  const [activeTab, setActiveTab] = useState<'projects' | 'edit' | 'supabase' | 'visits'>('projects');

  // Confirmation modals (safe for sandboxed iframes)
  const [projectToDelete, setProjectToDelete] = useState<{ id: string; title: string } | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Visits Counter State
  const [visitStats, setVisitStats] = useState<VisitStats | null>(null);
  const [customCounterInput, setCustomCounterInput] = useState('');
  const [counterStatusMsg, setCounterStatusMsg] = useState<string | null>(null);
  const [isCounterLoading, setIsCounterLoading] = useState(false);

  // Search in admin table
  const [adminSearch, setAdminSearch] = useState('');

  // Editing / New Project State
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [techInput, setTechInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Supabase connection settings
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseAnonKey, setSupabaseAnonKey] = useState('');
  const [copiedSql, setCopiedSql] = useState(false);
  const [connectionTestMsg, setConnectionTestMsg] = useState<string | null>(null);

  useEffect(() => {
    const settings = getSupabaseSettings();
    setSupabaseUrl(settings.url);
    setSupabaseAnonKey(settings.anonKey);
  }, []);

  // Quick preset tech tags
  const popularTechs = [
    'TypeScript', 'React', 'Next.js', 'Node.js', 'Python',
    'PostgreSQL', 'Supabase', 'Firebase', 'Git', 'GitHub',
    'IA', 'HTML', 'CSS', 'JavaScript', 'Tailwind CSS'
  ];

  if (!isOpen) return null;

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsAuthLoading(true);

    // Master password verification for administrative access
    const pwd = loginPassword.trim();
    if (pwd === 'Estela*12') {
      setIsAuthenticated(true);
      setIsAuthLoading(false);
      setAuthError('');
    } else {
      setAuthError('Senha incorreta. Verifique e digite novamente a senha de administrador.');
      setIsAuthLoading(false);
    }
  };

  // Start adding a new project
  const handleAddNew = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: '',
      subtitle: '',
      description: '',
      longDescription: '',
      category: 'Sites',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
      technologies: ['React', 'TypeScript'],
      projectUrl: '',
      githubUrl: '',
      featured: false,
      keyFeatures: [],
      metrics: [],
      createdAt: new Date().toISOString(),
    };
    setEditingProject(newProj);
    setActiveTab('edit');
    setSaveStatus(null);
  };

  // Start editing existing project
  const handleEdit = (project: Project) => {
    setEditingProject({ ...project });
    setActiveTab('edit');
    setSaveStatus(null);
  };

  // Delete project
  const handleDelete = (id: string, title: string) => {
    setProjectToDelete({ id, title });
  };

  // Save project
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title.trim()) {
      setSaveStatus('Por favor, informe o título do projeto.');
      return;
    }

    setIsSaving(true);
    setSaveStatus('Salvando projeto...');

    const res = await saveProject({
      ...editingProject,
      technologies: editingProject.technologies || [],
      keyFeatures: editingProject.keyFeatures || [],
      metrics: editingProject.metrics || [],
    });
    setIsSaving(false);

    if (res.success) {
      setSaveStatus(res.error || 'Projeto salvo com sucesso!');
      onProjectsUpdated();
      setTimeout(() => {
        setActiveTab('projects');
        setEditingProject(null);
        setSaveStatus(null);
      }, 1000);
    } else {
      setSaveStatus(`Erro ao salvar: ${res.error || 'Falha inesperada'}`);
    }
  };

  // Add tech tag
  const handleAddTech = (tech: string) => {
    if (!editingProject) return;
    const trimmed = tech.trim();
    if (trimmed && !editingProject.technologies.includes(trimmed)) {
      setEditingProject({
        ...editingProject,
        technologies: [...editingProject.technologies, trimmed],
      });
    }
    setTechInput('');
  };

  // Remove tech tag
  const handleRemoveTech = (techToRemove: string) => {
    if (!editingProject) return;
    setEditingProject({
      ...editingProject,
      technologies: editingProject.technologies.filter((t) => t !== techToRemove),
    });
  };

  // Add feature point
  const handleAddFeature = () => {
    if (!editingProject || !featureInput.trim()) return;
    setEditingProject({
      ...editingProject,
      keyFeatures: [...(editingProject.keyFeatures || []), featureInput.trim()],
    });
    setFeatureInput('');
  };

  // Remove feature
  const handleRemoveFeature = (idx: number) => {
    if (!editingProject || !editingProject.keyFeatures) return;
    setEditingProject({
      ...editingProject,
      keyFeatures: editingProject.keyFeatures.filter((_, i) => i !== idx),
    });
  };

  // Handle local image file upload / base64 preview
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingProject) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setEditingProject({
            ...editingProject,
            imageUrl: reader.result,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Test & Save Supabase Settings
  const handleSaveSupabaseConfig = () => {
    saveSupabaseSettings({
      url: supabaseUrl.trim(),
      anonKey: supabaseAnonKey.trim(),
    });
    setConnectionTestMsg('Configurações salvas! Reconectando cliente Supabase...');
    setTimeout(() => {
      setConnectionTestMsg(
        isSupabaseConnected()
          ? 'Conectado ao Supabase com sucesso!'
          : 'Credenciais atualizadas (verifique URL e Chave Anon).'
      );
      onProjectsUpdated();
    }, 800);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SETUP_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handleResetProjects = () => {
    setShowResetConfirm(true);
  };

  const loadVisits = async () => {
    setIsCounterLoading(true);
    try {
      const stats = await fetchVisitStats();
      setVisitStats(stats);
      setCustomCounterInput(stats.total.toString());
    } catch {
      // ignore
    } finally {
      setIsCounterLoading(false);
    }
  };

  const handleUpdateCounter = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(customCounterInput, 10);
    if (isNaN(val) || val < 0) {
      setCounterStatusMsg('Por favor, digite um número inteiro válido.');
      return;
    }

    try {
      const res = await fetch('/api/visits/set', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newTotal: val }),
      });
      if (res.ok) {
        const data = await res.json();
        setVisitStats((prev) => (prev ? { ...prev, total: data.total } : { total: data.total, today: 1, source: 'server' }));
        setCounterStatusMsg(`Contador atualizado para ${data.total.toLocaleString('pt-BR')} com sucesso!`);
        localStorage.setItem('portfolio_access_counter_total', data.total.toString());
      } else {
        localStorage.setItem('portfolio_access_counter_total', val.toString());
        setVisitStats((prev) => (prev ? { ...prev, total: val } : { total: val, today: 1, source: 'local' }));
        setCounterStatusMsg(`Contador atualizado para ${val.toLocaleString('pt-BR')}.`);
      }
    } catch {
      localStorage.setItem('portfolio_access_counter_total', val.toString());
      setVisitStats((prev) => (prev ? { ...prev, total: val } : { total: val, today: 1, source: 'local' }));
      setCounterStatusMsg(`Contador atualizado para ${val.toLocaleString('pt-BR')}.`);
    }

    setTimeout(() => setCounterStatusMsg(null), 4000);
  };

  const handleTestVisit = async () => {
    try {
      const res = await fetch('/api/visits/hit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/admin-test' }),
      });
      if (res.ok) {
        const data = await res.json();
        setVisitStats({
          total: data.total,
          today: data.today,
          lastVisitedAt: data.lastVisitedAt,
          source: 'server',
        });
        setCustomCounterInput(data.total.toString());
        setCounterStatusMsg(`+1 Acesso registrado com sucesso! Novo total: ${data.total}`);
      }
    } catch {
      setCounterStatusMsg('Erro ao registrar acesso no servidor.');
    }
    setTimeout(() => setCounterStatusMsg(null), 3000);
  };

  const filteredProjects = (projects || []).filter((p) => {
    if (!p) return false;
    const q = adminSearch.toLowerCase().trim();
    if (!q) return true;
    return (
      (p.title || '').toLowerCase().includes(q) ||
      (p.category || '').toLowerCase().includes(q) ||
      (Array.isArray(p.technologies) &&
        p.technologies.some((t) => (t || '').toLowerCase().includes(q)))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-5xl bg-[#0b1329] border border-cyan-500/30 rounded-2xl shadow-[0_0_60px_rgba(6,182,212,0.3)] overflow-hidden z-10 max-h-[92vh] flex flex-col"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Painel Administrativo</span>
                {isAuthenticated && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/50">
                    Sessão Ativa
                  </span>
                )}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Gerenciamento de Projetos & Conexão Supabase
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={() => setIsAuthenticated(false)}
                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-rose-400 hover:bg-slate-700 text-xs font-mono flex items-center gap-1.5 transition-colors"
                title="Encerrar Sessão"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="Fechar painel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto p-6 flex-grow">
          
          {/* 1. Login View */}
          {!isAuthenticated ? (
            <div className="max-w-md mx-auto py-8">
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-3">
                  <Lock className="w-7 h-7" />
                </div>
                <h4 className="text-2xl font-bold text-white">Autenticação de Administrador</h4>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Acesso protegido para gerenciar projetos e banco de dados Supabase.
                </p>
              </div>

              {authError && (
                <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Senha de Administrador
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      autoFocus
                      required
                      placeholder="Digite a senha de acesso"
                      value={loginPassword}
                      onChange={(e) => {
                        setLoginPassword(e.target.value);
                        if (authError) setAuthError('');
                      }}
                      className="w-full pl-4 pr-11 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono tracking-wide"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-200 transition-colors focus:outline-none"
                      title={showPassword ? 'Ocultar senha' : 'Ver senha'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isAuthLoading || !loginPassword.trim()}
                  className="w-full py-3 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all mt-2 flex items-center justify-center gap-2"
                >
                  <Key className="w-4 h-4" />
                  <span>{isAuthLoading ? 'Verificando...' : 'Acessar Painel'}</span>
                </button>
              </form>
            </div>
          ) : (
            /* 2. Authenticated Dashboard Views */
            <div>
              {/* Navigation Tabs */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveTab('projects');
                      setEditingProject(null);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      activeTab === 'projects'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    Projetos ({projects.length})
                  </button>

                  <button
                    onClick={() => setActiveTab('supabase')}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${
                      activeTab === 'supabase'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Database className="w-3.5 h-3.5" />
                    <span>Supabase Cloud & SQL</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('visits');
                      loadVisits();
                    }}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${
                      activeTab === 'visits'
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Activity className="w-3.5 h-3.5 text-[#7b66ff]" />
                    <span>Acessos Reais</span>
                  </button>
                </div>

                {activeTab === 'projects' && (
                  <button
                    onClick={handleAddNew}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Novo Projeto</span>
                  </button>
                )}
              </div>

              {/* View 1: Projects List */}
              {activeTab === 'projects' && (
                <div className="space-y-4">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Pesquisar projetos cadastrados..."
                      value={adminSearch}
                      onChange={(e) => setAdminSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  {/* Projects Table / Grid */}
                  <div className="grid grid-cols-1 gap-3">
                    {filteredProjects.length === 0 ? (
                      <div className="text-center py-12 bg-slate-900/40 rounded-xl border border-slate-800">
                        <p className="text-slate-400 text-sm">Nenhum projeto encontrado para esta busca.</p>
                      </div>
                    ) : (
                      filteredProjects.map((p) => (
                        <div
                          key={p.id}
                          className="bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <img
                              src={p.imageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop'}
                              alt={p.title}
                              className="w-16 h-12 object-cover rounded-lg border border-slate-800 shrink-0"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop';
                              }}
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/40">
                                  {p.category}
                                </span>
                                <h4 className="text-sm sm:text-base font-bold text-white">{p.title}</h4>
                              </div>
                              <div className="flex flex-wrap gap-1 mt-1.5">
                                {(p.technologies || []).slice(0, 4).map((tech) => (
                                  <span key={tech} className="text-[10px] font-mono text-slate-400 bg-slate-950 px-1.5 py-0.2 rounded">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center">
                            <button
                              onClick={() => handleEdit(p)}
                              className="p-2 rounded-lg bg-slate-800 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-700 transition-colors"
                              title="Editar Projeto"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(p.id, p.title)}
                              className="p-2 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 border border-slate-700 transition-colors"
                              title="Excluir Projeto"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Reset action */}
                  <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      Total: <strong>{filteredProjects.length}</strong> projetos listados
                    </span>
                    <button
                      onClick={handleResetProjects}
                      className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1.5 font-mono"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Restaurar dados iniciais</span>
                    </button>
                  </div>
                </div>
              )}

              {/* View 2: Add / Edit Form */}
              {activeTab === 'edit' && editingProject && (
                <form onSubmit={handleSaveProject} className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <Edit3 className="w-4 h-4 text-cyan-400" />
                      <span>{editingProject.id.startsWith('proj-') && !projects.some(p => p.id === editingProject.id) ? 'Adicionar Novo Projeto' : 'Editar Projeto'}</span>
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('projects');
                        setEditingProject(null);
                      }}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Cancelar
                    </button>
                  </div>

                  {saveStatus && (
                    <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-mono">
                      {saveStatus}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    
                    {/* Left Form Column */}
                    <div className="md:col-span-7 space-y-4">
                      {/* Title */}
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          Título do Projeto *
                        </label>
                        <input
                          type="text"
                          required
                          value={editingProject.title}
                          onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                          placeholder="Ex: Nexus AI - Automação Inteligente"
                          className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
                        />
                      </div>

                      {/* Subtitle */}
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          Subtítulo / Slogan Curto
                        </label>
                        <input
                          type="text"
                          value={editingProject.subtitle || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                          placeholder="Ex: Agentes autônomos e análise preditiva"
                          className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
                        />
                      </div>

                      {/* Category & Featured */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-slate-300 mb-1">
                            Categoria *
                          </label>
                          <select
                            value={editingProject.category}
                            onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as ProjectCategory })}
                            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
                          >
                            <option value="Sites">Sites</option>
                            <option value="Apps">Apps</option>
                            <option value="Sistemas">Sistemas</option>
                            <option value="IA">IA</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-slate-300 mb-1">
                            Destaque
                          </label>
                          <label className="flex items-center gap-2 mt-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={Boolean(editingProject.featured)}
                              onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                              className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
                            />
                            <span className="text-xs text-slate-300">Exibir com selo de destaque</span>
                          </label>
                        </div>
                      </div>

                      {/* Image URL & Upload */}
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          URL da Imagem do Projeto *
                        </label>
                        <input
                          type="text"
                          required
                          value={editingProject.imageUrl}
                          onChange={(e) => setEditingProject({ ...editingProject, imageUrl: e.target.value })}
                          placeholder="https://..."
                          className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500 mb-2"
                        />
                        <div className="flex items-center gap-2">
                          <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 border border-slate-700">
                            <Upload className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Carregar imagem local</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageFileUpload}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          Descrição Principal *
                        </label>
                        <textarea
                          rows={3}
                          required
                          value={editingProject.description}
                          onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                          placeholder="Resumo do projeto..."
                          className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500 resize-none"
                        />
                      </div>

                      {/* Long Description */}
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          Descrição Arquitetural Completa (Opcional)
                        </label>
                        <textarea
                          rows={2}
                          value={editingProject.longDescription || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, longDescription: e.target.value })}
                          placeholder="Detalhes de microsserviços, banco de dados, fluxos de IA..."
                          className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500 resize-none"
                        />
                      </div>

                      {/* URLs */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-slate-300 mb-1">
                            URL do Projeto Online
                          </label>
                          <input
                            type="text"
                            value={editingProject.projectUrl || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, projectUrl: e.target.value })}
                            placeholder="https://meuprojeto.com"
                            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-slate-300 mb-1">
                            URL do GitHub
                          </label>
                          <input
                            type="text"
                            value={editingProject.githubUrl || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                            placeholder="https://github.com/..."
                            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right Form Column: Tech tags, Features & Preview */}
                    <div className="md:col-span-5 space-y-4">
                      
                      {/* Tech Tags Picker */}
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1.5">
                          Tecnologias Utilizadas
                        </label>
                        <div className="flex gap-2 mb-2">
                          <input
                            type="text"
                            placeholder="Ex: Next.js"
                            value={techInput}
                            onChange={(e) => setTechInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddTech(techInput);
                              }
                            }}
                            className="flex-grow px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                          />
                          <button
                            type="button"
                            onClick={() => handleAddTech(techInput)}
                            className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-mono border border-cyan-500/40"
                          >
                            + Add
                          </button>
                        </div>

                        {/* Selected tags */}
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {editingProject.technologies.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-800 text-cyan-300 border border-slate-700 flex items-center gap-1"
                            >
                              <span>{t}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveTech(t)}
                                className="text-slate-400 hover:text-rose-400"
                              >
                                &times;
                              </button>
                            </span>
                          ))}
                        </div>

                        {/* Quick suggestions */}
                        <div className="text-[10px] text-slate-400 font-mono mb-1">Sugestões rápidas:</div>
                        <div className="flex flex-wrap gap-1">
                          {popularTechs.map((pt) => (
                            <button
                              key={pt}
                              type="button"
                              onClick={() => handleAddTech(pt)}
                              className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 border border-slate-800"
                            >
                              +{pt}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Key Features */}
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1.5">
                          Recursos Chave
                        </label>
                        <div className="flex gap-2 mb-2">
                          <input
                            type="text"
                            placeholder="Ex: Autenticação biométrica nativa"
                            value={featureInput}
                            onChange={(e) => setFeatureInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddFeature();
                              }
                            }}
                            className="flex-grow px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                          />
                          <button
                            type="button"
                            onClick={handleAddFeature}
                            className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-mono border border-emerald-500/40"
                          >
                            + Add
                          </button>
                        </div>
                        <div className="space-y-1 max-h-28 overflow-y-auto">
                          {editingProject.keyFeatures?.map((kf, i) => (
                            <div key={i} className="flex items-center justify-between text-xs bg-slate-900 p-1.5 rounded border border-slate-800 text-slate-300">
                              <span className="line-clamp-1">{kf}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveFeature(i)}
                                className="text-slate-400 hover:text-rose-400 ml-2"
                              >
                                &times;
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Live Image Preview Card */}
                      <div>
                        <div className="text-xs font-mono text-slate-400 mb-1 flex items-center gap-1">
                          <Eye className="w-3 h-3 text-cyan-400" />
                          <span>Pré-visualização do Card</span>
                        </div>
                        <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 aspect-video relative">
                          <img
                            src={editingProject.imageUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono bg-black/80 text-cyan-300">
                            {editingProject.category}
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>

                  {/* Save Actions Bar */}
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('projects');
                        setEditingProject(null);
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isSaving ? 'Salvando...' : 'Salvar Projeto'}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* View 3: Supabase Cloud & SQL Configuration Hub */}
              {activeTab === 'supabase' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
                      <Database className="w-4 h-4 text-emerald-400" />
                      <span>Conectar ao seu Projeto Supabase</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      Para sincronizar projetos, usuários e imagens no seu próprio banco de dados PostgreSQL na nuvem, insira a URL e a Chave Anon do seu projeto Supabase abaixo.
                    </p>

                    {connectionTestMsg && (
                      <div className="mb-4 p-3 rounded-lg bg-slate-950 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
                        {connectionTestMsg}
                      </div>
                    )}

                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          VITE_SUPABASE_URL
                        </label>
                        <input
                          type="url"
                          placeholder="https://xyzcompany.supabase.co"
                          value={supabaseUrl}
                          onChange={(e) => setSupabaseUrl(e.target.value)}
                          className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white font-mono focus:outline-none focus:border-cyan-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          VITE_SUPABASE_ANON_KEY
                        </label>
                        <input
                          type="password"
                          placeholder="eyJhbGciOiJIUzI1NiIsIn..."
                          value={supabaseAnonKey}
                          onChange={(e) => setSupabaseAnonKey(e.target.value)}
                          className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white font-mono focus:outline-none focus:border-cyan-500"
                        />
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
                          <span>Status:</span>
                          {isSupabaseConnected() ? (
                            <span className="text-emerald-400 font-bold flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Conectado
                            </span>
                          ) : (
                            <span className="text-slate-400">Usando armazenamento local</span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={handleSaveSupabaseConfig}
                          className="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-sm"
                        >
                          Salvar e Conectar
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* SQL Setup Script Section */}
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold flex items-center gap-1.5">
                        <Key className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Script SQL de Inicialização da Tabela no Supabase</span>
                      </h4>
                      <button
                        onClick={handleCopySql}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-300 border border-slate-700"
                      >
                        {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedSql ? 'Copiado!' : 'Copiar SQL'}</span>
                      </button>
                    </div>

                    <p className="text-xs text-slate-400 mb-3">
                      Execute o script abaixo no <strong>SQL Editor</strong> do painel Supabase para criar a tabela de projetos e políticas de segurança RLS:
                    </p>

                    <pre className="bg-[#070b14] p-4 rounded-xl border border-slate-800/80 text-[11px] font-mono text-cyan-300/90 overflow-x-auto max-h-52">
                      {SUPABASE_SETUP_SQL}
                    </pre>
                  </div>
                </div>
              )}

              {/* View 4: Real Visits & Analytics */}
              {activeTab === 'visits' && (
                <div className="space-y-6">
                  {/* Top Header Card */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-[#14102c] via-[#1c183a] to-[#14102c] border border-[#332a68] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-[#673de6]/20 text-[#7b66ff] border border-[#673de6]/30">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white flex items-center gap-2">
                          <span>Contador de Acessos Real</span>
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            Ativo no Servidor
                          </span>
                        </h3>
                        <p className="text-xs text-slate-300 mt-0.5">
                          Estatísticas de visitas em tempo real registradas no backend persistente.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={loadVisits}
                        disabled={isCounterLoading}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-mono text-slate-300 border border-slate-700 transition-all"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 text-[#7b66ff] ${isCounterLoading ? 'animate-spin' : ''}`} />
                        <span>Atualizar</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleTestVisit}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#673de6] hover:bg-[#7b66ff] text-xs font-mono font-semibold text-white transition-all shadow-sm"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>+1 Acesso Teste</span>
                      </button>
                    </div>
                  </div>

                  {counterStatusMsg && (
                    <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs font-mono text-purple-300 flex items-center gap-2">
                      <Check className="w-4 h-4 text-purple-400" />
                      <span>{counterStatusMsg}</span>
                    </div>
                  )}

                  {/* 3 Metric Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
                      <div className="flex items-center justify-between text-slate-400 mb-2">
                        <span className="text-xs font-mono">Total de Acessos</span>
                        <Eye className="w-4 h-4 text-[#7b66ff]" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                        {visitStats ? visitStats.total.toLocaleString('pt-BR') : '...'}
                      </div>
                      <span className="text-[11px] text-slate-400 mt-1">
                        Acumulado em todos os acessos
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
                      <div className="flex items-center justify-between text-slate-400 mb-2">
                        <span className="text-xs font-mono">Acessos Hoje</span>
                        <BarChart3 className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
                        {visitStats ? `+${visitStats.today}` : '...'}
                      </div>
                      <span className="text-[11px] text-slate-400 mt-1">
                        Contabilizados na data atual
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
                      <div className="flex items-center justify-between text-slate-400 mb-2">
                        <span className="text-xs font-mono">Último Acesso</span>
                        <Activity className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div className="text-sm font-semibold text-slate-200 font-mono truncate">
                        {visitStats?.lastVisitedAt
                          ? new Date(visitStats.lastVisitedAt).toLocaleString('pt-BR')
                          : 'Recentemente'}
                      </div>
                      <span className="text-[11px] text-slate-400 mt-1">
                        Sincronização com o rodapé
                      </span>
                    </div>
                  </div>

                  {/* Manual Calibration Form */}
                  <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-2">
                      Calibrar ou Ajustar Valor do Contador
                    </h4>
                    <p className="text-xs text-slate-400 mb-4">
                      Caso deseje migrar ou iniciar a contagem a partir de um valor específico, informe o novo total abaixo:
                    </p>

                    <form onSubmit={handleUpdateCounter} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <input
                        type="number"
                        min="0"
                        value={customCounterInput}
                        onChange={(e) => setCustomCounterInput(e.target.value)}
                        placeholder="Ex: 1250"
                        className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-[#7b66ff] max-w-xs"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#673de6] hover:bg-[#7b66ff] transition-all shadow-sm"
                      >
                        Salvar Novo Valor
                      </button>
                    </form>
                  </div>

                  {/* Information Box */}
                  <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 text-xs text-slate-400 space-y-1.5">
                    <div className="font-semibold text-slate-300 font-mono flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#7b66ff]" />
                      <span>Como funciona o contador real:</span>
                    </div>
                    <p>
                      • <strong>Backend Dedicado:</strong> Cada acesso ao site envia uma requisição para a rota <code>/api/visits/hit</code>, gravando o novo total no arquivo de dados permanente.
                    </p>
                    <p>
                      • <strong>Prevenção de Spam:</strong> Múltiplos recarregamentos de página na mesma aba do navegador são deduplicados na sessão para manter números fiéis de visitas.
                    </p>
                    <p>
                      • <strong>Sincronização Global:</strong> O número exibido no rodapé do site reflete o total compartilhado para todos os visitantes que acessarem a página.
                    </p>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      </motion.div>

      {/* Inline Confirmation: Delete Project */}
      {projectToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertCircle className="w-6 h-6" />
              <h4 className="text-base font-bold text-white">Confirmar Exclusão</h4>
            </div>
            <p className="text-xs text-slate-300">
              Tem certeza que deseja excluir o projeto <strong className="text-white">"{projectToDelete.title}"</strong>?
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setProjectToDelete(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={async () => {
                  await deleteProject(projectToDelete.id);
                  setProjectToDelete(null);
                  onProjectsUpdated();
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 transition-colors shadow-lg shadow-rose-950"
              >
                Excluir Projeto
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inline Confirmation: Reset Initial Projects */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-amber-400">
              <RotateCcw className="w-6 h-6" />
              <h4 className="text-base font-bold text-white">Restaurar Projetos Iniciais</h4>
            </div>
            <p className="text-xs text-slate-300">
              Deseja restaurar a lista inicial com todos os projetos padrão do portfólio? As alterações não salvas serão substituídas pelos modelos iniciais.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  resetToInitialProjects();
                  setShowResetConfirm(false);
                  onProjectsUpdated();
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-950"
              >
                Sim, Restaurar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
