import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
// import Footer from './components/Footer';

// HomePage renders Hero section (Profile)
const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="transition-all duration-500 ease-in-out">
      <Hero />
    </div>
  );
};

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) return savedMode === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Apply dark mode and handle cursor
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-transition', 'all 0.5s ease-in-out');
    root.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);

    // Mouse movement tracking for background effect
    const moveMouse = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Throttled mousemove for better performance
    let animationFrame;
    const throttledMove = (e) => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => moveMouse(e));
    };

    document.addEventListener('mousemove', throttledMove);

    return () => {
      document.removeEventListener('mousemove', throttledMove);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [darkMode]);

  return (
    <Router>
      {/* Dark Orange Background Light Effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-300 ease-out"
        style={{
          background: `
            radial-gradient(
              800px circle at ${mousePosition.x}px ${mousePosition.y}px,
              ${darkMode ? 'rgba(255, 140, 0, 0.12)' : 'rgba(255, 140, 0, 0.08)'} 0%,
              transparent 70%
            )
          `,
        }}
      />

      {/* Additional Orange Gradient Layers for Richer Effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-500 ease-out"
        style={{
          background: `
            radial-gradient(
              1200px circle at ${mousePosition.x * 0.7}px ${mousePosition.y * 0.7}px,
              ${darkMode ? 'rgba(255, 165, 0, 0.06)' : 'rgba(255, 165, 0, 0.04)'} 0%,
              transparent 60%
            )
          `,
        }}
      />

      {/* Third Layer for More Depth */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-700 ease-out"
        style={{
          background: `
            radial-gradient(
              1600px circle at ${mousePosition.x * 0.5}px ${mousePosition.y * 0.5}px,
              ${darkMode ? 'rgba(255, 69, 0, 0.04)' : 'rgba(255, 69, 0, 0.02)'} 0%,
              transparent 50%
            )
          `,
        }}
      />

      <div className="min-h-screen bg-backgroundLight text-textLight dark:bg-backgroundDark dark:text-textDark transition-[background-color,color] duration-500 ease-in-out relative z-10">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        
        <main className="transition-all duration-500 ease-in-out">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </main>
        
        {/* <Footer /> */}
      </div>

      <style jsx>{`
        /* Smooth background light effect */
        .fixed {
          transition: 
            background 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>

      {/* Global styles */}
      <style jsx global>{`
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar with orange accent */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: ${darkMode ? 'rgba(255, 140, 0, 0.3)' : 'rgba(255, 140, 0, 0.2)'};
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${darkMode ? 'rgba(255, 140, 0, 0.5)' : 'rgba(255, 140, 0, 0.4)'};
        }

        /* Smooth transitions for interactive elements */
        button, a {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Enhanced hover effects with orange accent */
        button:hover, a:hover {
          transform: translateY(-1px);
        }

        /* Orange glow effect for primary buttons */
        .bg-primaryLight, .bg-primaryDark {
          position: relative;
          overflow: hidden;
        }

        .bg-primaryLight:hover::before, .bg-primaryDark:hover::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }

        /* Orange text shadow for headings */
        h1, h2, h3, h4, h5, h6 {
          transition: text-shadow 0.3s ease;
        }

        h1:hover, h2:hover, h3:hover {
          text-shadow: ${darkMode ? 
            '0 0 10px rgba(255, 140, 0, 0.3)' : 
            '0 0 5px rgba(255, 140, 0, 0.2)'
          };
        }

        /* Orange border glow effect */
        .border-primaryLight, .border-primaryDark {
          transition: box-shadow 0.3s ease;
        }

        .border-primaryLight:hover, .border-primaryDark:hover {
          box-shadow: ${darkMode ? 
            '0 0 15px rgba(255, 140, 0, 0.3)' : 
            '0 0 10px rgba(255, 140, 0, 0.2)'
          };
        }
      `}</style>
    </Router>
  );
}

export default App;