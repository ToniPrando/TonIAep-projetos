import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Sparkles, 
  ArrowUpRight, 
  Laptop, 
  FolderKanban, 
  Cpu, 
  Send, 
  User
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  isSupabaseActive?: boolean;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const { isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = ['inicio', 'sobre', 'projetos', 'skills', 'tecnologias', 'servicos', 'contato'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId === 'tecnologias' ? 'skills' : sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Início', href: '#inicio', id: 'inicio', icon: Sparkles },
    { label: 'Sobre Mim', href: '#sobre', id: 'sobre', icon: User },
    { label: 'Projetos', href: '#projetos', id: 'projetos', icon: FolderKanban },
    { label: 'Skills', href: '#skills', id: 'skills', icon: Cpu },
    { label: 'Serviços', href: '#servicos', id: 'servicos', icon: Laptop },
    { label: 'Contato', href: '#contato', id: 'contato', icon: Send },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? isDark
              ? 'bg-[#0c081e]/90 backdrop-blur-xl border-b border-[#251951] py-3 shadow-md'
              : 'bg-white/90 backdrop-blur-xl border-b border-[#dedee2] py-3 shadow-sm'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left Spacer / Minimal Section Jump */}
          <div className="flex items-center">
            {/* Logo and DeV STUDIO text removed as requested */}
          </div>

          {/* Desktop Navigation Links */}
          <nav className={`hidden lg:flex items-center gap-1 backdrop-blur-md px-3 py-1.5 rounded-full border ${
            isDark 
              ? 'bg-[#14102c]/80 border-[#332a68]/70' 
              : 'bg-slate-100/90 border-slate-200/90'
          }`}>
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? isDark 
                        ? 'text-[#bcbdff] font-semibold'
                        : 'text-[#673de6] font-semibold'
                      : isDark
                        ? 'text-slate-300 hover:text-white hover:bg-[#251951]/50'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/60'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className={`absolute inset-0 rounded-full border ${
                        isDark 
                          ? 'bg-[#251951]/70 border-[#7b66ff]/40' 
                          : 'bg-purple-100/80 border-[#673de6]/25'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Desktop Right CTA Actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Direct Contact Button */}
            <a
              href="#contato"
              onClick={(e) => scrollToSection(e, '#contato')}
              className="relative inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-[#673de6] hover:bg-[#542bc9] shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <span>Vamos Conversar</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Actions: Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg border focus:outline-none ${
                isDark ? 'bg-[#14102c] border-[#332a68] text-slate-300 hover:text-white' : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-slate-950'
              }`}
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#7b66ff]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={`fixed inset-x-0 top-[60px] z-40 backdrop-blur-2xl border-b px-6 py-6 sm:hidden shadow-2xl flex flex-col gap-4 ${
              isDark 
                ? 'bg-[#0c081e]/95 border-[#332a68] text-slate-200' 
                : 'bg-white/95 border-slate-200 text-slate-800'
            }`}
          >
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      isActive
                        ? isDark
                          ? 'bg-[#673de6]/20 text-[#bcbdff] border border-[#673de6]/40'
                          : 'bg-purple-50 text-[#673de6] border border-purple-200'
                        : isDark
                          ? 'text-slate-300 hover:bg-[#251951]/60 hover:text-white'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-[#7b66ff]' : isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </nav>

            <div className={`pt-4 border-t flex flex-col gap-3 ${isDark ? 'border-[#332a68]' : 'border-slate-200'}`}>
              <a
                href="#contato"
                onClick={(e) => scrollToSection(e, '#contato')}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-white bg-[#673de6] hover:bg-[#542bc9] shadow-md"
              >
                <span>Entrar em Contato</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

