import React, { useState, useEffect, useRef } from 'react';

const About = () => {
  const [cursorGlow, setCursorGlow] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});
  const sectionRef = useRef(null);
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.dataset.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll('[data-id]');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const interests = [
    { icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="url(#sleep-g)" opacity="0.3"/>
        <path d="M20 12V7c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v5" stroke="url(#sleep-g)" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M2 17.5C2 16.12 3.12 15 4.5 15h15c1.38 0 2.5 1.12 2.5 2.5v0c0 1.38-1.12 2.5-2.5 2.5h-15C3.12 20 2 18.88 2 17.5v0z" fill="url(#sleep-g)" opacity="0.15" stroke="url(#sleep-g)" strokeWidth="1.5"/>
        <path d="M15 4l1.5 1.5L18 4" stroke="url(#sleep-g)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
        <path d="M17 2l1 1 1-1" stroke="url(#sleep-g)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
        <defs><linearGradient id="sleep-g" x1="2" y1="2" x2="22" y2="20"><stop stopColor="#818CF8"/><stop offset="1" stopColor="#6366F1"/></linearGradient></defs>
      </svg>
    ), label: 'Sleeping', gradient: 'from-indigo-500 to-blue-600', glow: 'shadow-indigo-500/30' },
    { icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
        <path d="M6.5 6.5c0-2.21 1.79-4 4-4s4 1.79 4 4" stroke="url(#gym-g)" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M3 11.5h18" stroke="url(#gym-g)" strokeWidth="2.5" strokeLinecap="round"/>
        <rect x="5" y="8" width="3" height="7" rx="1" fill="url(#gym-g)" opacity="0.2" stroke="url(#gym-g)" strokeWidth="1.2"/>
        <rect x="16" y="8" width="3" height="7" rx="1" fill="url(#gym-g)" opacity="0.2" stroke="url(#gym-g)" strokeWidth="1.2"/>
        <rect x="1" y="9.5" width="2" height="4" rx="0.8" fill="url(#gym-g)" opacity="0.4"/>
        <rect x="21" y="9.5" width="2" height="4" rx="0.8" fill="url(#gym-g)" opacity="0.4"/>
        <path d="M9 20l1.5-3h3L15 20" stroke="url(#gym-g)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
        <defs><linearGradient id="gym-g" x1="1" y1="2" x2="23" y2="22"><stop stopColor="#EF4444"/><stop offset="1" stopColor="#F97316"/></linearGradient></defs>
      </svg>
    ), label: 'Gym', gradient: 'from-red-500 to-orange-500', glow: 'shadow-red-500/30' },
    { icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="4" width="20" height="14" rx="2" fill="url(#code-cg)" opacity="0.1" stroke="url(#code-cg)" strokeWidth="1.5"/>
        <path d="M8 9l-3 3 3 3" stroke="url(#code-cg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 9l3 3-3 3" stroke="url(#code-cg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 7l-4 8" stroke="url(#code-cg)" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 21h10" stroke="url(#code-cg)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <path d="M12 18v3" stroke="url(#code-cg)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <defs><linearGradient id="code-cg" x1="2" y1="4" x2="22" y2="21"><stop stopColor="#10B981"/><stop offset="1" stopColor="#059669"/></linearGradient></defs>
      </svg>
    ), label: 'Sometimes Coding', gradient: 'from-green-500 to-emerald-600', glow: 'shadow-green-500/30' },
  ];



  const certificates = [
    { title: 'The Bits and Bytes of Computer Networking', org: 'Google', date: 'Sep 2024', color: 'from-blue-500 to-green-500', file: '/certificates/google-networking.pdf' },
    { title: 'Software Engineering: Implementation and Testing', org: 'The Hongkong University of Science and Technology', date: 'Jul 2024', color: 'from-purple-500 to-pink-500', file: '/certificates/hkust-software-eng.pdf' },
    { title: 'Master Generative AI & Generative AI Tools', org: 'Infosys Springboard', date: 'Apr 2024', color: 'from-orange-500 to-red-500', file: '/certificates/infosys-genai.pdf' },
  ];

  const achievements = [
    { icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="url(#trophy-grad)" stroke="url(#trophy-grad)" strokeWidth="0.5"/>
        <defs><linearGradient id="trophy-grad" x1="2" y1="2" x2="22" y2="22"><stop stopColor="#F59E0B"/><stop offset="1" stopColor="#D97706"/></linearGradient></defs>
      </svg>
    ), title: 'Top 10% — Code-a-Haunt', desc: 'Placed in the top 10% by leading a team through problem breakdown and solution execution.', gradient: 'from-yellow-500 to-orange-500' },
    { icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="18" rx="3" fill="url(#code-grad)" opacity="0.15"/>
        <rect x="2" y="3" width="20" height="18" rx="3" stroke="url(#code-grad)" strokeWidth="1.5"/>
        <path d="M8 8L4 12L8 16" stroke="url(#code-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 8L20 12L16 16" stroke="url(#code-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 6L10 18" stroke="url(#code-grad)" strokeWidth="1.5" strokeLinecap="round"/>
        <defs><linearGradient id="code-grad" x1="2" y1="3" x2="22" y2="21"><stop stopColor="#10B981"/><stop offset="1" stopColor="#059669"/></linearGradient></defs>
      </svg>
    ), title: '200+ DSA Problems', desc: 'Solved across LeetCode, Codeforces, GeeksforGeeks, and Code360.', gradient: 'from-green-500 to-emerald-500' },
    { icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L14.4 8.6L21.5 9.2L16.1 13.9L17.8 21L12 17.3L6.2 21L7.9 13.9L2.5 9.2L9.6 8.6L12 2Z" fill="url(#star-grad)" opacity="0.2"/>
        <path d="M12 2L14.4 8.6L21.5 9.2L16.1 13.9L17.8 21L12 17.3L6.2 21L7.9 13.9L2.5 9.2L9.6 8.6L12 2Z" stroke="url(#star-grad)" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M12 6L13.5 10.1L18 10.5L14.6 13.4L15.6 18L12 15.7L8.4 18L9.4 13.4L6 10.5L10.5 10.1L12 6Z" fill="url(#star-grad)"/>
        <defs><linearGradient id="star-grad" x1="2" y1="2" x2="22" y2="21"><stop stopColor="#8B5CF6"/><stop offset="1" stopColor="#6366F1"/></linearGradient></defs>
      </svg>
    ), title: '3★ CodeChef & Specialist CF', desc: 'Earned a 3★ rating on CodeChef and Specialist rank on Codeforces through consistent competitive programming performance.', gradient: 'from-purple-500 to-indigo-500' },
  ];

  const education = [
    { degree: 'B.Tech — Computer Science & Engineering', school: 'Lovely Professional University', location: 'Phagwara, Punjab', period: 'Since Aug 2023', score: 'CGPA: 7.30', gradient: 'from-blue-500 to-indigo-500', dotColor: 'bg-blue-500' },
    { degree: 'Intermediate', school: 'Sanskar Vidya Daudnagar', location: 'Aurangabad, Bihar', period: 'Mar 2023', score: 'Percentage: 65%', gradient: 'from-purple-500 to-pink-500', dotColor: 'bg-purple-500' },
    { degree: 'Matriculation', school: 'DAV Public School', location: 'Aurangabad, Bihar', period: 'Mar 2021', score: 'Percentage: 85%', gradient: 'from-pink-500 to-rose-500', dotColor: 'bg-pink-500' },
  ];

  return (
    <div className="relative overflow-hidden min-h-screen" style={{ background: 'transparent' }}>
      {/* Cursor glow */}
      <div
        className="fixed inset-0 pointer-events-none transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(circle 400px at ${cursorGlow.x}% ${cursorGlow.y}%, 
            rgba(168, 85, 247, 0.15) 0%, 
            rgba(236, 72, 153, 0.1) 25%, 
            rgba(139, 92, 246, 0.08) 50%, 
            transparent 80%)`,
        }}
      />
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-purple-200/3 dark:bg-purple-800/3 rounded-full filter blur-3xl opacity-50 animate-pulse pointer-events-none" />
      <div className="fixed top-1/3 right-1/4 w-80 h-80 bg-pink-200/3 dark:bg-pink-800/3 rounded-full filter blur-3xl opacity-50 animate-pulse pointer-events-none" style={{ animationDelay: '3s' }} />

      <section className="relative py-20 px-4" ref={sectionRef}>
        <div className="container mx-auto max-w-5xl">

          {/* Header */}
          <div
            data-id="header"
            className={`text-center mb-16 transition-all duration-700 ${isVisible['header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="group bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/15 dark:hover:bg-gray-800/15 relative overflow-hidden max-w-2xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full animate-pulse" />
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400/20 to-purple-600/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 border border-pink-300/30">
                  <svg className="w-8 h-8 text-pink-600 dark:text-pink-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 mb-2 font-medium">GET TO KNOW ME</p>
                  <h2 className="text-4xl md:text-5xl font-light text-slate-800 dark:text-slate-100">
                    About <span className="font-medium text-slate-900 dark:text-white">Me</span>
                  </h2>
                </div>
              </div>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent mx-auto" />
            </div>
          </div>


          {/* ═══════ What I Love ═══════ */}
          <div
            data-id="interests"
            className={`group bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:bg-white/15 dark:hover:bg-gray-800/15 relative overflow-hidden mb-8 ${isVisible['interests'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full animate-pulse" />
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400/20 to-purple-600/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 border border-pink-300/30">
                <svg className="w-6 h-6 text-pink-600 dark:text-pink-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">What I Love</h3>
                <p className="text-gray-600 dark:text-gray-400">Things that keep me going</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5 relative z-10">
              {interests.map((item, i) => (
                <div
                  key={item.label}
                  data-id={`interest-${i}`}
                  className={`group/interest relative flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 dark:bg-gray-700/10 border border-white/10 dark:border-gray-600/10 backdrop-blur-sm cursor-default overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 hover:-translate-y-3 hover:shadow-2xl hover:${item.glow} ${isVisible[`interest-${i}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {/* Top gradient accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} opacity-40 group-hover/interest:opacity-100 transition-opacity duration-300 rounded-t-2xl`} />

                  {/* Background glow on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover/interest:opacity-10 transition-opacity duration-500 rounded-2xl`} />

                  {/* Premium SVG icon */}
                  <div className="mb-3 group-hover/interest:scale-125 group-hover/interest:-translate-y-1 group-hover/interest:drop-shadow-lg transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                    {item.icon}
                  </div>

                  {/* Label */}
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 group-hover/interest:text-gray-900 dark:group-hover/interest:text-white transition-colors duration-300 text-center">
                    {item.label}
                  </span>

                  {/* Animated shine sweep */}
                  <div className="absolute inset-0 -translate-x-full group-hover/interest:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 rounded-2xl" />
                </div>
              ))}
            </div>
          </div>

          {/* ═══════ Certificates ═══════ */}
          <div
            data-id="certs"
            className={`group bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:bg-white/15 dark:hover:bg-gray-800/15 relative overflow-hidden mb-8 ${isVisible['certs'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full animate-pulse" />
            <div className="flex items-center gap-4 mb-8 group/header">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400/20 to-orange-600/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg group-hover/header:shadow-xl transition-all duration-300 group-hover/header:scale-110 border border-amber-300/30">
                <svg className="w-6 h-6 text-amber-600 dark:text-amber-400 group-hover/header:text-orange-500 transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover/header:text-amber-600 dark:group-hover/header:text-amber-400 transition-colors duration-300">Certificates</h3>
                <p className="text-gray-600 dark:text-gray-400">Validated knowledge & skills</p>
              </div>
            </div>
            <div className="space-y-4">
              {certificates.map((cert, i) => (
                <div key={i} className="group/cert relative flex items-start gap-4 p-5 bg-white/10 dark:bg-gray-700/10 backdrop-blur-sm rounded-2xl border border-white/15 dark:border-gray-600/15 hover:bg-white/20 dark:hover:bg-gray-700/20 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500 cursor-default overflow-hidden">
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${cert.color} rounded-l-2xl opacity-60 group-hover/cert:opacity-100 transition-opacity duration-300`} />
                  <div className="flex-shrink-0 mt-1">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cert.color} flex items-center justify-center shadow-lg group-hover/cert:scale-110 group-hover/cert:rotate-6 transition-all duration-500`}>
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 dark:text-white group-hover/cert:text-amber-600 dark:group-hover/cert:text-amber-400 transition-colors duration-300 leading-snug">{cert.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{cert.org}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span className="text-xs font-medium text-gray-400 dark:text-gray-500 bg-white/10 dark:bg-gray-600/20 px-3 py-1 rounded-full">{cert.date}</span>
                    <a href={cert.file} download className={`group/dl inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r ${cert.color} rounded-lg text-white text-xs font-semibold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 opacity-0 group-hover/cert:opacity-100 cursor-pointer`} onClick={(e) => e.stopPropagation()}>
                      <svg className="w-3.5 h-3.5 group-hover/dl:-translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      Download
                    </a>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/cert:opacity-100 transition-all duration-700 transform -translate-x-full group-hover/cert:translate-x-full rounded-2xl" />
                </div>
              ))}
            </div>
          </div>

          {/* ═══════ Achievements ═══════ */}
          <div
            data-id="achs"
            className={`group bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:bg-white/15 dark:hover:bg-gray-800/15 relative overflow-hidden mb-8 ${isVisible['achs'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full animate-pulse" />
            <div className="flex items-center gap-4 mb-8 group/header">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400/20 to-amber-600/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg group-hover/header:shadow-xl transition-all duration-300 group-hover/header:scale-110 border border-yellow-300/30">
                <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400 group-hover/header:text-amber-500 transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover/header:text-yellow-600 dark:group-hover/header:text-yellow-400 transition-colors duration-300">Achievements</h3>
                <p className="text-gray-600 dark:text-gray-400">Milestones & wins</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {achievements.map((ach, i) => (
                <div key={i} className="group/ach relative p-5 bg-white/10 dark:bg-gray-700/10 backdrop-blur-sm rounded-2xl border border-white/15 dark:border-gray-600/15 hover:bg-white/20 dark:hover:bg-gray-700/20 hover:scale-105 hover:-translate-y-2 transition-all duration-500 cursor-default overflow-hidden">
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${ach.gradient} opacity-50 group-hover/ach:opacity-100 transition-opacity duration-300 rounded-t-2xl`} />
                  <div className="mb-3 group-hover/ach:scale-110 transition-transform duration-300 inline-block">{ach.icon}</div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover/ach:text-yellow-600 dark:group-hover/ach:text-yellow-400 transition-colors duration-300">{ach.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{ach.desc}</p>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/ach:opacity-100 transition-all duration-700 transform -translate-x-full group-hover/ach:translate-x-full rounded-2xl" />
                </div>
              ))}
            </div>
          </div>

          {/* ═══════ Education ═══════ */}
          <div
            data-id="edu"
            className={`group bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:bg-white/15 dark:hover:bg-gray-800/15 relative overflow-hidden mb-24 ${isVisible['edu'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full animate-pulse" />
            <div className="flex items-center gap-4 mb-8 group/header">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg group-hover/header:shadow-xl transition-all duration-300 group-hover/header:scale-110 border border-blue-300/30">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover/header:text-indigo-500 transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover/header:text-blue-600 dark:group-hover/header:text-blue-400 transition-colors duration-300">Education</h3>
                <p className="text-gray-600 dark:text-gray-400">Academic journey</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-30" />
              <div className="space-y-6">
                {education.map((edu, i) => (
                  <div key={i} className="group/edu relative flex items-start gap-6 pl-2">
                    <div className="relative z-10 flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full ${edu.dotColor} shadow-lg flex items-center justify-center group-hover/edu:scale-125 transition-all duration-300`}>
                        <div className="w-3 h-3 bg-white rounded-full" />
                      </div>
                    </div>
                    <div className="flex-1 p-5 bg-white/10 dark:bg-gray-700/10 backdrop-blur-sm rounded-2xl border border-white/15 dark:border-gray-600/15 hover:bg-white/20 dark:hover:bg-gray-700/20 hover:scale-[1.02] transition-all duration-500 cursor-default relative overflow-hidden">
                      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${edu.gradient} opacity-50 group-hover/edu:opacity-100 transition-opacity duration-300`} />
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <h4 className="font-bold text-gray-900 dark:text-white group-hover/edu:text-blue-600 dark:group-hover/edu:text-blue-400 transition-colors duration-300">{edu.degree}</h4>
                        <span className="text-xs font-medium text-gray-400 dark:text-gray-500 bg-white/10 dark:bg-gray-600/20 px-3 py-1 rounded-full flex-shrink-0">{edu.period}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{edu.school} — {edu.location}</p>
                      <div className="mt-2 inline-flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${edu.dotColor} opacity-70`} />
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{edu.score}</span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent opacity-0 group-hover/edu:opacity-100 transition-all duration-700 transform -translate-x-full group-hover/edu:translate-x-full rounded-2xl" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default About;
