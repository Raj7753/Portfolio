import { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Skills from './components/Skills';
import Footer from './components/Footer';

// HomePage renders Hero section only
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
  const [contactOpen, setContactOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) return savedMode === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const trailRef = useRef([]);
  const hueRef = useRef(0);
  const animFrameRef = useRef(null);

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

  // Colorful cursor trail effect (canvas-based, no dot)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMove = (e) => {
      hueRef.current = (hueRef.current + 2) % 360;
      trailRef.current.push({
        x: e.clientX,
        y: e.clientY,
        hue: hueRef.current,
        life: 1,
        size: 6 + Math.random() * 4,
      });
      if (trailRef.current.length > 50) trailRef.current.shift();
    };
    window.addEventListener('mousemove', handleMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const trail = trailRef.current;
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.life -= 0.025;
        if (p.life <= 0) {
          trail.splice(i, 1);
          continue;
        }
        const alpha = p.life * 0.6;
        const size = p.size * p.life;
        // Glow
        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 2);
        grad.addColorStop(0, `hsla(${p.hue}, 100%, 65%, ${alpha})`);
        grad.addColorStop(0.4, `hsla(${p.hue + 30}, 100%, 55%, ${alpha * 0.5})`);
        grad.addColorStop(1, `hsla(${p.hue + 60}, 100%, 50%, 0)`);
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, size * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw connecting lines between recent points
      if (trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(trail[0].x, trail[0].y);
        for (let i = 1; i < trail.length; i++) {
          const p = trail[i];
          ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = `hsla(${hueRef.current}, 100%, 65%, 0.15)`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <Router>
      {/* Grayscale Background Glow Effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-300 ease-out"
        style={{
          background: `
            radial-gradient(
              800px circle at ${mousePosition.x}px ${mousePosition.y}px,
              ${darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'} 0%,
              transparent 70%
            )
          `,
        }}
      />

      {/* Additional Glow Layers for Richer Effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-500 ease-out"
        style={{
          background: `
            radial-gradient(
              1200px circle at ${mousePosition.x * 0.7}px ${mousePosition.y * 0.7}px,
              ${darkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'} 0%,
              transparent 60%
            )
          `,
        }}
      />

      {/* Custom Cursor Ring (no dot) */}
      <div
        className="fixed top-0 left-0 w-8 h-8 border-[1.5px] border-gray-500 rounded-full pointer-events-none z-[9999] transition-transform duration-150 ease-out hidden md:block mix-blend-difference"
        style={{
          transform: `translate3d(${mousePosition.x - 16}px, ${mousePosition.y - 16}px, 0)`,
        }}
      />

      {/* Colorful cursor trail canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998] hidden md:block"
        style={{ mixBlendMode: 'screen' }}
      />

      <div className="min-h-screen bg-backgroundLight text-textLight dark:bg-backgroundDark dark:text-textDark transition-[background-color,color] duration-500 ease-in-out relative z-10">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} onContactOpen={() => setContactOpen(true)} />
        
        <main className="transition-all duration-500 ease-in-out">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
          </Routes>
        </main>
        
        {/* Contact Bottom-Sheet Modal */}
        <Contact isOpen={contactOpen} onClose={() => setContactOpen(false)} />

        <Footer />
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


        /* Smooth transitions for interactive elements */
        button, a {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Enhanced hover effects with grayscale accent */
        button:hover, a:hover {
          transform: translateY(-1px);
        }

        /* Grayscale glow effect for primary buttons */
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

        /* Grayscale text shadow for headings */
        h1, h2, h3, h4, h5, h6 {
          transition: text-shadow 0.3s ease;
        }

        h1:hover, h2:hover, h3:hover {
          text-shadow: ${darkMode ? 
            '0 0 10px rgba(255, 255, 255, 0.3)' : 
            '0 0 5px rgba(0, 0, 0, 0.2)'
          };
        }

        /* Grayscale border glow effect */
        .border-primaryLight, .border-primaryDark {
          transition: box-shadow 0.3s ease;
        }

        .border-primaryLight:hover, .border-primaryDark:hover {
          box-shadow: ${darkMode ? 
            '0 0 15px rgba(255, 255, 255, 0.3)' : 
            '0 0 10px rgba(0, 0, 0, 0.2)'
          };
        }
      `}</style>
    </Router>
  );
}

export default App;