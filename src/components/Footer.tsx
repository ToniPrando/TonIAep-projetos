import React, { useState, useEffect } from 'react';
import { 
  ArrowUp, 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  Sparkles, 
  ShieldCheck,
  Eye,
  Activity
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { registerVisit, VisitStats } from '../lib/visits';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const { isDark } = useTheme();
  const [stats, setStats] = useState<VisitStats>({
    total: 1249,
    today: 1,
    source: 'local'
  });

  useEffect(() => {
    let isMounted = true;
    registerVisit()
      .then((data) => {
        if (isMounted) {
          setStats(data);
        }
      })
      .catch((err) => {
        console.warn('Error loading visits:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Sobre Mim', href: '#sobre' },
    { label: 'Projetos', href: '#projetos' },
    { label: 'Skills', href: '#skills' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Contato', href: '#contato' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className={`relative border-t pt-16 pb-12 overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-[#0c081e] border-[#251951]' : 'bg-[#14102c] border-[#251951] text-slate-200'
    }`}>
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-gradient-to-t from-[#673de6]/5 to-transparent blur-xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Top Footer Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#251951]">
          
          {/* Presentation (Logo and DeV STUDIO text removed) */}
          <div className="md:col-span-5 flex flex-col items-start">
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm font-normal mb-6">
              Desenvolvimento de software de alta performance, websites responsivos, aplicativos mobile e sistemas inteligentes potencializados por IA.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="p-2.5 rounded-xl bg-[#14102c] hover:bg-[#251951] text-slate-400 hover:text-white border border-[#332a68] transition-colors cursor-default"
                aria-label="GitHub"
                title="GitHub (Em breve)"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="p-2.5 rounded-xl bg-[#14102c] hover:bg-[#251951] text-slate-400 hover:text-[#bcbdff] border border-[#332a68] transition-colors cursor-default"
                aria-label="LinkedIn"
                title="LinkedIn (Em breve)"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:antonioestefanoprando@gmail.com"
                className="p-2.5 rounded-xl bg-[#14102c] hover:bg-[#251951] text-slate-400 hover:text-[#7b66ff] border border-[#332a68] transition-colors"
                aria-label="E-mail"
                title="Enviar E-mail"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/5515997075641"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#14102c] hover:bg-[#251951] text-slate-400 hover:text-emerald-400 border border-[#332a68] transition-colors"
                aria-label="WhatsApp"
                title="Conversar no WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold mb-4">
              Navegação Rápida
            </h4>
            <div className="grid grid-cols-2 gap-2.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-xs sm:text-sm text-slate-400 hover:text-[#bcbdff] transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Admin & Back to Top */}
          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold mb-3 md:text-right">
                Acesso Restrito
              </h4>
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#14102c] hover:bg-[#251951] border border-[#332a68] hover:border-[#7b66ff]/50 text-xs font-mono text-[#bcbdff] transition-all shadow-sm"
              >
                <ShieldCheck className="w-4 h-4 text-[#7b66ff]" />
                <span>Painel Administrativo</span>
              </button>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-6 md:mt-0 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#14102c] hover:bg-[#251951] border border-[#332a68] text-xs font-mono text-slate-400 hover:text-white transition-all"
            >
              <span>Voltar ao topo</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#7b66ff]" />
            </button>
          </div>

        </div>

        {/* Bottom Copyright, Visitor Counter & Tech Sign */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="text-slate-300">
              © 2026 — Todos os direitos reservados.
            </div>
            
            <span className="hidden sm:inline text-slate-600">•</span>
            
            {/* Live Access Counter Badge */}
            <div 
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14102c] border border-[#332a68] text-slate-300 shadow-inner group hover:border-[#7b66ff]/40 transition-colors"
              title={`Total de acessos reais contabilizados: ${stats.total.toLocaleString('pt-BR')} (${stats.today} hoje)`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <Eye className="w-3.5 h-3.5 text-[#7b66ff]" />
              <span className="text-slate-400 text-[11px]">Acessos:</span>
              <span className="font-bold text-white font-mono tracking-wider">{stats.total.toLocaleString('pt-BR')}</span>
              {stats.today > 0 && (
                <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-800/40">
                  +{stats.today} hoje
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span>Desenvolvido com</span>
            <span className="text-[#bcbdff] font-semibold">React & Tailwind</span>
            <span>•</span>
            <span className="text-[#7b66ff] font-semibold">Design Hostinger</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

