import React from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  Database, 
  GitBranch, 
  Sparkles, 
  BookOpen, 
  Quote, 
  Cpu, 
  CheckCircle2, 
  Terminal,
  ShieldCheck,
  Server
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface SkillItem {
  id: string;
  name: string;
  role: string;
  icon: React.ElementType;
  accentColor: string;
  badgeBg: string;
  borderHover: string;
  description: React.ReactNode;
  tags: string[];
}

export const TechRadar: React.FC = () => {
  const { isDark } = useTheme();

  const skills: SkillItem[] = [
    {
      id: 'supabase',
      name: 'Supabase',
      role: 'Backend & Cloud',
      icon: Zap,
      accentColor: 'text-[#3ecf8e]',
      badgeBg: 'bg-[#3ecf8e]/10 text-[#3ecf8e] border-[#3ecf8e]/30',
      borderHover: isDark ? 'hover:border-[#3ecf8e]/50' : 'hover:border-[#3ecf8e]/60',
      description: (
        <p>
          Utilizo o Supabase para estruturar o backend de aplicações, trabalhando com{' '}
          <strong className={isDark ? 'text-white font-semibold' : 'text-slate-900 font-semibold'}>
            bancos de dados PostgreSQL, autenticação de usuários, armazenamento de dados e integração com aplicações web
          </strong>.
        </p>
      ),
      tags: ['PostgreSQL', 'Authentication', 'Database', 'Storage', 'Backend']
    },
    {
      id: 'sql',
      name: 'SQL',
      role: 'Banco de Dados',
      icon: Database,
      accentColor: 'text-[#60a5fa]',
      badgeBg: 'bg-[#60a5fa]/10 text-[#60a5fa] border-[#60a5fa]/30',
      borderHover: isDark ? 'hover:border-[#60a5fa]/50' : 'hover:border-[#60a5fa]/60',
      description: (
        <p>
          Criação e organização de bancos de dados relacionais utilizando SQL, desenvolvendo{' '}
          <strong className={isDark ? 'text-white font-semibold' : 'text-slate-900 font-semibold'}>
            tabelas, relacionamentos, consultas, funções e estruturas de dados
          </strong>{' '}
          para diferentes tipos de sistemas.
        </p>
      ),
      tags: ['Queries', 'Joins', 'Relacionamentos', 'CRUD', 'PostgreSQL']
    },
    {
      id: 'github',
      name: 'GitHub',
      role: 'Versionamento & Projetos',
      icon: GitBranch,
      accentColor: 'text-[#bcbdff]',
      badgeBg: 'bg-[#7b66ff]/10 text-[#bcbdff] border-[#7b66ff]/30',
      borderHover: isDark ? 'hover:border-[#7b66ff]/50' : 'hover:border-[#673de6]/60',
      description: (
        <p>
          Utilizo o GitHub para{' '}
          <strong className={isDark ? 'text-white font-semibold' : 'text-slate-900 font-semibold'}>
            organização, armazenamento e versionamento de projetos
          </strong>
          , mantendo o desenvolvimento estruturado e facilitando o acompanhamento das alterações realizadas no código.
        </p>
      ),
      tags: ['Git', 'GitHub', 'Repositories', 'Version Control', 'Projetos']
    },
    {
      id: 'ia',
      name: 'Inteligência Artificial',
      role: 'IA & Desenvolvimento',
      icon: Sparkles,
      accentColor: 'text-[#c084fc]',
      badgeBg: 'bg-[#c084fc]/10 text-[#c084fc] border-[#c084fc]/30',
      borderHover: isDark ? 'hover:border-[#c084fc]/50' : 'hover:border-[#9333ea]/60',
      description: (
        <div className="space-y-2">
          <p>
            Utilizo ferramentas e modelos de Inteligência Artificial como apoio no desenvolvimento de soluções, explorando IA para{' '}
            <strong className={isDark ? 'text-white font-semibold' : 'text-slate-900 font-semibold'}>
              automação, geração de conteúdo, criação de aplicações inteligentes e otimização de processos
            </strong>.
          </p>
          <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
            Também busco integrar recursos de IA aos projetos para desenvolver experiências mais modernas, eficientes e interativas.
          </p>
        </div>
      ),
      tags: ['Inteligência Artificial', 'Prompt Engineering', 'Automação', 'APIs de IA', 'IA Generativa']
    }
  ];

  return (
    <section 
      id="skills" 
      className={`relative py-24 border-t transition-colors duration-300 overflow-hidden ${
        isDark ? 'bg-[#0c081e] border-[#251951]' : 'bg-[#fafafc] border-[#dedee2]'
      }`}
    >
      {/* Anchor for backward compatibility with #tecnologias */}
      <span id="tecnologias" className="absolute -top-20" aria-hidden="true" />

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
            Minhas{' '}
            <span className="bg-gradient-to-r from-[#7b66ff] via-[#9d99ff] to-[#673de6] bg-clip-text text-transparent">
              Skills
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`text-base sm:text-lg mt-4 leading-relaxed font-normal ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Tecnologias e ferramentas que utilizo para desenvolver soluções digitais modernas, funcionais e bem estruturadas.
          </motion.p>
        </div>

        {/* 4 Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {skills.map((skill, idx) => {
            const IconComponent = skill.icon;
            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                className={`rounded-2xl p-6 sm:p-7 border backdrop-blur-md transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-lg flex flex-col justify-between group ${
                  isDark 
                    ? `bg-[#14102c] border-[#332a68] ${skill.borderHover}` 
                    : `bg-white border-[#dedee2] ${skill.borderHover}`
                }`}
              >
                <div>
                  {/* Top Bar: Icon + Title + Category Pill */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-105 ${
                        isDark 
                          ? 'bg-[#1c183a] border-[#332a68]' 
                          : 'bg-slate-50 border-slate-200'
                      } ${skill.accentColor}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {skill.name}
                        </h3>
                        <span className="text-xs font-mono font-medium text-[#7b66ff]">
                          {skill.role}
                        </span>
                      </div>
                    </div>

                    <span className={`px-2.5 py-1 rounded-lg text-xs font-mono border ${skill.badgeBg}`}>
                      {skill.name === 'SQL' ? 'RDBMS' : skill.name === 'Supabase' ? 'Cloud BaaS' : skill.name === 'GitHub' ? 'VCS' : 'AI Models'}
                    </span>
                  </div>

                  {/* Body Description */}
                  <div className={`text-sm sm:text-base leading-relaxed mb-6 font-normal ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {skill.description}
                  </div>
                </div>

                {/* Tags / Sub-competências */}
                <div className={`pt-4 border-t flex flex-wrap items-center gap-1.5 ${
                  isDark ? 'border-[#332a68]' : 'border-slate-100'
                }`}>
                  {skill.tags.map((tag, tagIdx) => (
                    <span
                      key={tag}
                      className={`inline-flex items-center text-xs font-mono px-2.5 py-1 rounded-md border ${
                        isDark 
                          ? 'bg-[#0c081e] text-[#bcbdff] border-[#251951]' 
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      <code>{tag}</code>
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Card: Sempre aprendendo + Citação */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className={`rounded-2xl p-6 sm:p-8 border backdrop-blur-md relative overflow-hidden shadow-md ${
            isDark 
              ? 'bg-gradient-to-br from-[#14102c] via-[#171333] to-[#14102c] border-[#332a68]' 
              : 'bg-gradient-to-br from-white via-purple-50/40 to-white border-[#dedee2]'
          }`}
        >
          {/* Subtle Ambient Accent Glow inside card */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#673de6]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            {/* Left Column: Contexto de evolução */}
            <div className="max-w-2xl">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2 rounded-lg bg-[#673de6]/15 text-[#7b66ff] border border-[#673de6]/30">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Sempre aprendendo
                </h3>
              </div>

              <p className={`text-sm sm:text-base leading-relaxed mb-2 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Tecnologia está em constante evolução — e meu conhecimento também.
              </p>
              
              <p className={`text-sm sm:text-base leading-relaxed mb-5 ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Busco continuamente aprimorar minhas habilidades, conhecer novas ferramentas e aplicar novos conhecimentos em projetos reais.
              </p>

              {/* Badges dos 4 pilares destacados */}
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold font-mono tracking-wide border shadow-sm ${
                  isDark 
                    ? 'bg-[#251951] text-[#bcbdff] border-[#673de6]/40' 
                    : 'bg-purple-100 text-[#673de6] border-purple-200'
                }`}>
                  Supabase • SQL • GitHub • Inteligência Artificial
                </span>
              </div>
            </div>

            {/* Right Column: Quote destacada */}
            <div className={`w-full lg:w-auto lg:max-w-md p-5 sm:p-6 rounded-xl border relative ${
              isDark 
                ? 'bg-[#0c081e]/80 border-[#332a68]' 
                : 'bg-white/80 border-purple-200 shadow-sm'
            }`}>
              <Quote className="w-7 h-7 text-[#7b66ff]/40 mb-2" />
              <blockquote className={`text-sm sm:text-base italic leading-relaxed font-medium ${
                isDark ? 'text-slate-200' : 'text-slate-800'
              }`}>
                “Tecnologia é ferramenta. O diferencial está em saber utilizá-la para transformar problemas em soluções.”
              </blockquote>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
