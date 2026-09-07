import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Send, 
  Sparkles 
} from 'lucide-react';
import { USER_LOGO_URL, USER_LOGO_FALLBACK, USER_LOGO_LOCAL } from './Logo';
import { useTheme } from '../context/ThemeContext';
import { SupercomputerBackground } from './SupercomputerBackground';

export const Hero: React.FC = () => {
  const { isDark } = useTheme();
  const [logoSrc, setLogoSrc] = useState<string>(USER_LOGO_LOCAL);

  const handleLogoError = () => {
    if (logoSrc === USER_LOGO_LOCAL) {
      setLogoSrc(USER_LOGO_URL);
    } else if (logoSrc === USER_LOGO_URL) {
      setLogoSrc(USER_LOGO_FALLBACK);
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative min-h-[95vh] flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden isolate">
      {/* Supercomputer Silhouette Atmospheric Background */}
      <SupercomputerBackground />

      {/* Dynamic Subtle Tech Grid */}
      <div className={`absolute inset-0 [background-size:28px_28px] pointer-events-none ${
        isDark 
          ? 'bg-[radial-gradient(#1e293b_1px,transparent_1px)] opacity-15' 
          : 'bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] opacity-30'
      }`} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">
        
        {/* CENTERPIECE: Translucent Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-8 flex flex-col items-center justify-center group w-full"
        >
          {/* Gentle, subtle light backplate */}
          <div className={`absolute inset-0 -m-8 rounded-full blur-2xl pointer-events-none transition-opacity duration-500 ${
            isDark 
              ? 'bg-[#673de6]/10 opacity-60 group-hover:opacity-80' 
              : 'bg-[#673de6]/5 opacity-50 group-hover:opacity-70'
          }`} />
          
          {/* Clean Translucent Logo Element */}
          <div className="relative z-10 flex items-center justify-center p-4 w-full">
            <div className="relative inline-flex items-center justify-center w-[75vw] max-w-[500px] max-h-[44vh] sm:max-h-[48vh] aspect-[612/408] transition-all duration-500 transform hover:scale-[1.02]">
              <img
                src={logoSrc}
                alt="Logo Oficial"
                className={`w-full h-full object-contain transition-all duration-500 ${
                  isDark 
                    ? 'opacity-95 hover:opacity-100 filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.35)] hover:drop-shadow-[0_6px_24px_rgba(103,61,230,0.3)]' 
                    : 'opacity-95 hover:opacity-100 filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:drop-shadow-[0_6px_20px_rgba(103,61,230,0.2)]'
                }`}
                referrerPolicy="no-referrer"
                onError={handleLogoError}
              />
            </div>
          </div>
        </motion.div>

        {/* Main Content Area */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto w-full">
          
          {/* Status Pill Badge Hostinger Violet */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs font-mono mb-6 ${
              isDark 
                ? 'bg-[#14102c] border-[#332a68] text-[#bcbdff]' 
                : 'bg-purple-50 border-purple-200 text-[#673de6]'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7b66ff] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#673de6]"></span>
            </span>
            <span className="tracking-wide font-medium">Disponível para novos projetos</span>
            <span className={isDark ? 'text-slate-600' : 'text-slate-300'}>|</span>
            <span className={`flex items-center gap-1.5 ${isDark ? 'text-[#bcbdff]' : 'text-[#673de6]'}`}>
              <Sparkles className="w-3.5 h-3.5 text-[#7b66ff]" />
              <span className="font-medium">Full Stack & IA</span>
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15] mb-6 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Transformando ideias em{' '}
            <span className="bg-gradient-to-r from-[#7b66ff] via-[#9d99ff] to-[#673de6] bg-clip-text text-transparent">
              experiências digitais
            </span>
          </motion.h1>

          {/* Presentation text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-lg sm:text-xl font-normal leading-relaxed mb-8 max-w-2xl ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Desenvolvedor Full Stack focado em tecnologia de ponta, alta performance e inovação.
            Especializado na criação de <strong className={isDark ? 'text-[#bcbdff] font-semibold' : 'text-[#673de6] font-semibold'}>sites modernos</strong>,{' '}
            <strong className={isDark ? 'text-[#9d99ff] font-semibold' : 'text-[#471ea7] font-semibold'}>sistemas web robustos</strong>,{' '}
            <strong className={isDark ? 'text-cyan-300 font-semibold' : 'text-cyan-700 font-semibold'}>aplicativos móveis fluidos</strong> e soluções escaláveis potencializadas por{' '}
            <strong className={isDark ? 'text-[#7b66ff] font-semibold' : 'text-[#673de6] font-semibold'}>Inteligência Artificial (IA)</strong>.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => scrollTo('projetos')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl font-bold text-white bg-[#673de6] hover:bg-[#542bc9] shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              id="hero-ver-projetos-btn"
            >
              <span>Ver projetos</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => scrollTo('contato')}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl font-semibold border transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm hover:shadow-md ${
                isDark
                  ? 'text-slate-200 bg-[#14102c] hover:bg-[#251951] border-[#332a68] hover:border-[#7b66ff]/50'
                  : 'text-slate-700 bg-white hover:bg-slate-50 border-slate-300 hover:border-[#673de6] hover:text-[#673de6]'
              }`}
              id="hero-entrar-contato-btn"
            >
              <Send className="w-4 h-4 text-[#7b66ff]" />
              <span>Entrar em contato</span>
            </button>
          </motion.div>

          {/* Quick Badges / Trust points */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className={`mt-12 pt-8 border-t grid grid-cols-3 gap-6 sm:gap-10 w-full max-w-lg mx-auto ${
              isDark ? 'border-[#332a68]/70' : 'border-slate-200'
            }`}
          >
            <div>
              <div className={`text-2xl sm:text-3xl font-extrabold font-mono flex items-center justify-center ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                +100<span className="text-[#7b66ff]">%</span>
              </div>
              <div className={`text-xs font-sans mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Foco em Performance</div>
            </div>
            <div>
              <div className={`text-2xl sm:text-3xl font-extrabold font-mono flex items-center justify-center ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                +40<span className="text-[#9d99ff]">k</span>
              </div>
              <div className={`text-xs font-sans mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Linhas de Código Limpo</div>
            </div>
            <div>
              <div className={`text-2xl sm:text-3xl font-extrabold font-mono flex items-center justify-center ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                24<span className="text-[#673de6]">/7</span>
              </div>
              <div className={`text-xs font-sans mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Arquitetura Escalável</div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};


