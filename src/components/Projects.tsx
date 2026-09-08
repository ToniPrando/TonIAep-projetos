import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FolderKanban, 
  ExternalLink, 
  Github, 
  Search, 
  Plus, 
  Sparkles, 
  ArrowUpRight, 
  Layers, 
  Maximize2,
  Code2
} from 'lucide-react';
import { Project, ProjectCategory } from '../types';
import { ProjectDetailModal } from './ProjectDetailModal';
import { useTheme } from '../context/ThemeContext';

interface ProjectsProps {
  projects: Project[];
  onOpenAdmin: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ projects, onOpenAdmin }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { isDark } = useTheme();

  const categories: { label: string; value: string; count: number }[] = useMemo(() => {
    const counts: Record<string, number> = {
      Todos: projects.length,
      Sites: projects.filter((p) => p.category === 'Sites').length,
      Apps: projects.filter((p) => p.category === 'Apps').length,
      Sistemas: projects.filter((p) => p.category === 'Sistemas').length,
      IA: projects.filter((p) => p.category === 'IA').length,
    };

    return [
      { label: 'Todos', value: 'Todos', count: counts['Todos'] || 0 },
      { label: 'Sites', value: 'Sites', count: counts['Sites'] || 0 },
      { label: 'Apps', value: 'Apps', count: counts['Apps'] || 0 },
      { label: 'Sistemas', value: 'Sistemas', count: counts['Sistemas'] || 0 },
      { label: 'IA & Biometria', value: 'IA', count: counts['IA'] || 0 },
    ];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchCategory =
        selectedCategory === 'Todos' || project.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        (project.subtitle && project.subtitle.toLowerCase().includes(q)) ||
        project.description.toLowerCase().includes(q) ||
        project.technologies.some((t) => t.toLowerCase().includes(q));

      return matchCategory && matchSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section id="projetos" className={`relative py-24 border-t transition-colors duration-300 ${
      isDark ? 'bg-[#0c081e] border-[#251951]' : 'bg-[#fafafc] border-[#dedee2]'
    }`}>
      {/* Glow backgrounds */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#673de6]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#7b66ff]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono mb-3 border ${
              isDark 
                ? 'bg-[#14102c] border-[#332a68] text-[#bcbdff]' 
                : 'bg-purple-50 border-purple-200 text-[#673de6]'
            }`}>
              <FolderKanban className="w-3.5 h-3.5 text-[#7b66ff]" />
              <span>Showcase de Trabalhos & Portfólio</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Projetos em{' '}
              <span className="bg-gradient-to-r from-[#7b66ff] via-[#9d99ff] to-[#673de6] bg-clip-text text-transparent">
                Destaque
              </span>
            </h2>
            <p className={`text-sm sm:text-base mt-2 max-w-xl font-normal ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Aplicações web, sistemas corporativos, aplicativos móveis e soluções com Inteligência Artificial construídos com rigor técnico.
            </p>
          </div>

          {/* Quick Admin New Project Button */}
          <button
            onClick={onOpenAdmin}
            className={`self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-mono transition-all shadow-sm ${
              isDark 
                ? 'bg-[#14102c] hover:bg-[#251951] border-[#332a68] hover:border-[#7b66ff]/50 text-[#bcbdff]' 
                : 'bg-white hover:bg-slate-100 border-[#dedee2] hover:border-[#673de6] text-[#673de6]'
            }`}
          >
            <Plus className="w-3.5 h-3.5 text-[#7b66ff]" />
            <span>Gerenciar Projetos</span>
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className={`flex flex-col lg:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b ${
          isDark ? 'border-[#332a68]' : 'border-[#dedee2]'
        }`}>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-[#673de6] shadow-sm'
                      : isDark
                        ? 'text-slate-300 bg-[#14102c] hover:bg-[#251951] hover:text-white border border-[#332a68]'
                        : 'text-slate-700 bg-white hover:bg-slate-100 hover:text-slate-950 border border-[#dedee2] shadow-sm'
                  }`}
                >
                  <span>
                    {cat.value === 'IA' ? (
                      <span className="inline-flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-[#7b66ff]" />
                        <span>IA & Agentes</span>
                      </span>
                    ) : (
                      cat.label
                    )}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                      isActive 
                        ? 'bg-black/25 text-white font-bold' 
                        : isDark ? 'bg-[#251951] text-[#bcbdff]' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
            <input
              type="text"
              placeholder="Buscar por nome ou tecnologia..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm transition-all font-sans border focus:outline-none focus:ring-1 ${
                isDark 
                  ? 'bg-[#14102c] border-[#332a68] text-slate-200 placeholder-slate-500 focus:border-[#7b66ff] focus:ring-[#7b66ff]' 
                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#673de6] focus:ring-[#673de6] shadow-sm'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Limpar
              </button>
            )}
          </div>

        </div>

        {/* Projects Cards Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ 
                  duration: 0.5, 
                  delay: (idx % 3) * 0.12, 
                  ease: [0.21, 0.47, 0.32, 0.98] 
                }}
                className={`group relative rounded-2xl border backdrop-blur-md overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 ${
                  isDark 
                    ? 'bg-[#14102c] border-[#332a68] hover:border-[#7b66ff]/60 shadow-md hover:shadow-lg' 
                    : 'bg-white border-[#dedee2] hover:border-[#673de6]/40 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Image Container with Hover Zoom */}
                <div
                  className="relative aspect-video w-full overflow-hidden bg-[#0c081e] cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-black/30 transition-opacity ${
                    isDark ? 'from-[#14102c] opacity-80 group-hover:opacity-60' : 'from-slate-950/60 opacity-60 group-hover:opacity-40'
                  }`} />

                  {/* Category & Status Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold uppercase bg-[#0c081e]/90 backdrop-blur-md text-[#bcbdff] border border-[#673de6]/40">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" /> Destaque
                      </span>
                    )}
                  </div>

                  {/* Quick Expand Button on Image */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="p-2 rounded-lg bg-black/70 backdrop-blur-md text-slate-200 hover:text-[#bcbdff] border border-white/10 flex items-center justify-center">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex flex-col flex-grow">
                  
                  {/* Title & Subtitle */}
                  <div className="mb-3">
                    <h3
                      onClick={() => setSelectedProject(project)}
                      className={`text-lg sm:text-xl font-bold transition-colors cursor-pointer line-clamp-1 ${
                        isDark ? 'text-white group-hover:text-[#bcbdff]' : 'text-slate-900 group-hover:text-[#673de6]'
                      }`}
                    >
                      {project.title}
                    </h3>
                    {project.subtitle && (
                      <p className={`text-xs font-mono mt-1 line-clamp-1 ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        {project.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <p className={`text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4 flex-grow font-normal ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {project.description}
                  </p>

                  {/* Technologies Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
                          isDark 
                            ? 'bg-[#251951] border-[#332a68] text-[#bcbdff]' 
                            : 'bg-purple-50 border-purple-200 text-[#673de6]'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                        isDark ? 'bg-[#251951] text-slate-400' : 'bg-slate-100 text-slate-500'
                      }`}>
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons Bar */}
                  <div className={`pt-4 border-t flex items-center justify-between gap-2 ${
                    isDark ? 'border-[#332a68]' : 'border-[#dedee2]'
                  }`}>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className={`text-xs font-semibold flex items-center gap-1 transition-colors ${
                        isDark ? 'text-[#bcbdff] hover:text-white' : 'text-[#673de6] hover:text-[#542bc9] font-bold'
                      }`}
                    >
                      <span>Ver detalhes</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-2 rounded-lg border transition-all ${
                            isDark 
                              ? 'bg-[#14102c] hover:bg-[#251951] text-slate-300 hover:text-white border-[#332a68]' 
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 border-slate-300'
                          }`}
                          title="Ver Código no GitHub"
                          aria-label="Código no GitHub"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.projectUrl && (
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#673de6] hover:bg-[#542bc9] shadow-sm transition-all"
                        >
                          <span>Acessar</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className={`text-center py-16 rounded-2xl border border-dashed p-8 ${
            isDark ? 'bg-[#14102c]/50 border-[#332a68]' : 'bg-white border-slate-300'
          }`}>
            <Code2 className={`w-12 h-12 mx-auto mb-3 ${isDark ? 'text-slate-600' : 'text-slate-400'}`} />
            <h4 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Nenhum projeto encontrado</h4>
            <p className={`text-xs sm:text-sm max-w-md mx-auto mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Não encontramos projetos para os filtros selecionados. Tente ajustar o termo de pesquisa ou categoria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Todos');
                setSearchQuery('');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border ${
                isDark ? 'text-[#bcbdff] bg-[#14102c] border-[#332a68]' : 'text-[#673de6] bg-purple-50 border-purple-200'
              }`}
            >
              Resetar Filtros
            </button>
          </div>
        )}

      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

