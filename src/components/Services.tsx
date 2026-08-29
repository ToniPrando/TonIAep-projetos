import React from 'react';
import { motion } from 'motion/react';
import { 
  Laptop, 
  Cpu, 
  Smartphone, 
  BarChart3, 
  Database, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import { SERVICES_LIST } from '../data/initialData';
import { ServiceItem } from '../types';
import { useTheme } from '../context/ThemeContext';

interface ServicesProps {
  onSelectServiceForContact?: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectServiceForContact }) => {
  const { isDark } = useTheme();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout':
        return <Laptop className="w-6 h-6" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6" />;
      case 'BarChart3':
        return <BarChart3 className="w-6 h-6" />;
      case 'Database':
        return <Database className="w-6 h-6" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6" />;
      default:
        return <Laptop className="w-6 h-6" />;
    }
  };

  const handleServiceClick = (serviceTitle: string) => {
    if (onSelectServiceForContact) {
      onSelectServiceForContact(serviceTitle);
    }
    const contactSection = document.getElementById('contato');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="servicos" className={`relative py-24 border-t transition-colors duration-300 ${
      isDark ? 'bg-[#0c081e] border-[#251951]' : 'bg-[#fafafc] border-[#dedee2]'
    }`}>
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#673de6]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#7b66ff]/5 rounded-full blur-3xl pointer-events-none" />

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
            <Laptop className="w-3.5 h-3.5 text-[#7b66ff]" />
            <span>Serviços & Soluções Digitais</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Soluções sob medida para o seu{' '}
            <span className="bg-gradient-to-r from-[#7b66ff] via-[#9d99ff] to-[#673de6] bg-clip-text text-transparent">
              Crescimento
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={`text-sm sm:text-base mt-4 leading-relaxed font-normal ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Da estratégia ao código em produção: desenvolvimento completo, design moderno e integrações inteligentes.
          </motion.p>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_LIST.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ 
                duration: 0.5, 
                delay: (idx % 3) * 0.12, 
                ease: [0.21, 0.47, 0.32, 0.98] 
              }}
              className={`group relative rounded-2xl p-6 sm:p-7 backdrop-blur-md flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 border ${
                isDark 
                  ? 'bg-[#14102c] border-[#332a68] hover:border-[#7b66ff]/60 shadow-md hover:shadow-lg' 
                  : 'bg-white border-[#dedee2] hover:border-[#673de6]/40 shadow-sm hover:shadow-md'
              }`}
            >
              <div>
                {/* Header with Icon & Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shadow-inner border ${
                    isDark 
                      ? 'bg-[#251951] border-[#332a68] text-[#bcbdff] group-hover:text-white group-hover:border-[#7b66ff]/50 group-hover:bg-[#673de6]' 
                      : 'bg-purple-50 border-purple-200 text-[#673de6] group-hover:text-white group-hover:bg-[#673de6]'
                  }`}>
                    {getIcon(service.icon)}
                  </div>
                  {service.badge && (
                    <span className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold border ${
                      isDark 
                        ? 'bg-[#251951] text-[#bcbdff] border-[#673de6]/40' 
                        : 'bg-purple-50 text-[#673de6] border-purple-200'
                    }`}>
                      {service.badge}
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <h3 className={`text-xl font-bold mb-2 transition-colors ${
                  isDark ? 'text-white group-hover:text-[#bcbdff]' : 'text-slate-900 group-hover:text-[#673de6]'
                }`}>
                  {service.title}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed mb-6 font-normal ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {service.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-2 mb-6">
                  {service.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className={`flex items-center gap-2 text-xs ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#7b66ff] shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className={`pt-4 border-t ${isDark ? 'border-[#332a68]' : 'border-[#dedee2]'}`}>
                <button
                  onClick={() => handleServiceClick(service.title)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all group/btn ${
                    isDark 
                      ? 'bg-[#251951] hover:bg-[#673de6] border-[#332a68] hover:border-[#7b66ff]/50 text-[#bcbdff] hover:text-white' 
                      : 'bg-purple-50 hover:bg-[#673de6] border-purple-200 hover:border-[#673de6] text-[#673de6] hover:text-white'
                  }`}
                >
                  <span>Solicitar Orçamento</span>
                  <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

