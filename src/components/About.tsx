import React from 'react';
import { motion } from 'motion/react';
import { 
  Code2, 
  Cpu, 
  Sparkles, 
  Rocket, 
  ShieldCheck, 
  Terminal, 
  Layers, 
  Zap, 
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const About: React.FC = () => {
  const { isDark } = useTheme();

  const pillars = [
    {
      icon: Code2,
      title: 'Desenvolvimento Web & Sites',
      description: 'Criação de websites modernos, landing pages de alta conversão e interfaces ricas com React, Next.js e TypeScript, garantindo pontuações máximas em SEO e velocidade.',
      accent: isDark ? 'border-[#332a68] hover:border-[#7b66ff]/60' : 'border-[#dedee2] hover:border-[#673de6]/40',
      iconColor: 'text-[#7b66ff]',
      glow: 'from-[#673de6]/15 to-transparent'
    },
    {
      icon: Layers,
      title: 'Sistemas Web & SaaS',
      description: 'Arquitetura de plataformas escaláveis, ERPs, CRMs e painéis administrativos com regras de negócio complexas, autenticação robusta e bancos de dados seguros.',
      accent: isDark ? 'border-[#332a68] hover:border-[#9d99ff]/60' : 'border-[#dedee2] hover:border-[#673de6]/40',
      iconColor: 'text-[#9d99ff]',
      glow: 'from-[#7b66ff]/15 to-transparent'
    },
    {
      icon: Zap,
      title: 'Aplicativos Mobile',
      description: 'Experiências mobile responsivas e aplicativos intuitivos para iOS e Android com sincronização em tempo real, suporte offline e biometria.',
      accent: isDark ? 'border-[#332a68] hover:border-[#bcbdff]/60' : 'border-[#dedee2] hover:border-[#673de6]/40',
      iconColor: 'text-[#bcbdff]',
      glow: 'from-[#673de6]/15 to-transparent'
    },
    {
      icon: Sparkles,
      title: 'Inteligência Artificial (IA)',
      description: 'Implementação de modelos generativos (Gemini, OpenAI), agentes autônomos, sistemas RAG (busca vetorial) e automações inteligentes para alavancar negócios.',
      accent: isDark ? 'border-[#332a68] hover:border-[#673de6]/80' : 'border-[#dedee2] hover:border-[#673de6]/40',
      iconColor: 'text-[#7b66ff]',
      glow: 'from-[#7b66ff]/15 to-transparent'
    }
  ];

  return (
    <section id="sobre" className={`relative py-24 border-t transition-colors duration-300 overflow-hidden ${
      isDark ? 'bg-[#0c081e] border-[#251951]' : 'bg-[#fafafc] border-[#dedee2]'
    }`}>
      {/* Background glow accents */}
      <div className="absolute top-1/2 -left-48 w-80 h-80 bg-[#673de6]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-48 w-80 h-80 bg-[#7b66ff]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono mb-4 border ${
              isDark 
                ? 'bg-[#14102c] border-[#332a68] text-[#bcbdff]' 
                : 'bg-purple-50 border-purple-200 text-[#673de6]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-[#7b66ff]" />
            <span>Engenharia de Software & Inovação</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Desenvolvedor focado em tecnologia,{' '}
            <span className="bg-gradient-to-r from-[#7b66ff] via-[#9d99ff] to-[#673de6] bg-clip-text text-transparent">
              inovação e resultados reais
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={`text-base sm:text-lg mt-4 leading-relaxed font-normal ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Unindo engenharia de software rigorosa, design centrado no usuário e o poder da Inteligência Artificial para construir produtos digitais que definem novos padrões de mercado.
          </motion.p>
        </div>

        {/* Narrative & Bio Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Left Bio Card */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={`lg:col-span-7 rounded-2xl p-6 sm:p-8 backdrop-blur-md relative border flex flex-col justify-between ${
              isDark 
                ? 'bg-[#14102c] border-[#332a68] shadow-md' 
                : 'bg-white border-[#dedee2] shadow-sm'
            }`}
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-[#673de6]/15 border border-[#673de6]/30 text-[#7b66ff]">
                  <Rocket className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Minha Filosofia de Desenvolvimento</h3>
                  <p className={`text-xs font-mono ${isDark ? 'text-[#bcbdff]' : 'text-slate-500'}`}>Código limpo, arquitetura escalável e impacto direto</p>
                </div>
              </div>

              <div className={`space-y-4 text-sm sm:text-base leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                <p>
                  Sou desenvolvedor em constante evolução, apaixonado por tecnologia e pela criação de soluções digitais que unem funcionalidade, design e inovação.
                </p>
                <p>
                  Atuo no desenvolvimento de sites, aplicações web e sistemas, buscando transformar ideias e necessidades em projetos funcionais, modernos e bem estruturados.
                </p>
                <p>
                  Tenho conhecimentos em desenvolvimento Front-end e Back-end, bancos de dados, APIs, serviços em nuvem e Inteligência Artificial, explorando essas tecnologias para criar soluções cada vez mais completas e eficientes.
                </p>
                <p>
                  Mesmo estando construindo minha experiência profissional, levo cada projeto com seriedade, comprometimento e responsabilidade. Valorizo código organizado, interfaces intuitivas, boa comunicação e atenção aos detalhes durante todo o processo de desenvolvimento.
                </p>
                <p>
                  Acredito que desenvolver software vai muito além de escrever código. É necessário entender o problema, planejar uma solução adequada e construir uma experiência que realmente faça sentido para quem irá utilizá-la.
                </p>
              </div>
            </div>

            {/* Core commitments */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 pt-6 border-t ${
              isDark ? 'border-[#332a68]' : 'border-[#dedee2]'
            }`}>
              <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <CheckCircle className="w-4 h-4 text-[#7b66ff] shrink-0" />
                <span>Arquitetura limpa & TypeScript</span>
              </div>
              <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Autenticação & Segurança de Dados</span>
              </div>
              <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <CheckCircle className="w-4 h-4 text-[#9d99ff] shrink-0" />
                <span>Otimização para Mobile & Desktop</span>
              </div>
              <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <CheckCircle className="w-4 h-4 text-[#673de6] shrink-0" />
                <span>Automação e Agentes de IA</span>
              </div>
            </div>
          </motion.div>

          {/* Right Metrics & Quick Info with Staggered Entry */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {/* Tech Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
              className={`border rounded-2xl p-5 transition-all duration-300 shadow-md ${
                isDark 
                  ? 'bg-[#14102c] border-[#332a68] hover:border-[#7b66ff]/50' 
                  : 'bg-white border-[#dedee2] hover:border-[#673de6]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-[#7b66ff] uppercase tracking-wider font-semibold">Especialização</span>
                <span className={`text-xs px-2 py-0.5 rounded border ${
                  isDark ? 'bg-[#251951] text-[#bcbdff] border-[#673de6]/40' : 'bg-purple-50 text-[#673de6] border-purple-200'
                }`}>
                  Full Stack & IA
                </span>
              </div>
              <div className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Engenharia de Ponta a Ponta</div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Do frontend dinâmico (React/Next.js) até bancos de dados relacionais (PostgreSQL/Supabase) e pipelines de IA (Python/Gemini).
              </p>
            </motion.div>

            {/* Tech Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.24, ease: [0.21, 0.47, 0.32, 0.98] }}
              className={`border rounded-2xl p-5 transition-all duration-300 shadow-md ${
                isDark 
                  ? 'bg-[#14102c] border-[#332a68] hover:border-[#9d99ff]/50' 
                  : 'bg-white border-[#dedee2] hover:border-[#673de6]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-[#9d99ff] uppercase tracking-wider font-semibold">Metodologia</span>
                <span className={`text-xs px-2 py-0.5 rounded border ${
                  isDark ? 'bg-[#251951] text-[#bcbdff] border-[#673de6]/40' : 'bg-purple-50 text-[#673de6] border-purple-200'
                }`}>Ágil & Fluida</span>
              </div>
              <div className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Entregas Rápidas & Iterativas</div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Prototipagem ágil, validação contínua e implementação de código de alta manutenibilidade com testes e documentação.
              </p>
            </motion.div>

            {/* Tech Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.36, ease: [0.21, 0.47, 0.32, 0.98] }}
              className={`border rounded-2xl p-5 transition-all duration-300 shadow-md ${
                isDark 
                  ? 'bg-[#14102c] border-[#332a68] hover:border-[#673de6]/60' 
                  : 'bg-white border-[#dedee2] hover:border-[#673de6]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-[#7b66ff] uppercase tracking-wider font-semibold">Inovação Contínua</span>
                <span className={`text-xs px-2 py-0.5 rounded border ${
                  isDark ? 'bg-[#251951] text-[#bcbdff] border-[#673de6]/40' : 'bg-purple-50 text-[#673de6] border-purple-200'
                }`}>2026 Ready</span>
              </div>
              <div className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Sistemas Inteligentes & Autônomos</div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Incorporação de IA generativa para acelerar processos de negócio e automatizar tarefas manuais repetitivas.
              </p>
            </motion.div>
          </div>

        </div>

        {/* 4 Pillars Grid with Staggered Entry */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ 
                  duration: 0.5, 
                  delay: (idx % 4) * 0.12, 
                  ease: [0.21, 0.47, 0.32, 0.98] 
                }}
                className={`backdrop-blur-md rounded-2xl p-6 border ${pillar.accent} transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md group relative overflow-hidden ${
                  isDark ? 'bg-[#14102c]' : 'bg-white'
                }`}
              >
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-b ${pillar.glow} rounded-full blur-xl pointer-events-none opacity-40`} />
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${pillar.iconColor} group-hover:scale-110 transition-transform duration-300 border ${
                  isDark ? 'bg-[#251951] border-[#332a68]' : 'bg-purple-50 border-purple-100'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{pillar.title}</h4>
                <p className={`text-xs sm:text-sm leading-relaxed font-normal ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{pillar.description}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

