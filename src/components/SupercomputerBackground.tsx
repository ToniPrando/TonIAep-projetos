import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import supercomputerImg from '../assets/images/supercomputer_silhouette_1788784047279.jpg';

export const SupercomputerBackground: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div 
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Supercomputer Silhouette Mainframe Image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: isDark ? 0.72 : 0.28, scale: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={supercomputerImg}
          alt="Supercomputer Data Center Silhouette"
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-center transform transition-all duration-700 ${
            isDark 
              ? 'filter brightness-[0.75] contrast-[1.35] saturate-[1.2]' 
              : 'filter brightness-[0.95] contrast-[1.2] grayscale opacity-75'
          }`}
        />
      </motion.div>

      {/* Atmospheric Deep Tone Color Grading */}
      <div 
        className={`absolute inset-0 transition-colors duration-500 ${
          isDark 
            ? 'bg-[#0c081e]/35 mix-blend-multiply' 
            : 'bg-[#fafafc]/40 mix-blend-screen'
        }`} 
      />

      {/* Radial Vignette: keeps the central logo area clear & legible while letting the supercomputer towers loom on both sides & behind */}
      <div 
        className={`absolute inset-0 transition-colors duration-500 ${
          isDark
            ? 'bg-[radial-gradient(ellipse_at_center,rgba(12,8,30,0.45)_0%,rgba(12,8,30,0.7)_60%,rgba(12,8,30,0.95)_100%)]'
            : 'bg-[radial-gradient(ellipse_at_center,rgba(250,250,252,0.4)_0%,rgba(250,250,252,0.7)_60%,rgba(250,250,252,0.95)_100%)]'
        }`}
      />

      {/* Top & Bottom Seamless Edge Transitions */}
      <div 
        className={`absolute inset-x-0 top-0 h-32 transition-colors duration-500 ${
          isDark
            ? 'bg-gradient-to-b from-[#0c081e] via-[#0c081e]/70 to-transparent'
            : 'bg-gradient-to-b from-[#fafafc] via-[#fafafc]/70 to-transparent'
        }`} 
      />
      <div 
        className={`absolute inset-x-0 bottom-0 h-36 transition-colors duration-500 ${
          isDark
            ? 'bg-gradient-to-t from-[#0c081e] via-[#0c081e]/85 to-transparent'
            : 'bg-gradient-to-t from-[#fafafc] via-[#fafafc]/85 to-transparent'
        }`} 
      />

      {/* High-Tech Ambient Server Racks Glow Behind Centerpiece */}
      <div 
        className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[900px] h-[480px] rounded-full blur-[110px] pointer-events-none transition-opacity duration-700 ${
          isDark 
            ? 'bg-[#673de6]/20' 
            : 'bg-[#673de6]/8'
        }`} 
      />

      {/* Subtle Cyan Back-Rim Light on Supercomputer Racks */}
      <div 
        className={`absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[400px] rounded-full blur-[90px] pointer-events-none ${
          isDark ? 'bg-cyan-500/15' : 'bg-cyan-500/5'
        }`} 
      />
      <div 
        className={`absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] h-[400px] rounded-full blur-[90px] pointer-events-none ${
          isDark ? 'bg-[#7b66ff]/20' : 'bg-[#7b66ff]/5'
        }`} 
      />

      {/* Blinking Status LED Indicator Nodes on Racks */}
      <div className="absolute inset-0 max-w-7xl mx-auto pointer-events-none">
        {/* Left Rack Cluster LEDs */}
        <span 
          className="absolute top-[32%] left-[12%] w-2 h-2 rounded-full bg-cyan-400 blur-[1px] animate-pulse" 
          style={{ animationDuration: '2.1s' }}
        />
        <span 
          className="absolute top-[36%] left-[14%] w-1.5 h-1.5 rounded-full bg-[#7b66ff] blur-[0.5px] animate-pulse" 
          style={{ animationDuration: '3.4s', animationDelay: '0.7s' }}
        />
        <span 
          className="absolute top-[48%] left-[11%] w-2 h-2 rounded-full bg-cyan-300 blur-[1px] animate-pulse" 
          style={{ animationDuration: '1.8s', animationDelay: '0.3s' }}
        />
        <span 
          className="absolute top-[54%] left-[15%] w-1.5 h-1.5 rounded-full bg-emerald-400 blur-[0.5px] animate-pulse" 
          style={{ animationDuration: '2.9s', animationDelay: '1.1s' }}
        />

        {/* Right Rack Cluster LEDs */}
        <span 
          className="absolute top-[30%] right-[13%] w-2 h-2 rounded-full bg-cyan-400 blur-[1px] animate-pulse" 
          style={{ animationDuration: '2.5s', animationDelay: '1.2s' }}
        />
        <span 
          className="absolute top-[38%] right-[15%] w-1.5 h-1.5 rounded-full bg-[#7b66ff] blur-[0.5px] animate-pulse" 
          style={{ animationDuration: '3.1s', animationDelay: '0.4s' }}
        />
        <span 
          className="absolute top-[52%] right-[11%] w-2 h-2 rounded-full bg-cyan-300 blur-[1px] animate-pulse" 
          style={{ animationDuration: '2.2s', animationDelay: '0.9s' }}
        />
        <span 
          className="absolute top-[58%] right-[14%] w-1.5 h-1.5 rounded-full bg-purple-400 blur-[0.5px] animate-pulse" 
          style={{ animationDuration: '2.8s', animationDelay: '1.5s' }}
        />
      </div>
    </div>
  );
};
