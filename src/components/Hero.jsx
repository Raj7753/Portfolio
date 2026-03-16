// src/components/Hero.jsx
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import profilePic from '../assets/raaz.png';
import secondPic from '../assets/raaz2.JPG';
import thirdPic from '../assets/raaz.JPEG';
import portfolio from '../assets/RoCV.pdf';

const Hero = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Draggable Photo Deck State
  const photos = [profilePic, secondPic, thirdPic];
  const [cardOrder, setCardOrder] = useState([0, 1, 2]); // Top card is last in array
  const [dragState, setDragState] = useState({ isDragging: false, startX: 0, startY: 0, x: 0, y: 0 });
  const [snapBack, setSnapBack] = useState(null);
  const deckRef = useRef(null);

  // Auto-shuffle Logic
  useEffect(() => {
    // Only auto-shuffle if we are not actively dragging
    if (dragState.isDragging) return;

    const shuffleInterval = setInterval(() => {
      // Simulate fling animation to the left
      setSnapBack({ x: -250, y: 40 });
      
      setTimeout(() => {
        setCardOrder(prev => {
          const newOrder = [...prev];
          const topCard = newOrder.pop();
          newOrder.unshift(topCard);
          return newOrder;
        });
        setSnapBack({ x: 0, y: 0 }); // reset position at the back
      }, 300);
    }, 3000); // Shuffle every 2 seconds

    return () => clearInterval(shuffleInterval);
  }, [dragState.isDragging]);

  // Deck Drag Logic
  const handlePointerDown = (e, orderPos) => {
    if (orderPos !== cardOrder.length - 1) return;
    
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragState({
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      x: 0, y: 0,
      pointerId: e.pointerId
    });
    setSnapBack(null);
  };

  const handlePointerMove = (e) => {
    if (!dragState.isDragging || e.pointerId !== dragState.pointerId) return;
    
    setDragState(prev => ({
      ...prev,
      x: e.clientX - prev.startX,
      y: e.clientY - prev.startY
    }));
  };

  const handlePointerUp = (e) => {
    if (!dragState.isDragging || e.pointerId !== dragState.pointerId) return;
    e.currentTarget.releasePointerCapture(e.pointerId);

    const threshold = 100;
    if (Math.abs(dragState.x) > threshold || Math.abs(dragState.y) > threshold) {
      // Fling card to back
      const flingX = dragState.x * 2;
      const flingY = dragState.y * 2;
      
      setSnapBack({ x: flingX, y: flingY });
      
      setTimeout(() => {
        setCardOrder(prev => {
          const newOrder = [...prev];
          const topCard = newOrder.pop();
          newOrder.unshift(topCard);
          return newOrder;
        });
        setSnapBack({ x: 0, y: 0 }); // reset position at the back
        setDragState({ isDragging: false, startX: 0, startY: 0, x: 0, y: 0, pointerId: null });
      }, 300);
      
    } else {
      // Snap back to top
      setSnapBack({ x: dragState.x, y: dragState.y });
      requestAnimationFrame(() => {
        setSnapBack({ x: 0, y: 0 });
      });
      setTimeout(() => {
        setDragState({ isDragging: false, startX: 0, startY: 0, x: 0, y: 0, pointerId: null });
        setSnapBack(null);
      }, 300);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const socialLinks = [
    { 
      name: 'Discord', 
      href: 'https://discord.com/users/your-discord-id',
      bg: 'bg-[#5865F2]/30 dark:bg-[#5865F2]/20',
      hover: 'hover:bg-[#5865F2]/60 dark:hover:bg-[#5865F2]/40',
      hoverColor: 'group-hover:text-white dark:group-hover:text-white',
      baseColor: 'text-[#5865F2]',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.211.375-.445.865-.608 1.249a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.249a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      )
    },
    { 
      name: 'LinkedIn', 
      href: 'https://linkedin.com/in/onlyraaaj',
      bg: 'bg-[#0077B5]/30 dark:bg-[#0077B5]/20',
      hover: 'hover:bg-[#0077B5]/70 dark:hover:bg-[#0077B5]/50',
      hoverColor: 'group-hover:text-white dark:group-hover:text-white',
      baseColor: 'text-[#0077B5]',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    { 
      name: 'X', 
      href: 'https://x.com/your-username',
      bg: 'bg-[#0F1419]/30 dark:bg-[#0F1419]/20',
      hover: 'hover:bg-[#0F1419]/70 dark:hover:bg-[#0F1419]/50',
      hoverColor: 'group-hover:text-white dark:group-hover:text-white',
      baseColor: 'text-[#0F1419] dark:text-white',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    { 
      name: 'Github', 
      href: 'https://github.com/your-username',
      bg: 'bg-[#0D1117]/30 dark:bg-[#0D1117]/20',
      hover: 'hover:bg-[#0D1117]/70 dark:hover:bg-[#0D1117]/50',
      hoverColor: 'group-hover:text-white dark:group-hover:text-white',
      baseColor: 'text-[#0D1117] dark:text-white',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    { 
      name: 'LeetCode', 
      href: 'https://leetcode.com/u/your-username/',
      bg: 'bg-[#FFA116]/30 dark:bg-[#FFA116]/20',
      hover: 'hover:bg-[#FFA116]/70 dark:hover:bg-[#FFA116]/50',
      hoverColor: 'group-hover:text-white dark:group-hover:text-white',
      baseColor: 'text-[#FFA116]',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.512 3.835-1.494l2.609-2.637c.514-.514.496-1.365-.039-1.9s-1.386-.553-1.899-.039zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z"/>
        </svg>
      )
    },
    { 
      name: 'Codeforces', 
      href: 'https://codeforces.com/profile/your-handle',
      bg: 'bg-[#3B5998]/30 dark:bg-[#3B5998]/20',
      hover: 'hover:bg-[#3B5998]/70 dark:hover:bg-[#3B5998]/50',
      hoverColor: 'group-hover:text-white dark:group-hover:text-white',
      baseColor: 'text-[#3B5998]',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.5 7.5A1.5 1.5 0 0 1 6 9v10.5A1.5 1.5 0 0 1 4.5 21h-3A1.5 1.5 0 0 1 0 19.5V9a1.5 1.5 0 0 1 1.5-1.5h3zm6-3A1.5 1.5 0 0 1 12 6v13.5a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 6 19.5V6a1.5 1.5 0 0 1 1.5-1.5h3zm6-3A1.5 1.5 0 0 1 18 3v16.5A1.5 1.5 0 0 1 16.5 21h-3A1.5 1.5 0 0 1 12 19.5V3a1.5 1.5 0 0 1 1.5-1.5h3z"/>
        </svg>
      )
    }
  ];

  const techStack = [
    {
      name: "React",
      color: "text-[#61DAFB]",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="2" />
          <path d="M12 1c-6.19 0-11.2 4.93-11.2 11.03 0 5.36 3.83 9.82 8.9 10.78.65.12.89-.28.89-.62v-2.23c-3.64.79-4.4-1.78-4.4-1.78-.59-1.5-1.44-1.9-1.44-1.9-1.18-.8.09-.79.09-.79 1.3.09 1.99 1.34 1.99 1.34 1.16 1.98 3.04 1.41 3.78 1.08.12-.84.46-1.41.83-1.74-2.89-.33-5.93-1.45-5.93-6.43 0-1.42.51-2.58 1.34-3.49-.13-.33-.58-1.65.13-3.44 0 0 1.09-.35 3.58 1.33a12.32 12.32 0 0 1 6.52 0c2.49-1.68 3.58-1.33 3.58-1.33.71 1.79.26 3.11.13 3.44.83.91 1.34 2.07 1.34 3.49 0 5-3.05 6.1-5.95 6.42.47.4.89 1.2.89 2.42v3.58c0 .35.24.75.9.62 5.07-.96 8.89-5.42 8.89-10.78C23.2 5.93 18.19 1 12 1z"/>
        </svg>
      ),
    },
    {
      name: "Node.js",
      color: "text-[#339933]",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L1.608 6v12L12 24l10.392-6V6L12 0zm-1.41 6.706l-.706-.706L12 4.118l2.116 1.882-.706.706L12 5.294 10.59 6.706zm2.82 0L12 5.294l-1.41 1.412-.706-.706L12 4.118l2.116 1.882-.706.706zM7 17.5v-11L12 10l5-3.5v11L12 14 7 17.5z"/>
        </svg>
      ),
    },
    {
      name: "Next.js",
      color: "text-black dark:text-white",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16l-6.222 6.222-6.222-6.222 1.414-1.414L12 12.208l5.462-5.462 1.414 1.414z"/>
        </svg>
      ),
    },
    {
      name: "C++",
      color: "text-[#00599C]",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.393 6c-.167-.29-.398-.543-.652-.69L12.926.22c-.508-.293-1.339-.293-1.847 0L2.26 5.31c-.508.293-.923 1.013-.923 1.6v10.18c0 .294.104.62.271.91.398.549.923.735 1.327.735.271 0 .552-.061.813-.188L12.5 13.738c.508-.293 1.339-.293 1.847 0l8.751 4.809c.26.127.542.188.813.188.404 0 .929-.186 1.327-.735.167-.29.271-.616.271-.91V6.91c0-.587-.415-1.307-.923-1.6L22.393 6z"/>
        </svg>
      ),
    },
    {
      name: "CSS3",
      color: "text-[#1572B6]",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.413l.213 2.622h10.125l-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>
        </svg>
      ),
    },
    {
      name: "Tailwind",
      color: "text-[#06B6D4]",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zM6.001 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
        </svg>
      ),
    },
    {
      name: "Vite",
      color: "text-[#646CFF]",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.827 8.243A.549.549 0 0 0 23.48 8L20.12 1.45a.549.549 0 0 0-.946 0L15.814 8a.549.549 0 0 0 .473.826h7.067a.549.549 0 0 0 .473-.583zM8.68 1.45L5.32 8a.549.549 0 0 0 .473.826h6.74a.549.549 0 0 0 .473-.826L9.626 1.45a.549.549 0 0 0-.946 0zM12 16l-6-10h12l-6 10z"/>
        </svg>
      ),
    },
    {
      name: "Git",
      color: "text-[#F05032]",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.715.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.885 0-2.6.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
        </svg>
      ),
    },
    {
      name: "MongoDB",
      color: "text-[#47A248]",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-3.032.284-6.06.749-9.028.398-2.5-.166-7.398-.166-7.398.926 3.4 2.83 6.15 4.218 11.98z"/>
        </svg>
      ),
    },
    {
      name: "PostgreSQL",
      color: "text-[#336791]",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.128 0c-.746 0-1.536.165-2.21.47l-.019.008c-.88.398-1.476 1.045-1.476 2.212 0 .41.105.769.272 1.094-.356.32-.589.78-.589 1.306 0 .526.233.986.589 1.306-.167.325-.272.684-.272 1.094 0 1.167.596 1.814 1.476 2.212l.019.008c.674.305 1.464.47 2.21.47.746 0 1.536-.165 2.21-.47l.019-.008c.88-.398 1.476-1.045 1.476-2.212 0-.41-.105-.769-.272-1.094.356-.32.589-.78.589-1.306 0-.526-.233-.986-.589-1.306.167-.325.272-.684.272-1.094 0-1.167-.596-1.814-1.476-2.212l-.019-.008C18.664.165 17.874 0 17.128 0z"/>
        </svg>
      ),
    },
    {
      name: "Docker",
      color: "text-[#2496ED]",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185zm-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186zm0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186zm-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186zm-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186zm5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185zm-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185zm-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185zm-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185z"/>
        </svg>
      ),
    },
    {
      name: "Figma",
      color: "text-[#F24E1E]",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.5-2.047 4.539-4.563 4.539zm-.024-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019 3.019-1.355 3.019-3.019V16.49H8.148zm7.704 0c-.001-2.476 2.013-4.49 4.489-4.49s4.49 2.014 4.49 4.49-2.014 4.49-4.49 4.49-4.49-2.014-4.489-4.49zm4.49 3.019c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019-3.019 1.355-3.019 3.019 1.355 3.019 3.019 3.019z"/>
        </svg>
      ),
    },
    {
      name: "JavaScript",
      color: "text-[#F7DF1E]",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
        </svg>
      ),
    },
    {
      name: "HTML5",
      color: "text-[#E34F26]",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
        </svg>
      ),
    }
  ];
         
  return (
    <>
      <section 
        ref={heroRef}
        className="min-h-screen flex flex-col items-center justify-start gap-12 py-12 px-6 lg:px-12 bg-gradient-to-br from-white/50 to-white dark:from-gray-900 dark:to-gray-800 transition-all duration-500 relative overflow-hidden"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(219,39,119,0.08) 0%, transparent 50%)`
        }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute w-96 h-96 bg-gradient-to-r from-pink-300/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"
            style={{
              top: `${20 + Math.sin(Date.now() * 0.001) * 10}%`,
              left: `${10 + Math.cos(Date.now() * 0.001) * 5}%`,
            }}
          />
          <div 
            className="absolute w-64 h-64 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-1000"
            style={{
              bottom: `${20 + Math.sin(Date.now() * 0.0015) * 15}%`,
              right: `${10 + Math.cos(Date.now() * 0.0015) * 8}%`,
            }}
          />
          
          {/* Floating particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-pink-400 rounded-full opacity-40 animate-bounce delay-200" />
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full opacity-60 animate-bounce delay-700" />
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-50 animate-bounce delay-1000" />
        </div>

       {/* Portfolio Intro */}
<div className="w-full max-w-6xl relative z-10 flex flex-col lg:flex-row items-start gap-8 mt-40 mb-5">
  {/* Left side text */}
  <div className="w-full lg:w-1/2 space-y-6">
    <div className="text-left space-y-4">
      {/* Greeting badge */}
      <div className="inline-flex items-center px-4 py-2 bg-indigo-100/80 dark:bg-indigo-900/30 backdrop-blur-sm rounded-full border border-indigo-200/50 dark:border-indigo-700/50 mb-4">
        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse mr-2"></div>
        <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
          Building the Future
        </span>
      </div>

      <h1 className="text-3xl lg:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white transition-colors relative tracking-tighter">
        <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-pink-600 to-gray-900 dark:from-white dark:via-pink-400 dark:to-white animate-gradient-text">
          Hi, I'm
        </span>{' '}
        <span className="text-pink-600 dark:text-pink-400 relative inline-block font-black tracking-tight" style={{ paddingBottom: '0.2em' }}>
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 animate-gradient-text pb-2">
            Raj
          </span>
          {/* Animated underline */}
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left animate-pulse"></div>
        </span>
      </h1>

              <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                <p>
                  I craft software that works as hard as I do — caffeine and code turned into solutions.
                </p>
                <p>
                  <strong className="text-gray-900 dark:text-white">Full-Stack development</strong>, a dash of <strong className="text-gray-900 dark:text-white">UI Design</strong>, 
                  and a commitment to progress both in code and in the gym.
                </p>
                <p>
                  Sleep is part of the stack too 😴 — because balance is everything.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8">
              <button
                onClick={() => navigate('/projects')}
                className="group relative px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-700 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-pink-500/25 hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center">
                  View My Work
                  <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
              </button>
              
              <a
                href={portfolio}
                download="raj_making_portfolio.pdf"
                className="group relative px-8 py-4 border-2 border-pink-600/30 bg-pink-50/50 dark:bg-pink-900/10 backdrop-blur-sm text-pink-600 dark:text-pink-400 rounded-2xl font-semibold transition-all duration-300 hover:bg-pink-100/70 dark:hover:bg-pink-900/20 hover:border-pink-600/60 hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <svg className="mr-2 w-5 h-5 transform group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Resume
                </span>
                {/* Subtle shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-pink-200/30 to-transparent skew-x-12"></div>
              </a>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">10+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Projects Built</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">5+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Technologies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">2+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Years Learning</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">∞</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Curiosity</div>
              </div>
            </div>
          </div>

          {/* Right side: Draggable Photo Deck */}
          <div 
            className="lg:w-1/2 flex justify-center lg:justify-end py-10"
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            <div className="relative w-72 h-96 lg:w-80 lg:h-[26rem] flex-shrink-0" ref={deckRef}>
                {cardOrder.map((photoIdx, orderPos) => {
                  const isTop = orderPos === cardOrder.length - 1;
                  const stackOffset = orderPos - (cardOrder.length - 1);
                  const isDraggingThis = dragState.isDragging && isTop;

                  let tx = 0, ty = 0, rot = 0;
                  if (isDraggingThis) {
                    if (snapBack) {
                      tx = snapBack.x;
                      ty = snapBack.y;
                    } else {
                      tx = dragState.x;
                      ty = dragState.y;
                    }
                    rot = tx * 0.08;
                  } else {
                    tx = 0;
                    ty = stackOffset * 12;
                    rot = stackOffset * 5;
                  }

                  const scale = isTop ? 1 : 1 + stackOffset * 0.04;

                  return (
                    <div
                      key={photoIdx}
                      onPointerDown={(e) => handlePointerDown(e, orderPos)}
                      className={`absolute inset-0 touch-none select-none ${
                        isDraggingThis && !snapBack ? 'cursor-grabbing' : isTop ? 'cursor-grab' : 'cursor-default'
                      } ${isDraggingThis && snapBack ? 'transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]' : isDraggingThis ? '' : 'transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]'}`}
                      style={{
                        transform: `translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(${scale})`,
                        zIndex: orderPos + 1,
                        opacity: snapBack && isDraggingThis && snapBack.x !== 0 ? 0 : 1,
                      }}
                    >
                      <div className={`w-full h-full rounded-3xl overflow-hidden border-2 shadow-2xl ${
                        isTop ? 'border-pink-500/60 shadow-pink-500/30' : 'border-white/20 dark:border-gray-600/30'
                      } ${isDraggingThis ? 'shadow-3xl shadow-black/40' : 'hover:-translate-y-2 hover:shadow-3xl hover:border-pink-400 transition-all duration-300'}`}>
                        <img
                          src={photos[photoIdx]}
                          alt={`Raj ${photoIdx + 1}`}
                          className="w-full h-full object-cover pointer-events-none"
                          draggable={false}
                        />
                      </div>
                    </div>
                  );
                })}
                {/* Hint text below deck */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-sm text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap flex items-center gap-2 bg-white/30 dark:bg-black/30 backdrop-blur-md px-4 py-1.5 rounded-full border border-gray-200/50 dark:border-gray-700/50 shadow-sm pointer-events-none">
                  <svg className="w-4 h-4 animate-bounce text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M7 11l5-5m0 0l5 5m-5-5v12"/></svg>
                  Drag to shuffle
                </div>
              </div>
          </div>
        </div>

        {/* Socials + Tech Stack + Skills */}
        <div className="w-full max-w-6xl relative z-10 flex flex-col lg:flex-row items-start gap-12">
          {/* Left column */}
          <div className="lg:w-1/2 space-y-12">
            {/* Socials Section - Glass Container */}
            <div className="group bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 dark:border-gray-700/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/15 dark:hover:bg-gray-800/15 relative overflow-hidden">
              {/* Glass shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full animate-pulse" />
              
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Socials</h3>
                <div className="px-3 py-1 bg-gray-200/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-full transform hover:scale-105 transition-transform duration-300">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">×6</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`group/social relative w-20 h-20 ${social.bg} ${social.hover} rounded-2xl border border-white/30 dark:border-gray-600/30 flex flex-col items-center justify-center transition-all duration-500 hover:scale-125 hover:shadow-2xl hover:-translate-y-3 hover:rotate-6 cursor-pointer overflow-hidden backdrop-blur-sm`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <div className={`${social.baseColor} ${social.hoverColor} transform group-hover/social:scale-110 transition-all duration-500 relative z-10`}>
                      {social.icon}
                    </div>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400 group-hover/social:text-gray-800 dark:group-hover/social:text-gray-200 mt-1 transition-colors duration-300">
                      {social.name}
                    </span>
                    
                    {/* Tooltip */}
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/90 dark:bg-gray-700/90 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover/social:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-lg z-20 group-hover/social:-translate-y-1 border border-gray-600/20">
                      {social.name}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/90 dark:border-t-gray-700/90"></div>
                    </div>
                    
                    {/* Glowing effect */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/social:opacity-60 transition-opacity duration-500 bg-gradient-to-br from-white/50 via-transparent to-transparent" />
                    
                    {/* Shine effect */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/social:opacity-80 transition-all duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full group-hover/social:translate-x-full" />
                    
                    {/* Floating particles effect */}
                    <div className="absolute inset-0 opacity-0 group-hover/social:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-1 right-1 w-1 h-1 bg-current rounded-full animate-ping" style={{ animationDelay: '0.1s' }} />
                      <div className="absolute bottom-1 left-1 w-0.5 h-0.5 bg-current rounded-full animate-ping" style={{ animationDelay: '0.3s' }} />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* My Secret Sauce - Infinite Marquee Tech Stack */}
            <div className="group bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 dark:border-gray-700/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:bg-white/15 dark:hover:bg-gray-800/15 relative overflow-hidden">
              {/* Glass shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full animate-pulse" />
              
              <div className="flex items-center gap-4 mb-6 group/header">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400/20 to-purple-600/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg group-hover/header:shadow-xl transition-all duration-300 group-hover/header:scale-110 border border-pink-300/30">
                  <svg className="w-6 h-6 text-pink-600 dark:text-pink-400 group-hover/header:text-purple-500 transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover/header:text-pink-600 dark:group-hover/header:text-pink-400 transition-colors duration-300">My Secret Sauce</h3>
                  <p className="text-gray-600 dark:text-gray-400">Technologies I work with</p>
                </div>
              </div>

              {/* Row 1 - scrolls left */}
              <div className="marquee-container mb-3">
                <div className="marquee-track marquee-left">
                  {[...techStack, ...techStack].map((tech, index) => (
                    <div
                      key={`r1-${index}`}
                      className={`group/tech relative flex-shrink-0 w-16 h-16 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-xl border border-white/30 dark:border-gray-600/30 flex items-center justify-center transition-all duration-300 hover:scale-125 hover:shadow-2xl hover:-translate-y-3 cursor-pointer overflow-visible mx-2 ${tech.color}`}
                    >
                      <div className="transform group-hover/tech:scale-110 transition-all duration-500 relative z-10">
                        {tech.icon}
                      </div>
                      {/* Name tooltip on hover */}
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900/90 dark:bg-gray-700/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover/tech:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-lg z-30 border border-gray-600/20">
                        {tech.name}
                      </div>
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover/tech:opacity-60 transition-opacity duration-500 bg-gradient-to-br from-white/50 via-transparent to-transparent" />
                      <div className="absolute inset-0 opacity-0 group-hover/tech:opacity-100 transition-opacity duration-500">
                        <div className="absolute top-1 right-1 w-1 h-1 bg-current rounded-full animate-ping" style={{ animationDelay: '0.1s' }} />
                        <div className="absolute bottom-1 left-1 w-0.5 h-0.5 bg-current rounded-full animate-ping" style={{ animationDelay: '0.3s' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Row 2 - scrolls right */}
              <div className="marquee-container">
                <div className="marquee-track marquee-right">
                  {[...techStack.slice().reverse(), ...techStack.slice().reverse()].map((tech, index) => (
                    <div
                      key={`r2-${index}`}
                      className={`group/tech relative flex-shrink-0 w-16 h-16 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-xl border border-white/30 dark:border-gray-600/30 flex items-center justify-center transition-all duration-300 hover:scale-125 hover:shadow-2xl hover:-translate-y-3 cursor-pointer overflow-visible mx-2 ${tech.color}`}
                    >
                      <div className="transform group-hover/tech:scale-110 transition-all duration-500 relative z-10">
                        {tech.icon}
                      </div>
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900/90 dark:bg-gray-700/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover/tech:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-lg z-30 border border-gray-600/20">
                        {tech.name}
                      </div>
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover/tech:opacity-60 transition-opacity duration-500 bg-gradient-to-br from-white/50 via-transparent to-transparent" />
                      <div className="absolute inset-0 opacity-0 group-hover/tech:opacity-100 transition-opacity duration-500">
                        <div className="absolute top-1 right-1 w-1 h-1 bg-current rounded-full animate-ping" style={{ animationDelay: '0.1s' }} />
                        <div className="absolute bottom-1 left-1 w-0.5 h-0.5 bg-current rounded-full animate-ping" style={{ animationDelay: '0.3s' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* GitHub Activity Indicator - Extended horizontally with green theme */}
            <div className="flex items-center justify-center lg:justify-start">
              <div className="group bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-600/20 hover:shadow-2xl hover:scale-105 transition-all duration-500 relative overflow-hidden w-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-600/30 to-green-500/30 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg border border-green-400/30">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">GitHub Activity</span>
                </div>
                
                {/* Extended GitHub Activity Grid */}
                <div className="grid grid-cols-16 gap-1">
                  {Array.from({ length: 112 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-sm transition-all duration-500 hover:scale-150 cursor-pointer transform hover:rotate-45 ${
                        Math.random() > 0.7 
                          ? 'bg-green-500 hover:bg-green-400 shadow-lg hover:shadow-green-500/50' 
                          : Math.random() > 0.5 
                          ? 'bg-green-400 hover:bg-green-300' 
                          : Math.random() > 0.3 
                          ? 'bg-green-300 hover:bg-green-200' 
                          : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                      style={{
                        animationDelay: `${i * 15}ms`,
                      }}
                    />
                  ))}
                </div>
                
                {/* Glowing background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-200/10 via-transparent to-green-200/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform -translate-x-full group-hover:translate-x-full rounded-2xl"></div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="lg:w-1/2 space-y-12">
            {/* Get In Touch Section */}
            <div className="group bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/15 dark:hover:bg-gray-800/15 relative overflow-hidden">
              {/* Glass shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full animate-pulse" />
              
              <div className="flex items-center gap-4 mb-8 group/header">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400/20 to-purple-600/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg group-hover/header:shadow-xl transition-all duration-300 group-hover/header:scale-110 border border-pink-300/30">
                  <svg className="w-6 h-6 text-pink-600 dark:text-pink-400 group-hover/header:text-purple-500 transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 8l7.89 4.26c.67.36 1.47.36 2.14 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover/header:text-pink-600 dark:group-hover/header:text-pink-400 transition-colors duration-300">Get In Touch</h3>
                  <p className="text-gray-600 dark:text-gray-400">Let's collaborate and build something amazing together</p>
                </div>
              </div>

              {/* Contact Items */}
              <div className="space-y-6">
                {/* Email */}
                <a
                  href="mailto:raaaj0555@gmail.com"
                  className="group/contact flex items-center gap-4 p-4 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-gray-600/30 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 rounded-xl flex items-center justify-center group-hover/contact:scale-110 group-hover/contact:rotate-6 transition-all duration-500 border border-red-300/30">
                    <svg className="w-6 h-6 text-red-600 dark:text-red-400 group-hover/contact:scale-125 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white group-hover/contact:text-red-600 dark:group-hover/contact:text-red-400 transition-colors duration-300">Email</h4>
                    <p className="text-gray-600 dark:text-gray-400 group-hover/contact:text-gray-800 dark:group-hover/contact:text-gray-200 transition-colors duration-300">raaaj0555@gmail.com</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 ml-auto group-hover/contact:text-red-600 group-hover/contact:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/onlyraaaj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/contact flex items-center gap-4 p-4 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-gray-600/30 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl flex items-center justify-center group-hover/contact:scale-110 group-hover/contact:rotate-6 transition-all duration-500 border border-blue-300/30">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover/contact:scale-125 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white group-hover/contact:text-blue-600 dark:group-hover/contact:text-blue-400 transition-colors duration-300">LinkedIn</h4>
                    <p className="text-gray-600 dark:text-gray-400 group-hover/contact:text-gray-800 dark:group-hover/contact:text-gray-200 transition-colors duration-300">onlyraaaj</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 ml-auto group-hover/contact:text-blue-600 group-hover/contact:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/onlyraaaj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/contact flex items-center gap-4 p-4 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-gray-600/30 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-purple-200 dark:from-pink-900/30 dark:to-purple-800/30 rounded-xl flex items-center justify-center group-hover/contact:scale-110 group-hover/contact:rotate-6 transition-all duration-500 border border-pink-300/30">
                    <svg className="w-6 h-6 text-pink-600 dark:text-pink-400 group-hover/contact:scale-125 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white group-hover/contact:text-pink-600 dark:group-hover/contact:text-pink-400 transition-colors duration-300">Instagram</h4>
                    <p className="text-gray-600 dark:text-gray-400 group-hover/contact:text-gray-800 dark:group-hover/contact:text-gray-200 transition-colors duration-300">@onlyraaaj</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 ml-auto group-hover/contact:text-pink-600 group-hover/contact:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/919430202620"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/contact flex items-center gap-4 p-4 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-gray-600/30 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-xl flex items-center justify-center group-hover/contact:scale-110 group-hover/contact:rotate-6 transition-all duration-500 border border-green-300/30">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400 group-hover/contact:scale-125 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white group-hover/contact:text-green-600 dark:group-hover/contact:text-green-400 transition-colors duration-300">WhatsApp</h4>
                    <p className="text-gray-600 dark:text-gray-400 group-hover/contact:text-gray-800 dark:group-hover/contact:text-gray-200 transition-colors duration-300">+91 9430202020</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 ml-auto group-hover/contact:text-green-600 group-hover/contact:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              {/* Call to action */}
              <div className="mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
                  Available for freelance projects and collaboration opportunities
                </p>
              </div>
            </div>

            {/* Skills Preview Cards */}
            <div className="space-y-4">
              <div className="group bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-600/20 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-500 cursor-pointer relative overflow-hidden">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100/50 to-blue-200/50 dark:from-blue-900/30 dark:to-blue-800/30 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-blue-300/30">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:scale-125 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">UI Animation</h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Make it move</span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
                  I use Framer Motion, GSAP and Tailwind to add micro-interactions and smooth transitions.
                </p>
                
                {/* Animated background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-200/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform -translate-x-full group-hover:translate-x-full"></div>
              </div>

              <div className="group bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-600/20 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-500 cursor-pointer relative overflow-hidden">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-100/50 to-pink-200/50 dark:from-pink-900/30 dark:to-pink-800/30 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-pink-300/30">
                    <svg className="w-6 h-6 text-pink-600 dark:text-pink-400 group-hover:scale-125 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">Auth Systems</h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Login, secured</span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
                  I implement modern auth flows using JWT, OAuth, sessions, and role-based access.
                </p>
                
                {/* Animated background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-pink-200/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform -translate-x-full group-hover:translate-x-full"></div>
              </div>
            </div>
          </div>
        </div>

      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(2deg); }
          66% { transform: translateY(-5px) rotate(-1deg); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 5px rgba(219,39,119,0.25), 0 0 10px rgba(219,39,119,0.18); 
          }
          50% { 
            box-shadow: 0 0 20px rgba(219,39,119,0.45), 0 0 30px rgba(219,39,119,0.3); 
          }
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes gradient-text {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes bounce-gentle {
          0%, 100% { 
            transform: translateY(0px) scale(1); 
          }
          50% { 
            transform: translateY(-5px) scale(1.05); 
          }
        }

        @keyframes flowing-tech {
          0% { transform: translateX(-100%) rotate(0deg); }
          100% { transform: translateX(100vw) rotate(360deg); }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 4s ease-in-out infinite;
        }

        .animate-gradient-text {
          background-size: 200% 200%;
          animation: gradient-text 3s ease-in-out infinite;
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }

        .animate-flowing-tech {
          animation: flowing-tech 15s linear infinite;
        }

        /* Marquee infinite scroll */
        .marquee-container {
          overflow: hidden;
          position: relative;
          width: 100%;
          mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
          padding: 8px 0;
        }
        .marquee-track {
          display: flex;
          width: max-content;
        }
        .marquee-left {
          animation: marquee-scroll-left 20s linear infinite;
        }
        .marquee-right {
          animation: marquee-scroll-right 25s linear infinite;
        }
        .marquee-container:hover .marquee-left,
        .marquee-container:hover .marquee-right {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        /* Grid for extended GitHub activity */
        .grid-cols-16 {
          grid-template-columns: repeat(16, minmax(0, 1fr));
        }


        /* Enhanced transitions */
        * {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Glassmorphism enhancement */
        .backdrop-blur-xl {
          backdrop-filter: blur(16px) saturate(180%) brightness(110%);
        }

        /* Text gradient animation */
        .bg-clip-text {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease-in-out infinite;
        }

        /* Hover state improvements */
        .group:hover .transform {
          transform-origin: center;
        }

        /* Loading animation for cards */
        @keyframes card-enter {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .group {
          animation: card-enter 0.6s ease-out forwards;
        }

        /* Glass container special effects */
        .glass-container {
          position: relative;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
          backdrop-filter: blur(16px) saturate(180%);
          border: 1px solid rgba(255,255,255,0.2);
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }

        .glass-container:hover {
          background: linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.08));
          box-shadow: 0 16px 64px rgba(0,0,0,0.15);
        }

        /* Tech stack flowing animation */
        .tech-flowing {
          position: relative;
          overflow: hidden;
        }

        .tech-flowing::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          animation: flowing-tech 3s ease-in-out infinite;
        }

        /* Shadow enhancements */
        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .marquee-container {
          overflow: hidden;
          width: 100%;
          position: relative;
        }
        
        .marquee-track {
          display: flex;
          width: max-content;
        }

        .marquee-left {
          animation: marqueeLeft 30s linear infinite;
        }

        .marquee-right {
          animation: marqueeRight 30s linear infinite;
        }

        .marquee-container:hover .marquee-track {
          animation-play-state: paused;
        }

        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </>
  );
};

export default Hero;