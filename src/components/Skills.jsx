import React, { useState, useEffect } from 'react';

const SkillsAndFooter = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);


  const [cursorGlow, setCursorGlow] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorGlow({ 
        x: (e.clientX / window.innerWidth) * 100, 
        y: (e.clientY / window.innerHeight) * 100 
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const skills = [
    { 
      name: 'React', 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <circle cx="12" cy="12" r="2" fill="#61DAFB"/>
          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill="#61DAFB"/>
          <ellipse cx="12" cy="12" rx="8" ry="3" fill="none" stroke="#61DAFB" strokeWidth="1"/>
          <ellipse cx="12" cy="12" rx="8" ry="3" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(60 12 12)"/>
          <ellipse cx="12" cy="12" rx="8" ry="3" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(-60 12 12)"/>
        </svg>
      )
    },
    { 
      name: 'JavaScript', 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <rect x="2" y="2" width="20" height="20" rx="2" fill="#F7DF1E"/>
          <path d="M12.5 15.5c0 1.5-.5 2-1.5 2s-1.5-.5-1.5-2v-4h1.2v4c0 .8.2 1 .3 1s.3-.2.3-1v-4h1.2v4z" fill="#000"/>
          <path d="M16.5 15.5c0 1.5-.7 2-1.8 2-1 0-1.7-.5-1.7-1.5h1.2c0 .5.2.7.5.7s.6-.2.6-.7c0-.7-.3-.8-1-.8h-.5v-1h.5c.6 0 .8-.2.8-.7 0-.4-.2-.6-.5-.6s-.5.2-.5.6h-1.2c0-1 .7-1.5 1.7-1.5 1.1 0 1.7.5 1.7 1.5 0 .6-.3 1-.7 1.2.4.2.7.6.7 1.3z" fill="#000"/>
        </svg>
      )
    },
    { 
      name: 'TypeScript', 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <rect x="2" y="2" width="20" height="20" rx="2" fill="#3178C6"/>
          <path d="M9.5 8.5h5v1.2h-1.8v6.8h-1.4V9.7H9.5V8.5z" fill="white"/>
          <path d="M15.5 12.5c0-1.5.8-2 1.8-2 .6 0 1.1.2 1.4.5l-.6.9c-.2-.2-.4-.3-.7-.3-.5 0-.7.3-.7.8v.1c0 .5.2.8.7.8.3 0 .5-.1.7-.3l.6.9c-.3.3-.8.5-1.4.5-1 0-1.8-.5-1.8-2v-.1z" fill="white"/>
        </svg>
      )
    },
    { 
      name: 'HTML', 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M3 2h18l-1.5 17L12 22l-7.5-3L3 2z" fill="#E34F26"/>
          <path d="M12 4v16l5.5-2.2L18.5 4H12z" fill="#FF5722"/>
          <path d="M7.5 8h9l-.3 3H10l.2 2h5.7l-.6 6L12 20.5l-3.3-1.5-.2-2.5h1.6l.1 1.2L12 18l1.8-.8L14 15H8l-.5-7z" fill="white"/>
        </svg>
      )
    },
    { 
      name: 'CSS3', 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M3 2h18l-1.5 17L12 22l-7.5-3L3 2z" fill="#1572B6"/>
          <path d="M12 4v16l5.5-2.2L18.5 4H12z" fill="#33A9DC"/>
          <path d="M7.5 8h9l-.3 3H10l.2 2h5.7l-.6 6L12 20.5l-3.3-1.5-.2-2.5h1.6l.1 1.2L12 18l1.8-.8L14 15H8l-.5-7z" fill="white"/>
        </svg>
      )
    },
    { 
      name: 'TailwindCSS', 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C13.45 10.9 14.8 12 17 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.55 7.1 14.2 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C8.45 16.9 9.8 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.55 13.1 9.2 12 7 12z" fill="#06B6D4"/>
        </svg>
      )
    },
    { 
      name: 'Node.js', 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M12 1.85c-.27 0-.55.07-.78.2L3.78 5.7c-.47.26-.78.76-.78 1.29v10.02c0 .53.31 1.03.78 1.29l7.44 3.65c.23.13.51.2.78.2.27 0 .55-.07.78-.2l7.44-3.65c.47-.26.78-.76.78-1.29V6.99c0-.53-.31-1.03-.78-1.29L12.78 2.05c-.23-.13-.51-.2-.78-.2z" fill="#339933"/>
          <path d="M8.5 12.5v3l3-1.5v-3l-3 1.5zm7-3v3l3-1.5v-3l-3 1.5z" fill="#fff"/>
        </svg>
      )
    },
    { 
      name: 'Express.js', 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <rect x="2" y="2" width="20" height="20" rx="2" fill="#000"/>
          <path d="M18 12L14 8h3V3h2v5h3l-4 4z" fill="white"/>
          <path d="M6 16L10 20H7v5H5v-5H2l4-4z" fill="white"/>
        </svg>
      )
    },
    { 
      name: 'Next.js', 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <circle cx="12" cy="12" r="10" fill="#000"/>
          <path d="M9 9h6v6l-6-6z" fill="white"/>
          <path d="M14.5 14.5L17 17l-2.5 2.5v-5z" fill="white"/>
        </svg>
      )
    },
    { 
      name: 'MongoDB', 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218z" fill="#47A248"/>
          <path d="M12.5 22.118c.504-.116.784-1.32.784-1.32s-.28-.676-.784-1.32c-.39.548-.784 1.32-.784 1.32s.28 1.204.784 1.32z" fill="#46924F"/>
        </svg>
      )
    },
    { 
      name: 'Python', 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M12.11 0c-4.94 0-7.38 2.16-7.38 6.45v1.42h4.92v.69H2.57c-2.43 0-4.57 1.46-4.57 4.24v5.65c0 2.78 2.14 4.55 4.57 4.55h2.95v-3.91c0-2.78 2.38-5.22 5.16-5.22h6.91c2.37 0 4.29-1.96 4.29-4.33V6.45C21.88 2.16 19.44 0 12.11 0z" fill="#3776AB"/>
          <circle cx="8.5" cy="5.5" r="1.5" fill="#FFC331"/>
          <path d="M11.89 24c4.94 0 7.38-2.16 7.38-6.45V16.13h-4.92v-.69h7.08c2.43 0 4.57-1.46 4.57-4.24V5.55c0-2.78-2.14-4.55-4.57-4.55H18.48v3.91c0 2.78-2.38 5.22-5.16 5.22H6.41c-2.37 0-4.29 1.96-4.29 4.33v9.09c0 4.29 2.44 6.45 7.77 6.45z" fill="#FFC331"/>
          <circle cx="15.5" cy="18.5" r="1.5" fill="#3776AB"/>
        </svg>
      )
    },
    { 
      name: 'Java', 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218" fill="#ED8B00"/>
          <path d="M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573" fill="#ED8B00"/>
        </svg>
      )
    },
    { 
      name: 'C++', 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <rect x="2" y="2" width="20" height="20" rx="2" fill="#00599C"/>
          <path d="M10 8h-2v2H6v2h2v2h2v-2h2v-2h-2V8zM18 10h-1v-1h-1v1h-1v1h1v1h1v-1h1v-1zM16 8h-1v1h1V8zM18 8h-1v1h1V8z" fill="white"/>
          <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" fill="none" stroke="white" strokeWidth="1"/>
        </svg>
      )
    },
    { 
      name: 'C', 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <rect x="2" y="2" width="20" height="20" rx="2" fill="#A8B9CC"/>
          <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="white"/>
        </svg>
      )
    },
    { 
      name: 'Git', 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M23.546 10.93L13.067.452a1.55 1.55 0 00-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 012.327 2.341l2.658 2.66a1.838 1.838 0 01.043 2.595l-5.818 5.818a1.838 1.838 0 01-2.595-.043l-2.66-2.658a1.838 1.838 0 01-2.341-2.327L.452 10.93a1.55 1.55 0 000 2.188l10.479 10.479a1.55 1.55 0 002.188 0L23.546 13.12a1.55 1.55 0 000-2.189z" fill="#F1502F"/>
        </svg>
      )
    },
    { 
      name: 'Figma', 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491z" fill="#1ABCFE"/>
          <path d="M11.264 24c2.476 0 4.49-2.014 4.49-4.49v-4.49h-4.49c-2.476 0-4.49 2.014-4.49 4.49S8.788 24 11.264 24z" fill="#0ACF83"/>
          <path d="M6.774 15.02h4.49v-4.49h-4.49c-2.476 0-4.49 2.014-4.49 4.49s2.014 4.49 4.49 4.49z" fill="#FF7262"/>
          <path d="M6.774 8.981h4.49V0h-4.49c-2.476 0-4.49 2.014-4.49 4.49s2.014 4.491 4.49 4.491z" fill="#F24E1E"/>
          <path d="M15.852 15.02c2.476 0 4.49-2.014 4.49-4.49s-2.014-4.49-4.49-4.49-4.49 2.014-4.49 4.49 2.014 4.49 4.49 4.49z" fill="#A259FF"/>
        </svg>
      )
    },
    { 
      name: 'Canva', 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <circle cx="12" cy="12" r="10" fill="#00C4CC"/>
          <path d="M7.5 12c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5-2 4.5-4.5 4.5S7.5 14.5 7.5 12z" fill="white"/>
          <circle cx="12" cy="12" r="2" fill="#00C4CC"/>
        </svg>
      )
    },
    { 
      name: 'AWS', 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M6.5 5.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="#FF9900"/>
          <path d="M16.5 11.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="#FF9900"/>
          <path d="M6.5 17.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="#FF9900"/>
          <path d="M5.5 9.5h8v1h-8v-1z" fill="#232F3E"/>
          <path d="M14.5 13.5h4v1h-4v-1z" fill="#232F3E"/>
        </svg>
      )
    },
    { 
      name: 'Docker', 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M13.2 11.8h2.4v-2.4h-2.4v2.4zm-2.6 0h2.4v-2.4h-2.4v2.4zm-2.6 0h2.4v-2.4H7.9v2.4zm2.6-2.6h2.4V6.8h-2.4v2.4zm0-2.6h2.4V4.2h-2.4v2.4z" fill="#2496ED"/>
          <path d="M23.7 11.2c-.5-.3-1.6-.4-2.4-.1-.1-.9-.6-1.7-1.4-2.4l-.3-.2-.2.3c-.4.6-.5 1.6-.1 2.3.2.4.5.7.9.9-.4.2-.9.3-1.4.3H.5c-.3 0-.5.2-.5.5 0 1.5.4 3 1.2 4.2.8 1.2 2 1.9 3.5 1.9 4.2 0 7.3-1.9 8.7-5.4 1.4.1 2.8-.4 3.7-1.3.6-.6 1-1.4 1.1-2.2l.1-.3-.2-.1z" fill="#2496ED"/>
        </svg>
      )
    },
    { 
      name: 'Postman', 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <circle cx="12" cy="12" r="10" fill="#FF6C37"/>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.16 1.17-.8 2.27-1.75 3.22-.95.95-2.05 1.59-3.22 1.75-.16-.95-.8-2.05-1.75-3-.95-.95-2.05-1.59-3-1.75.16-1.17.8-2.27 1.75-3.22.95-.95 2.05-1.59 3.22-1.75.16.95.8 2.05 1.75 3 .95.95 2.05 1.59 3 1.75z" fill="white"/>
        </svg>
      )
    },
    { 
      name: 'Vercel', 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M12 2L2 22h20L12 2z" fill="#000"/>
        </svg>
      )
    },
    { 
      name: 'Bootstrap', 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <rect x="2" y="2" width="20" height="20" rx="2" fill="#7952B3"/>
          <path d="M7 7h4.5c1.38 0 2.5 1.12 2.5 2.5S12.88 12 11.5 12H7V7zm0 5.5h5c1.38 0 2.5 1.12 2.5 2.5S13.38 17.5 12 17.5H7v-5z" fill="white"/>
        </svg>
      )
    },
    { 
      name: 'Web3', 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <circle cx="12" cy="12" r="10" fill="#F16822"/>
          <path d="M8 8l4 4 4-4v8l-4-4-4 4V8z" fill="white"/>
        </svg>
      )
    }
  ];


  const getSkillColor = (skillName) => {
    const colorMap = {
      'React': '#61DAFB',
      'JavaScript': '#F7DF1E',
      'TypeScript': '#3178C6',
      'HTML': '#E34F26',
      'CSS3': '#1572B6',
      'TailwindCSS': '#06B6D4',
      'Node.js': '#339933',
      'Express.js': '#000000',
      'Next.js': '#000000',
      'MongoDB': '#47A248',
      'Python': '#3776AB',
      'Java': '#ED8B00',
      'C++': '#00599C',
      'C': '#A8B9CC',
      'Git': '#F1502F',
      'Figma': '#F24E1E',
      'Canva': '#00C4CC',
      'AWS': '#FF9900',
      'Docker': '#2496ED',
      'Postman': '#FF6C37',
      'Vercel': '#000000',
      'Bootstrap': '#7952B3',
      'Web3': '#F16822',
      'Firebase': '#FFA000',
      'GitHub': '#181717',
      'FastAPI': '#009688'
    };
    return colorMap[skillName] || '#6B7280';
  };

  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div className="relative overflow-hidden min-h-screen" style={{ background: 'transparent' }}>
      {/* Pinkish purple mouse glow effect */}
      <div 
        className="fixed inset-0 pointer-events-none transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(circle 400px at ${cursorGlow.x}% ${cursorGlow.y}%, 
            rgba(168, 85, 247, 0.15) 0%, 
            rgba(236, 72, 153, 0.1) 25%, 
            rgba(139, 92, 246, 0.08) 50%, 
            transparent 80%)`,
        }}
      ></div>

      {/* Subtle ambient lighting */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-purple-200/3 dark:bg-purple-800/3 rounded-full filter blur-3xl opacity-50 animate-pulse pointer-events-none"></div>
      <div className="fixed top-1/3 right-1/4 w-80 h-80 bg-pink-200/3 dark:bg-pink-800/3 rounded-full filter blur-3xl opacity-50 animate-pulse pointer-events-none" style={{ animationDelay: '3s' }}></div>

      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Enhanced header with glass effect */}
          <div className="text-center mb-16 relative">
            {/* Glass container for header */}
            <div className="group bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/15 dark:hover:bg-gray-800/15 relative overflow-hidden max-w-2xl mx-auto">
              {/* Glass shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full animate-pulse" />
              
              {/* Header content */}
              <div className="flex items-center justify-center gap-4 mb-6 group/header">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400/20 to-purple-600/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg group-hover/header:shadow-xl transition-all duration-300 group-hover/header:scale-110 border border-pink-300/30">
                  <svg className="w-8 h-8 text-pink-600 dark:text-pink-400 group-hover/header:text-purple-500 transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 mb-2 font-medium group-hover/header:text-pink-500 transition-colors duration-300">TECHNICAL EXPERTISE</p>
                  <h2 className="text-4xl md:text-5xl font-light text-slate-800 dark:text-slate-100 group-hover/header:text-pink-600 dark:group-hover/header:text-pink-400 transition-colors duration-300">
                    The Secret <span className="font-medium text-slate-900 dark:text-white">Sauce</span>
                  </h2>
                </div>
              </div>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent mx-auto"></div>
            </div>
          </div>

          {/* Tech Stack Section - Glass Container with Flowing SVGs */}
          <div className="group bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/15 dark:hover:bg-gray-800/15 relative overflow-hidden mb-24">
            {/* Glass shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full animate-pulse" />
            
            <div className="flex items-center gap-4 mb-8 group/header">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400/20 to-purple-600/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg group-hover/header:shadow-xl transition-all duration-300 group-hover/header:scale-110 border border-pink-300/30">
                <svg className="w-6 h-6 text-pink-600 dark:text-pink-400 group-hover/header:text-purple-500 transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover/header:text-pink-600 dark:group-hover/header:text-pink-400 transition-colors duration-300">Tech Arsenal</h3>
                <p className="text-gray-600 dark:text-gray-400">Mastering modern technologies</p>
              </div>
            </div>

            {/* Flowing Tech Stack Grid */}
            <div className="relative">
              {/* Flowing background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-100/10 via-transparent to-purple-100/10 animate-pulse rounded-2xl" />
              
              <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-9 gap-4 relative z-10">
                {skills.map((skill, index) => {
                  const skillColor = getSkillColor(skill.name);
                  return (
                    <div
                      key={skill.name}
                      className="group/tech relative w-16 h-16 backdrop-blur-sm rounded-xl border flex items-center justify-center transition-all duration-500 hover:scale-125 hover:shadow-2xl hover:-translate-y-3 hover:rotate-6 cursor-pointer overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${hexToRgba(skillColor, 0.15)} 0%, ${hexToRgba(skillColor, 0.05)} 100%)`,
                        borderColor: hexToRgba(skillColor, 0.3),
                        animationDelay: `${index * 50}ms`,
                        boxShadow: `0 4px 12px ${hexToRgba(skillColor, 0.2)}`
                      }}
                      onMouseEnter={() => setHoveredSkill(`flow-${index}`)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="transform group-hover/tech:scale-110 transition-all duration-500 relative z-10">
                        {React.cloneElement(skill.icon, { 
                          className: "w-8 h-8" 
                        })}
                      </div>

                      {/* Flowing particle effect */}
                      {hoveredSkill === `flow-${index}` && (
                        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                          {/* Flowing shine */}
                          <div 
                            className="absolute inset-0 opacity-60"
                            style={{
                              background: `linear-gradient(45deg, transparent 0%, ${hexToRgba(skillColor, 0.4)} 50%, transparent 100%)`,
                              animation: 'flow 2s ease-in-out infinite'
                            }}
                          ></div>
                          
                          {/* Corner sparkles */}
                          {[...Array(4)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute w-1 h-1 rounded-full animate-ping"
                              style={{
                                background: skillColor,
                                top: i < 2 ? '10%' : '90%',
                                left: i % 2 === 0 ? '10%' : '90%',
                                animationDelay: `${i * 200}ms`
                              }}
                            />
                          ))}
                        </div>
                      )}

                      {/* Hover glow effect */}
                      <div 
                        className="absolute inset-0 rounded-xl opacity-0 group-hover/tech:opacity-100 transition-opacity duration-500 -z-10"
                        style={{
                          boxShadow: `0 0 20px ${hexToRgba(skillColor, 0.5)}`
                        }}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Original Skills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-24">
            {skills.map((skill, index) => {
              return (
                <div
                  key={skill.name}
                  className="group relative transform transition-all duration-500 ease-out"
                  onMouseEnter={() => setHoveredSkill(index)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  style={{
                    animationDelay: `${index * 80}ms`,
                    transform: hoveredSkill === index 
                      ? `translateY(-8px) scale(1.05)` 
                      : 'translateY(0) scale(1)'
                  }}
                >
                  {/* Premium glass card with enhanced zoom and card effect */}
                  <div 
                    className="relative p-8 backdrop-blur-xl backdrop-saturate-150 rounded-2xl border transition-all duration-700 hover:scale-110 group cursor-pointer hover:-translate-y-2"
                    style={{
                      background: hoveredSkill === index ? 
                        `linear-gradient(135deg, ${hexToRgba(getSkillColor(skill.name), 0.1)} 0%, ${hexToRgba(getSkillColor(skill.name), 0.05)} 50%, rgba(255,255,255,0.02) 100%)` :
                        `linear-gradient(135deg, ${hexToRgba(getSkillColor(skill.name), 0.03)} 0%, rgba(255,255,255,0.01) 100%)`,
                      borderColor: hoveredSkill === index ? 
                        hexToRgba(getSkillColor(skill.name), 0.3) : 
                        hexToRgba(getSkillColor(skill.name), 0.1),
                      boxShadow: hoveredSkill === index ? 
                        `0 25px 50px ${hexToRgba(getSkillColor(skill.name), 0.2)}, 0 12px 24px ${hexToRgba(getSkillColor(skill.name), 0.1)}, inset 0 1px 0 rgba(255,255,255,0.2)` : 
                        `0 4px 12px ${hexToRgba(getSkillColor(skill.name), 0.05)}`
                    }}>
                    
                    {/* Enhanced gradient border with skill-specific colors */}
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 blur-sm"
                      style={{
                        background: `linear-gradient(135deg, ${hexToRgba(getSkillColor(skill.name), 0.2)}, ${hexToRgba(getSkillColor(skill.name), 0.1)}, ${hexToRgba(getSkillColor(skill.name), 0.05)})`
                      }}
                    ></div>
                    
                    {/* Icon container with skill-specific background */}
                    <div className="flex items-center justify-center mb-6">
                      <div 
                        className="relative p-4 rounded-xl backdrop-blur-sm border transition-all duration-700 group-hover:scale-125 group-hover:rotate-3"
                        style={{
                          background: hoveredSkill === index ?
                            `linear-gradient(135deg, ${hexToRgba(getSkillColor(skill.name), 0.15)} 0%, ${hexToRgba(getSkillColor(skill.name), 0.05)} 100%)` :
                            `linear-gradient(135deg, ${hexToRgba(getSkillColor(skill.name), 0.08)} 0%, ${hexToRgba(getSkillColor(skill.name), 0.02)} 100%)`,
                          borderColor: hoveredSkill === index ? 
                            hexToRgba(getSkillColor(skill.name), 0.4) : 
                            hexToRgba(getSkillColor(skill.name), 0.2)
                        }}
                      >
                        <div className="transition-all duration-700 group-hover:scale-110">
                          {React.cloneElement(skill.icon, { 
                            className: "w-10 h-10" 
                          })}
                        </div>
                        
                        {/* Enhanced inner glow with skill-specific color */}
                        <div 
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                          style={{
                            background: `radial-gradient(circle, ${hexToRgba(getSkillColor(skill.name), 0.2)} 0%, transparent 70%)`
                          }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Professional skill name with skill-specific accent */}
                    <h4 
                      className="text-base font-medium text-center transition-all duration-500 group-hover:font-semibold"
                      style={{
                        color: hoveredSkill === index ? getSkillColor(skill.name) : undefined
                      }}
                    >
                      {skill.name}
                    </h4>

                    {/* Premium shine effect with skill-specific colors */}
                    {hoveredSkill === index && (
                      <div className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden">
                        {/* Diagonal shine sweep */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-out">
                          <div 
                            className="h-full w-8 opacity-60"
                            style={{
                              background: `linear-gradient(90deg, transparent 0%, ${hexToRgba(getSkillColor(skill.name), 0.4)} 30%, ${hexToRgba(getSkillColor(skill.name), 0.6)} 50%, ${hexToRgba(getSkillColor(skill.name), 0.4)} 70%, transparent 100%)`,
                              transform: 'skewX(-20deg)',
                              filter: 'blur(1px)'
                            }}
                          ></div>
                        </div>
                        
                        {/* Corner highlight with skill color */}
                        <div 
                          className="absolute top-0 right-0 w-16 h-16 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                          style={{
                            background: `linear-gradient(225deg, ${hexToRgba(getSkillColor(skill.name), 0.3)} 0%, ${hexToRgba(getSkillColor(skill.name), 0.1)} 50%, transparent 100%)`
                          }}
                        ></div>
                      </div>
                    )}

                    {/* Enhanced skill-specific glow border on hover */}
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
                      style={{
                        boxShadow: `0 0 0 1px ${hexToRgba(getSkillColor(skill.name), 0.3)}, 0 0 20px ${hexToRgba(getSkillColor(skill.name), 0.2)}`
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Professional footer */}
      <footer className="relative pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center">
            {/* Elegant social links */}
            <div className="flex space-x-6 mb-12">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-4 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all duration-500"
                aria-label="GitHub"
              >
                <div className="absolute inset-0 bg-white/5 dark:bg-white/10 backdrop-blur-xl rounded-2xl border border-slate-200/20 dark:border-slate-700/20 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-slate-900/5 dark:group-hover:shadow-slate-900/20"></div>
                <div className="relative z-10 transition-all duration-500 group-hover:scale-105">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
              </a>
              
              <a
                href="mailto:raaaj0555@gmail.com"
                className="group relative p-4 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all duration-500"
                aria-label="Email"
              >
                <div className="absolute inset-0 bg-white/5 dark:bg-white/10 backdrop-blur-xl rounded-2xl border border-slate-200/20 dark:border-slate-700/20 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-slate-900/5 dark:group-hover:shadow-slate-900/20"></div>
                <div className="relative z-10 transition-all duration-500 group-hover:scale-105">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
              </a>
              
              <a
                href="https://linkedin.com/in/onlyraaaj"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-4 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all duration-500"
                aria-label="LinkedIn"
              >
                <div className="absolute inset-0 bg-white/5 dark:bg-white/10 backdrop-blur-xl rounded-2xl border border-slate-200/20 dark:border-slate-700/20 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-slate-900/5 dark:group-hover:shadow-slate-900/20"></div>
                <div className="relative z-10 transition-all duration-500 group-hover:scale-105">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
              </a>
            </div>

            {/* Professional divider */}
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent mb-8"></div>

            {/* Refined copyright */}
            <div className="relative">
              <p className="text-sm text-slate-500 dark:text-slate-400 font-light tracking-wide">
                © {new Date().getFullYear()} 
                <span className="text-slate-700 dark:text-slate-300 font-medium mx-2">
                  Raj
                </span>
                All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SkillsAndFooter;