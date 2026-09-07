import React, { useState } from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

// User's custom logo from Google Drive
export const USER_LOGO_URL = 'https://lh3.googleusercontent.com/d/1tT4xtnXqbMU8tLElUPSLoSBv9V934TwO';
export const USER_LOGO_FALLBACK = 'https://drive.google.com/thumbnail?id=1tT4xtnXqbMU8tLElUPSLoSBv9V934TwO&sz=w1000';
export const USER_LOGO_LOCAL = '/logo.png';

export const Logo: React.FC<LogoProps> = ({ size = 'md', className = '', showText = true }) => {
  const [imgSrc, setImgSrc] = useState<string>(USER_LOGO_LOCAL);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    if (imgSrc === USER_LOGO_LOCAL) {
      setImgSrc(USER_LOGO_URL);
    } else if (imgSrc === USER_LOGO_URL) {
      setImgSrc(USER_LOGO_FALLBACK);
    } else {
      setImageError(true);
    }
  };

  const sizeMap = {
    sm: { icon: 'w-7 h-7', text: 'text-base', sub: 'text-[9px]' },
    md: { icon: 'w-9 h-9', text: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl', sub: 'text-xs' },
    xl: { icon: 'w-20 h-20 sm:w-28 sm:h-28', text: 'text-3xl', sub: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 group cursor-pointer select-none ${className}`}>
      {/* High-tech Logo Display */}
      <div className="relative flex items-center justify-center">
        {/* Glow ambient background harmonized with logo colors */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 via-teal-500 to-rose-500/60 rounded-xl blur-md opacity-40 group-hover:opacity-80 transition-opacity duration-500"></div>

        {!imageError ? (
          <div className={`relative z-10 ${currentSize.icon} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
            <img
              src={imgSrc}
              alt="Logo"
              className="w-full h-full object-contain opacity-95 group-hover:opacity-100 filter drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]"
              referrerPolicy="no-referrer"
              onError={handleImageError}
            />
          </div>
        ) : (
          <svg
            className={`relative z-10 ${currentSize.icon} drop-shadow-[0_0_12px_rgba(6,182,212,0.6)] transform group-hover:scale-105 transition-transform duration-300`}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="logo-cyan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="50%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
              <linearGradient id="logo-emerald-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
            <polygon
              points="24,4 42,14 42,34 24,44 6,34 6,14"
              fill="#0B132B"
              stroke="url(#logo-cyan-grad)"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path
              d="M17 21 L13 24 L17 27"
              stroke="url(#logo-emerald-grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M31 21 L35 24 L31 27"
              stroke="url(#logo-cyan-grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M26 18 L22 30"
              stroke="#38BDF8"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="24" cy="24" r="2" fill="#10B981" className="animate-pulse" />
          </svg>
        )}
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className={`font-bold tracking-tight text-white flex items-center gap-1.5 ${currentSize.text}`}>
            <span className="bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
              DEV
            </span>
            <span className="text-cyan-400 font-extrabold font-mono tracking-widest text-sm sm:text-base">
              STUDIO
            </span>
          </div>
          <span className={`font-mono text-cyan-400/80 tracking-wider uppercase font-semibold flex items-center gap-1.5 ${currentSize.sub}`}>
            Sistemas • Apps • IA
          </span>
        </div>
      )}
    </div>
  );
};

