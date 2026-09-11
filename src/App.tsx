import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { TechRadar } from './components/TechRadar';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Project } from './types';
import { fetchProjects, isSupabaseConnected } from './lib/supabase';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function PortfolioApp() {
  const [projects, setProjects] = useState<Project[]>([]);
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
      <Navbar isSupabaseActive={isSupabaseActive} />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero / Início */}
        <Hero />

        {/* 2. Sobre Mim */}
        <About />

        {/* 3. Projetos (Sites, Apps, Sistemas, IA) */}
        <Projects projects={projects} />

        {/* 4. Tecnologias */}
        <TechRadar />

        {/* 5. Serviços */}
        <Services onSelectServiceForContact={handleSelectServiceForContact} />

        {/* 6. Contato */}
        <Contact initialService={selectedService} />
      </main>

      {/* 7. Rodapé */}
      <Footer />
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

