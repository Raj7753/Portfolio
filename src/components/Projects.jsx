// src/components/Projects.jsx
import { FiGithub } from 'react-icons/fi';
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import biterush from '../assets/biterush.mp4';

const Projects = () => {
  const projects = useMemo(
    () => [
      {
        title: 'BITE RUSH - Food Ordering Web App',
        description: 'A full-stack food ordering website with product listings, cart functionality, and secure checkout.',
        tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        github: 'https://github.com',
        media: biterush,
        thumbnail: '/thumbnails/ecommerce-thumb.jpg',
      },
      {
        title: 'Task Management App',
        description: 'A productivity application for managing tasks with drag-and-drop functionality and team collaboration.',
        tags: ['React', 'Firebase', 'Tailwind CSS'],
        github: 'https://github.com',
        media: biterush,
        thumbnail: '/thumbnails/taskapp-thumb.jpg',
      },
      {
        title: 'Weather Dashboard',
        description: 'Real-time weather application with 5-day forecasts and location-based weather data.',
        tags: ['JavaScript', 'API', 'CSS'],
        github: 'https://github.com',
        media: biterush,
        thumbnail: '/thumbnails/weather-thumb.jpg',
      },
      {
        title: 'Social Media App',
        description: 'A social networking platform with real-time messaging, posts, and user interactions.',
        tags: ['React', 'Socket.io', 'MongoDB', 'Express'],
        github: 'https://github.com',
        media: biterush,
        thumbnail: '/thumbnails/social-thumb.jpg',
      },
      {
        title: 'Portfolio Website',
        description: 'A responsive portfolio website showcasing projects and skills with modern design.',
        tags: ['React', 'Tailwind CSS', 'Framer Motion'],
        github: 'https://github.com',
        media: biterush,
        thumbnail: '/thumbnails/portfolio-thumb.jpg',
      },
    ],
    []
  );

  const carouselRef = useRef(null);
  const videoRefs = useRef([]);
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
  const [footerMousePosition, setFooterMousePosition] = useState({ x: 0, y: 0 });
  const [isFooterHovering, setIsFooterHovering] = useState(false);
  const footerRef = useRef(null);
  
  // Add scroll throttle to prevent too rapid scrolling
  const lastScrollTime = useRef(0);
  const scrollThrottleDelay = 500; // milliseconds between scroll actions
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

  // Footer mouse tracking
  const handleFooterMouseMove = useCallback((e) => {
    if (!footerRef.current) return;
    
    const rect = footerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Throttle mouse position updates for performance
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    animationFrameRef.current = requestAnimationFrame(() => {
      setFooterMousePosition({ x, y });
    });
  }, []);

  const handleFooterMouseEnter = useCallback(() => {
    setIsFooterHovering(true);
  }, []);

  const handleFooterMouseLeave = useCallback(() => {
    setIsFooterHovering(false);
  }, []);

  // Optimized video management with error handling
  useEffect(() => {
    const playPromises = [];
    
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      
      try {
        const isActive = visibleProjects.some(proj => 
          proj.projIndex === index && Math.abs(proj.position) <= 1
        );
        
        if (isActive) {
          const shouldPlay = visibleProjects.some(proj => 
            proj.projIndex === index && proj.position === 0
          );
          
          if (shouldPlay) {
            if (video.paused) {
              video.currentTime = 0;
              const playPromise = video.play();
              if (playPromise !== undefined) {
                playPromises.push(
                  playPromise.catch((err) => {
                    console.warn('Video play failed:', err);
                  })
                );
              }
            }
          } else {
            video.pause();
            video.currentTime = 0;
          }
        } else {
          video.pause();
          video.currentTime = 0;
        }
      } catch (err) {
        console.warn('Video management error:', err);
      }
    });

    return () => {
      // Wait for all play promises to resolve/reject before cleanup
      Promise.allSettled(playPromises).then(() => {
        videoRefs.current.forEach(video => {
          if (video && !video.paused) {
            video.pause();
          }
        });
      });
    };
  }, [visibleProjects]);

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
    
    const sensitivity = 0.3; // Reduced sensitivity
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
    const { position, projIndex, title, description, tags, media, thumbnail, github } = projectData;

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
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900">
          <video
            ref={(el) => {
              if (el) {
                videoRefs.current[projIndex] = el;
              }
            }}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            loop
            playsInline
            preload="auto"
            poster={thumbnail}
            onLoadedData={() => {
              // Ensure video is ready to play
              const video = videoRefs.current[projIndex];
              if (video && projIndex === currentIndex) {
                video.play().catch(() => {});
              }
            }}
            onError={(e) => console.warn('Video error:', e)}
            style={{ 
              visibility: 'visible',
              opacity: 1,
              zIndex: 1
            }}
          >
            <source src={media} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 flex flex-col h-full justify-end p-4 text-white">
            <div className="mb-2">
              <h3 className="text-xl md:text-2xl font-bold mb-1">{title}</h3>
              <p className="text-xs md:text-sm mb-2 line-clamp-2">{description}</p>
              <div className="flex flex-wrap gap-1 md:gap-2">
                {tags.map((tag, idx) => (
                  <span
                    key={`${projIndex}-${idx}`}
                    className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex space-x-3 pt-1">
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-2 bg-white/20 text-white rounded-full text-sm font-semibold hover:bg-white/30 transition backdrop-blur-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <FiGithub className="mr-2" /> Code
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }, [currentIndex]);

  // Social links data
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/yourusername',
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/yourusername',
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      name: 'Email',
      url: 'mailto:your.email@example.com',
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
    },
  ];

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
          {[...Array(6)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-pink-400 dark:bg-purple-400 rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + i}s ease-in-out infinite alternate`,
                animationDelay: `${i * 0.5}s`,
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

      {/* Footer Section */}
<footer
  ref={footerRef}
  className="relative bg-transparent py-32 overflow-hidden mt-16"
  onMouseMove={handleFooterMouseMove}
  onMouseEnter={handleFooterMouseEnter}
  onMouseLeave={handleFooterMouseLeave}
>
  {/* Footer Light Effects */}
  {isFooterHovering && (
    <>
      {/* Main cursor light */}
      <div
        className="pointer-events-none absolute z-10 rounded-full transition-opacity duration-300"
        style={{
          left: footerMousePosition.x - 200,
          top: footerMousePosition.y - 200,
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(219, 39, 119, 0.12) 0%, rgba(147, 51, 234, 0.08) 50%, transparent 70%)',
          filter: 'blur(25px)',
          opacity: isFooterHovering ? 1 : 0,
        }}
      />
      
      {/* Secondary light ring */}
      <div
        className="pointer-events-none absolute z-20 rounded-full transition-all duration-500"
        style={{
          left: footerMousePosition.x - 120,
          top: footerMousePosition.y - 120,
          width: '240px',
          height: '240px',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, rgba(168, 85, 247, 0.1) 40%, transparent 60%)',
          filter: 'blur(20px)',
          opacity: isFooterHovering ? 0.7 : 0,
          transform: `scale(${1 + Math.sin(Date.now() * 0.003) * 0.1})`,
        }}
      />
      
      {/* Small inner glow */}
      <div
        className="pointer-events-none absolute z-30 rounded-full transition-opacity duration-200"
        style={{
          left: footerMousePosition.x - 40,
          top: footerMousePosition.y - 40,
          width: '80px',
          height: '80px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(219, 39, 119, 0.3) 30%, transparent 60%)',
          filter: 'blur(8px)',
          opacity: isFooterHovering ? 0.8 : 0,
        }}
      />
    </>
  )}

  {/* Ambient background particles */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(8)].map((_, i) => (
      <div
        key={`footer-particle-${i}`}
        className="absolute w-1 h-1 bg-pink-400 dark:bg-purple-400 rounded-full opacity-20"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `footerFloat ${4 + i * 0.5}s ease-in-out infinite alternate`,
          animationDelay: `${i * 0.3}s`,
        }}
      />
    ))}
  </div>

  <div className="container mx-auto px-4 relative z-40">
    {/* Social Links */}
    <div className="flex justify-center space-x-8 mb-8">
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-4 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-sm shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110 hover:rotate-6 border border-white/20 dark:border-gray-700/50"
        >
          {/* Icon glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="relative text-gray-700 dark:text-gray-300 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">
            {link.icon}
          </div>
          
          {/* Tooltip */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 dark:bg-white text-white dark:text-gray-800 px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {link.name}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800 dark:border-t-white" />
          </div>
          
          {/* Ripple effect */}
          <div className="absolute inset-0 rounded-full border-2 border-pink-500/30 scale-0 group-hover:scale-150 opacity-100 group-hover:opacity-0 transition-all duration-500" />
        </a>
      ))}
    </div>

    {/* Copyright */}
    <div className="text-center">
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
        © {new Date().getFullYear()} Raj. All rights reserved.
      </p>
    </div>
  </div>
</footer>

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
        
        /* Footer floating animation */
        @keyframes footerFloat {
          0% {
            transform: translateY(0px) rotate(0deg) scale(1);
            opacity: 0.2;
          }
          100% {
            transform: translateY(-15px) rotate(180deg) scale(1.1);
            opacity: 0.4;
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