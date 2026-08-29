import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { TechRadar } from './components/TechRadar';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminModal } from './components/AdminModal';
import { Project } from './types';
import { fetchProjects, isSupabaseConnected } from './lib/supabase';
import { MessageCircle } from 'lucide-react';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function PortfolioApp() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const [isSupabaseActive, setIsSupabaseActive] = useState(false);
  const { isDark } = useTheme();

  const loadProjects = useCallback(async () => {
    const data = await fetchProjects();
    setProjects(data);
    setIsSupabaseActive(isSupabaseConnected());
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleSelectServiceForContact = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-[#673de6]/30 selection:text-[#bcbdff] transition-colors duration-300 relative overflow-x-hidden ${
      isDark 
        ? 'bg-[#0c081e] text-slate-100' 
        : 'bg-[#fafafc] text-slate-900'
    }`}>
      {/* Subtle Ambient Mesh Glows */}
      <div className={`fixed top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] blur-3xl pointer-events-none -z-10 transition-opacity duration-500 ${
        isDark 
          ? 'bg-[#673de6]/5 opacity-60' 
          : 'bg-[#673de6]/5 opacity-40'
      }`} />

      {/* Navigation Bar */}
      <Navbar
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        isSupabaseActive={isSupabaseActive}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero / Início */}
        <Hero />

        {/* 2. Sobre Mim */}
        <About />

        {/* 3. Projetos (Sites, Apps, Sistemas, IA) */}
        <Projects
          projects={projects}
          onOpenAdmin={() => setIsAdminModalOpen(true)}
        />

        {/* 4. Tecnologias */}
        <TechRadar />

        {/* 5. Serviços */}
        <Services onSelectServiceForContact={handleSelectServiceForContact} />

        {/* 6. Contato */}
        <Contact initialService={selectedService} />
      </main>

      {/* 7. Rodapé */}
      <Footer onOpenAdmin={() => setIsAdminModalOpen(true)} />

      {/* Floating Action Quick Access (WhatsApp) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        <a
          href="https://wa.me/5515997075641?text=Ol%C3%A1!%20Gostaria%20de%20conversar%20sobre%20um%20projeto."
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 p-3.5 sm:px-4 sm:py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all duration-300 hover:scale-105"
          title="Falar no WhatsApp"
          aria-label="Conversar no WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="hidden sm:inline text-xs">WhatsApp</span>
        </a>
      </div>

      {/* Admin Management Modal */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        projects={projects}
        onProjectsUpdated={loadProjects}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}

