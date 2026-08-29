import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Cpu, 
  Layers, 
  Terminal, 
  Database, 
  Bot, 
  GitBranch, 
  Code2, 
  Sparkles, 
  Check, 
  Zap,
  Flame,
  Braces,
  Palette,
  Server
} from 'lucide-react';
import { TECHNOLOGIES_LIST } from '../data/initialData';
import { Technology } from '../types';
import { useTheme } from '../context/ThemeContext';

export const TechRadar: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Todas');
  const [selectedTech, setSelectedTech] = useState<Technology | null>(TECHNOLOGIES_LIST[0]);
  const { isDark } = useTheme();

  const categories = ['Todas', 'Frontend', 'Backend', 'Database', 'AI & Data', 'DevOps & Tools'];

  const filteredTechs = TECHNOLOGIES_LIST.filter((tech) => {
    if (activeCategory === 'Todas') return true;
    return tech.category === activeCategory;
  });

  const getTechIcon = (name: string) => {
    switch (name) {
      case 'TypeScript':
      case 'JavaScript':
        return <Braces className="w-5 h-5" />;
      case 'React':
      case 'Next.js':
        return <Layers className="w-5 h-5" />;
      case 'HTML & CSS':
        return <Palette className="w-5 h-5" />;
      case 'Node.js':
        return <Server className="w-5 h-5" />;
      case 'Python':
        return <Terminal className="w-5 h-5" />;
      case 'PostgreSQL':
        return <Database className="w-5 h-5" />;
      case 'Supabase':
        return <Zap className="w-5 h-5" />;
      case 'Firebase':
        return <Flame className="w-5 h-5" />;
      case 'Inteligência Artificial (IA)':
        return <Bot className="w-5 h-5" />;
      case 'Git & GitHub':
        return <GitBranch className="w-5 h-5" />;
      default:
        return <Code2 className="w-5 h-5" />;
    }
  };

  return (
    <section id="tecnologias" className={`relative py-24 border-t transition-colors duration-300 overflow-hidden ${
      isDark ? 'bg-[#0c081e] border-[#251951]' : 'bg-[#fafafc] border-[#dedee2]'
    }`}>
      {/* Dynamic Background Glows */}
      <div className="absolute top-10 left-1/4 w-80 h-80 bg-[#673de6]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-[#7b66ff]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono mb-4 border ${
              isDark 
                ? 'bg-[#14102c] border-[#332a68] text-[#bcbdff]' 
                : 'bg-purple-50 border-purple-200 text-[#673de6]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-[#7b66ff]" />
            <span>Ecossistema & Ferramentas</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Stack de{' '}
            <span className="bg-gradient-to-r from-[#7b66ff] via-[#9d99ff] to-[#673de6] bg-clip-text text-transparent">
              Tecnologias Modernas
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`text-sm sm:text-base mt-4 leading-relaxed font-normal ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Dominância nas ferramentas mais produtivas e robustas do mercado global para desenvolvimento de ponta a ponta.
          </motion.p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'text-white bg-[#673de6] shadow-sm'
                    : isDark
                      ? 'text-slate-300 bg-[#14102c] hover:bg-[#251951] hover:text-white border border-[#332a68]'
                      : 'text-slate-700 bg-white hover:bg-slate-100 border border-[#dedee2] shadow-sm'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Technologies Grid & Selected Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Tech Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredTechs.map((tech, idx) => {
              const isSelected = selectedTech?.name === tech.name;
              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.03 }}
                  onClick={() => setSelectedTech(tech)}
                  className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 backdrop-blur-md relative overflow-hidden group ${
                    isSelected
                      ? isDark
                        ? 'bg-[#1c183a] border-[#7b66ff] shadow-md -translate-y-1'
                        : 'bg-purple-50/70 border-[#673de6] shadow-md -translate-y-1'
                      : isDark
                        ? 'bg-[#14102c] border-[#332a68] hover:border-[#7b66ff]/50 hover:bg-[#1c183a]'
                        : 'bg-white border-[#dedee2] hover:border-slate-300 hover:bg-slate-50/80 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border transition-transform duration-200 group-hover:scale-110"
                      style={{
                        backgroundColor: `${tech.color}15`,
                        borderColor: `${tech.color}40`,
                        color: tech.color,
                      }}
                    >
                      {getTechIcon(tech.name)}
                    </div>
                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                      isDark ? 'text-slate-400 bg-[#0c081e] border-[#332a68]' : 'text-slate-600 bg-slate-100 border-slate-200'
                    }`}>
                      {tech.experienceYears || 'Especialista'}
                    </span>
                  </div>

                  <h3 className={`text-base font-bold mb-1 transition-colors ${
                    isDark ? 'text-white group-hover:text-[#bcbdff]' : 'text-slate-900 group-hover:text-[#673de6]'
                  }`}>
                    {tech.name}
                  </h3>
                  <div className={`text-xs font-mono mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{tech.category}</div>

                  {/* Level progress bar */}
                  <div className={`w-full rounded-full h-1.5 overflow-hidden border ${
                    isDark ? 'bg-[#0c081e] border-[#332a68]' : 'bg-slate-100 border-slate-200'
                  }`}>
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${tech.level}%`,
                        backgroundColor: tech.color,
                        boxShadow: `0 0 8px ${tech.color}80`,
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Selected Tech Deep Dive Inspector */}
          {selectedTech && (
            <div className={`lg:col-span-4 rounded-2xl p-6 backdrop-blur-xl shadow-xl sticky top-28 border ${
              isDark 
                ? 'bg-[#14102c] border-[#332a68]' 
                : 'bg-white border-[#dedee2] shadow-lg'
            }`}>
              <div className={`flex items-center gap-3 mb-4 pb-4 border-b ${
                isDark ? 'border-[#332a68]' : 'border-[#dedee2]'
              }`}>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center border"
                  style={{
                    backgroundColor: `${selectedTech.color}20`,
                    borderColor: `${selectedTech.color}50`,
                    color: selectedTech.color,
                  }}
                >
                  {getTechIcon(selectedTech.name)}
                </div>
                <div>
                  <h4 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{selectedTech.name}</h4>
                  <span className={`text-xs font-mono font-semibold ${isDark ? 'text-[#bcbdff]' : 'text-[#673de6]'}`}>{selectedTech.category}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className={`text-xs font-mono uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Proficiência Técnica
                  </div>
                  <div className={`flex items-center justify-between text-sm font-bold mb-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <span>Nível de Domínio</span>
                    <span className={`font-mono ${isDark ? 'text-[#7b66ff]' : 'text-[#673de6]'}`}>{selectedTech.level}%</span>
                  </div>
                  <div className={`w-full rounded-full h-2 overflow-hidden border ${isDark ? 'bg-[#0c081e] border-[#332a68]' : 'bg-slate-100 border-slate-200'}`}>
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#673de6] to-[#7b66ff]"
                      style={{ width: `${selectedTech.level}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <div className={`text-xs font-mono uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Aplicação no Dia a Dia
                  </div>
                  <p className={`text-sm leading-relaxed p-3.5 rounded-xl border ${
                    isDark 
                      ? 'text-slate-300 bg-[#0c081e]/80 border-[#332a68]' 
                      : 'text-slate-600 bg-slate-50 border-slate-200'
                  }`}>
                    {selectedTech.description}
                  </p>
                </div>

                <div className={`pt-2 flex items-center justify-between text-xs border-t pt-4 ${
                  isDark ? 'text-slate-400 border-[#332a68]' : 'text-slate-500 border-slate-200'
                }`}>
                  <span>Tempo de Prática:</span>
                  <span className={`font-mono font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{selectedTech.experienceYears}</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

