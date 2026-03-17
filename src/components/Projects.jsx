import { FiGithub } from 'react-icons/fi';
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';

const Projects = () => {
  const projects = useMemo(
    () => [
      {
        title: 'PingTrack (PingAlert)',
        description: 'A website monitoring and alerting platform ensuring high availability and uptime reliability.',
        tags: ['React', 'Node.js', 'MongoDB', 'Alerting'],
        github: 'https://github.com/Raash-03',
        liveUrl: '#',
        thumbnail: '/thumbnails/pingalert-thumb.jpg',
      },
      {
        title: 'CodeR',
        description: 'A coding platform featuring secure authentication systems and environments for developers.',
        tags: ['React', 'Authentication', 'API', 'UI/UX'],
        github: 'https://github.com/Raash-03',
        liveUrl: '#',
        thumbnail: '/thumbnails/coder-thumb.jpg',
      },
      {
        title: 'BITE RUSH - Food Ordering Web App',
        description: 'A full-stack food ordering website with product listings, cart functionality, and secure checkout.',
        tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        github: 'https://github.com',
        liveUrl: 'https://biterush-e5jv.onrender.com/',
        thumbnail: '/thumbnails/ecommerce-thumb.jpg',
      },
      {
        title: 'Task Management App',
        description: 'A productivity application for managing tasks with drag-and-drop functionality and team collaboration.',
        tags: ['React', 'Firebase', 'Tailwind CSS'],
        github: 'https://github.com',
        liveUrl: '#',
        thumbnail: '/thumbnails/taskapp-thumb.jpg',
      },
      {
        title: 'Weather Dashboard',
        description: 'Real-time weather application with 5-day forecasts and location-based weather data.',
        tags: ['JavaScript', 'API', 'CSS'],
        github: 'https://github.com',
        liveUrl: '#', // Added liveUrl as per instruction
        thumbnail: '/thumbnails/weather-thumb.jpg',
      },
      {
        title: 'Social Media App',
        description: 'A social networking platform with real-time messaging, posts, and user interactions.',
        tags: ['React', 'Socket.io', 'MongoDB', 'Express'],
        github: 'https://github.com',
        liveUrl: '#',
        thumbnail: '/thumbnails/social-thumb.jpg',
      },
      {
        title: 'Portfolio Website',
        description: 'A responsive portfolio website showcasing projects and skills with modern design.',
        tags: ['React', 'Tailwind CSS', 'Framer Motion'],
        github: 'https://github.com',
        liveUrl: '#',
        thumbnail: '/thumbnails/portfolio-thumb.jpg',
      },
    ],
    []
  );
  const carouselRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);
  const sectionRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  // Add scroll throttle to prevent too rapid scrolling
  const lastScrollTime = useRef(0);
  const scrollThrottleDelay = 500;
  const autoPlayIntervalRef = useRef(null);
  const keyDownTimeoutRef = useRef(null);

  // Memoize visible projects calculation
  const visibleProjects = useMemo(() => {
    const total = projects.length;
    return [-1, 0, 1].map((i) => {
      const projIndex = (currentIndex + i + total) % total;
      return { ...projects[projIndex], projIndex, position: i };
    });
  }, [currentIndex, projects]);

  // Enhanced mouse tracking with light effects
  const handleMouseMove = useCallback((e) => {
    // Get mouse position relative to viewport for light effects
    const x = e.clientX;
    const y = e.clientY;
    
    mouseRef.current = { x, y };
    
    // Throttle mouse position updates for performance
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    animationFrameRef.current = requestAnimationFrame(() => {
      setMousePosition({ x, y });
    });

    // Handle dragging
    if (isDragging && carouselRef.current) {
      e.preventDefault();
      const currentX = e.pageX - carouselRef.current.offsetLeft;
      const walk = (currentX - startX) * 2;
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  }, [isDragging, startX, scrollLeft]);

  // Mouse enter/leave handlers for light effects
  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    setIsAutoPlaying(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setTimeout(() => setIsAutoPlaying(true), 2000);
  }, []);

  // Memoize particles to prevent re-renders
  const particles = useMemo(() => 
    [...Array(6)].map((_, i) => ({
      left: `${15 + i * 15}%`,
      top: `${10 + (i * 17) % 80}%`,
      delay: i * 0.5,
      duration: 3 + i,
    })), []);


  // Fixed auto-play effect with proper cleanup
  useEffect(() => {
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
    }
    
    if (!isAutoPlaying) return;
    
    autoPlayIntervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 4000);
    
    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
    };
  }, [isAutoPlaying, projects.length]);

  // Optimized event handlers with proper cleanup
  const handleKeyDown = useCallback((e) => {
    // Clear existing timeout to prevent rapid fire
    if (keyDownTimeoutRef.current) {
      clearTimeout(keyDownTimeoutRef.current);
    }

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
        break;
      case 'ArrowRight':
        e.preventDefault();
        setCurrentIndex((prev) => (prev + 1) % projects.length);
        break;
      case ' ':
        e.preventDefault();
        setIsAutoPlaying((prev) => !prev);
        break;
      default:
        return;
    }

    // Debounce key presses
    keyDownTimeoutRef.current = setTimeout(() => {
      keyDownTimeoutRef.current = null;
    }, 150);
  }, [projects.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (keyDownTimeoutRef.current) {
        clearTimeout(keyDownTimeoutRef.current);
      }
    };
  }, [handleKeyDown]);

  // Fixed mouse handlers
  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
    setIsAutoPlaying(false);
  }, []);

  const handleMouseUpOrLeave = useCallback(() => {
    setIsDragging(false);
    // Restart auto-play after a delay
    setTimeout(() => setIsAutoPlaying(true), 2000);
  }, []);

  // Fixed and throttled wheel handler
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    
    // Throttle scroll events
    const now = Date.now();
    if (now - lastScrollTime.current < scrollThrottleDelay) {
      return;
    }
    lastScrollTime.current = now;
    
    let direction = 0;
    
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      direction = e.deltaX > 0 ? 1 : -1;
    } else if (Math.abs(e.deltaY) > 20) { // Increased threshold
      direction = e.deltaY > 0 ? 1 : -1;
    } else {
      return; // Ignore small movements
    }
    
    setCurrentIndex((prev) => {
      const newIndex = (prev + direction + projects.length) % projects.length;
      return newIndex;
    });
  }, [projects.length]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
      if (keyDownTimeoutRef.current) {
        clearTimeout(keyDownTimeoutRef.current);
      }
    };
  }, []);

  // Optimized ProjectCard component
  const ProjectCard = useCallback(({ projectData, activeSlide }) => {
    const { position, projIndex, title, description, tags, thumbnail, github, liveUrl } = projectData;

    const scale = Math.max(0.7, 1 - Math.abs(position) * 0.15);
    const opacity = Math.max(0.3, 1 - Math.abs(position) * 0.3);
    const blur = Math.abs(position) * 2;
    const zIndex = 10 - Math.abs(position);

    return (
      <div
        className="absolute transition-all duration-300 ease-out transform-gpu cursor-pointer project-card"
        style={{
          transform: `translateX(${position * 320}px) scale(${scale})`,
          opacity,
          filter: `blur(${blur}px)`,
          zIndex,
          width: 'clamp(300px, 80vw, 600px)',
          height: 'clamp(250px, 60vh, 400px)',
        }}
        onClick={() => !activeSlide && setCurrentIndex(projIndex)}
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 group">
          {/* Animated gradient placeholder background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 group-hover:from-indigo-500/30 group-hover:via-purple-500/30 group-hover:to-pink-500/30 transition-all duration-500"></div>
          <img
            src={thumbnail}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            draggable={false}
            onError={(e) => {
              // Fallback if thumbnail doesn't exist
              e.target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="relative z-10 flex flex-col h-full justify-end p-6 text-white">
            <div className="mb-4">
              <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">{title}</h3>
              <p className="text-sm md:text-base mb-4 line-clamp-2 text-gray-200 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] font-medium">{description}</p>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {tags.map((tag, idx) => (
                  <span
                    key={`${projIndex}-${idx}`}
                    className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold text-white shadow-sm border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex space-x-4 pt-2">
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-5 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-full text-sm font-bold transition-all duration-300 backdrop-blur-md shadow-lg border border-white/20 hover:scale-105"
                onClick={(e) => e.stopPropagation()}
              >
                <FiGithub className="mr-2" /> Code
              </a>
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-5 py-2.5 bg-pink-600 text-white rounded-full text-sm font-bold hover:bg-pink-500 transition-all duration-300 backdrop-blur-md shadow-[0_0_15px_rgba(236,72,153,0.6)] hover:shadow-[0_0_25px_rgba(236,72,153,0.8)] border border-pink-400/50 hover:scale-105"
                  onClick={(e) => e.stopPropagation()}
                >
                  Go Live
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }, []);



  return (
    <>
      <section 
        id="projects" 
        ref={sectionRef}
        className="py-16 bg-backgroundLight dark:bg-backgroundDark overflow-hidden relative"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Enhanced Light Effects */}
        {isHovering && (
          <>
            {/* Main cursor light */}
            <div
              className="pointer-events-none absolute z-50 rounded-full transition-opacity duration-300"
              style={{
                left: mousePosition.x - 150,
                top: mousePosition.y - 150,
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(219, 39, 119, 0.15) 0%, rgba(147, 51, 234, 0.1) 50%, transparent 70%)',
                filter: 'blur(20px)',
                opacity: isHovering ? 1 : 0,
                pointerEvents: 'none',
              }}
            />
            
            {/* Secondary light ring */}
            <div
              className="pointer-events-none absolute z-40 rounded-full transition-all duration-500"
              style={{
                left: mousePosition.x - 100,
                top: mousePosition.y - 100,
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, rgba(168, 85, 247, 0.15) 40%, transparent 60%)',
                filter: 'blur(15px)',
                opacity: isHovering ? 0.8 : 0,
                transform: `scale(${1 + Math.sin(Date.now() * 0.002) * 0.1})`,
                pointerEvents: 'none',
              }}
            />
            
            {/* Small inner glow */}
            <div
              className="pointer-events-none absolute z-60 rounded-full transition-opacity duration-200"
              style={{
                left: mousePosition.x - 25,
                top: mousePosition.y - 25,
                width: '50px',
                height: '50px',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(219, 39, 119, 0.4) 30%, transparent 60%)',
                filter: 'blur(5px)',
                opacity: isHovering ? 0.9 : 0,
                pointerEvents: 'none',
              }}
            />
          </>
        )}

        {/* Ambient background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-pink-400 dark:bg-purple-400 rounded-full opacity-30"
              style={{
                left: p.left,
                top: p.top,
                animation: `float ${p.duration}s ease-in-out infinite alternate`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-textLight dark:text-textDark mt-20">
            Featured <span className="text-primaryLight dark:text-primaryDark">Projects</span>
          </h2>
          <p className="text-center text-textLight/80 dark:text-textDark/80 mb-8 max-w-2xl mx-auto text-base md:text-lg">
            Explore my recent work featuring modern technologies and innovative solutions.
          </p>

          <div className="relative h-[350px] md:h-[450px] flex items-center justify-center mb-8">
            <div
              ref={carouselRef}
              className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              onWheel={handleWheel}
              onTouchStart={handleMouseDown}
              onTouchMove={handleMouseMove}
              onTouchEnd={handleMouseUpOrLeave}
            >
              {visibleProjects.map((item) => (
                <ProjectCard
                  key={`project-${item.projIndex}`}
                  projectData={item}
                  activeSlide={item.projIndex === currentIndex}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-center space-x-2">
            {projects.map((_, idx) => (
              <button
                key={`dot-${idx}`}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'bg-primaryLight dark:bg-primaryDark scale-125 shadow-lg shadow-pink-500/50'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to project ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CSS Styles */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .transform-gpu {
          transform: translateZ(0);
          will-change: transform;
        }
        
        .project-card {
          will-change: transform, opacity, filter;
        }
        
        /* Floating animation for particles */
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          100% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.7;
          }
        }
        

        
        /* Enhanced glow effect for active dot */
        .shadow-pink-500\\/50 {
          box-shadow: 0 0 15px rgba(236, 72, 153, 0.5);
        }
        
        /* Optimize transitions */
        * {
          box-sizing: border-box;
        }
        
        /* Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          .transition-all,
          .project-card,
          @keyframes float,
          @keyframes footerFloat {
            transition: none;
            animation: none;
          }
        }
        
        /* Smooth scrolling */
        .cursor-grab {
          scroll-behavior: smooth;
        }

        /* Performance optimizations */
        .project-card video {
          backface-visibility: hidden;
          perspective: 1000px;
        }
      `}</style>
    </>
  );
};

export default Projects;