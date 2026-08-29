import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ExternalLink, 
  Github, 
  Layers, 
  CheckCircle2, 
  Calendar, 
  BarChart, 
  Sparkles,
  Tag
} from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-[#14102c] border border-[#332a68] rounded-2xl shadow-[0_0_50px_rgba(103,61,230,0.3)] overflow-hidden z-10 max-h-[90vh] flex flex-col"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#332a68] bg-[#0c081e]/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#251951] text-[#bcbdff] border border-[#673de6]/40">
                {project.category}
              </span>
              {project.featured && (
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  <Sparkles className="w-3 h-3" /> Destaque
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#251951] text-slate-400 hover:text-white hover:bg-[#332a68] transition-colors"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 overflow-y-auto space-y-6">
            
            {/* Image Preview */}
            <div className="relative rounded-xl overflow-hidden border border-[#332a68] bg-[#0c081e] aspect-video max-h-80 w-full group">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14102c] via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3">
                <div className="text-white font-mono text-xs flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                  <Calendar className="w-3.5 h-3.5 text-[#7b66ff]" />
                  <span>{new Date(project.createdAt).toLocaleDateString('pt-BR')}</span>
                </div>

                <div className="flex items-center gap-2">
                  {project.projectUrl && (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#673de6] hover:bg-[#542bc9] shadow-md transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Acessar Projeto</span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-200 bg-[#251951] hover:bg-[#332a68] border border-[#332a68] transition-all"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Ver Código</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Title & Descriptions */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                {project.title}
              </h2>
              {project.subtitle && (
                <p className="text-sm sm:text-base text-[#bcbdff] font-mono mb-4">
                  {project.subtitle}
                </p>
              )}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                {project.description}
              </p>
              {project.longDescription && (
                <div className="p-4 rounded-xl bg-[#0c081e]/70 border border-[#332a68] text-slate-300 text-sm leading-relaxed">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#bcbdff] mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#7b66ff]" />
                    <span>Visão Arquitetural & Escopo</span>
                  </div>
                  {project.longDescription}
                </div>
              )}
            </div>

            {/* Metrics if available */}
            {project.metrics && project.metrics.length > 0 && (
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <BarChart className="w-3.5 h-3.5 text-[#7b66ff]" />
                  <span>Resultados & Métricas de Desempenho</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="bg-[#0c081e]/80 border border-[#332a68] rounded-xl p-3.5 text-center">
                      <div className="text-xl sm:text-2xl font-extrabold font-mono text-[#bcbdff] mb-0.5">
                        {m.value}
                      </div>
                      <div className="text-xs text-slate-400">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Features */}
            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7b66ff]" />
                  <span>Principais Recursos Implementados</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.keyFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#0c081e]/50 border border-[#332a68] text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-[#7b66ff] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Tags */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#7b66ff]" />
                <span>Tecnologias Utilizadas</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-[#251951] text-[#bcbdff] border border-[#332a68] hover:border-[#7b66ff]/50 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Modal Footer Actions */}
          <div className="p-4 sm:p-6 border-t border-[#332a68] bg-[#0c081e]/80 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-400 hover:text-white bg-[#251951] hover:bg-[#332a68] transition-colors"
            >
              Fechar Detalhes
            </button>

            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 bg-[#251951] hover:bg-[#332a68] border border-[#332a68] transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span>Repositório GitHub</span>
                </a>
              )}
              {project.projectUrl && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#673de6] hover:bg-[#542bc9] shadow-[0_0_20px_rgba(103,61,230,0.4)] transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Abrir Projeto</span>
                </a>
              )}
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
