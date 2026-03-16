import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header = ({ darkMode, setDarkMode, onContactOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/', isRoute: true },
    { name: 'About', href: '/about', isRoute: true },
    { name: 'Projects', href: '/projects', isRoute: true },
    { name: 'Contact', isModal: true },
  ];

  const handleNavigation = (e, item) => {
    e.preventDefault();
    if (item.isModal && onContactOpen) {
      onContactOpen();
    } else if (item.isRoute) {
      navigate(item.href);
    }
  };

  return (
    <header className="fixed w-full z-[100] transition-all duration-300">
      <div className="container mx-auto px-4 py-4">
        {/* Square container with rounded corners - Smaller size */}
        <div className="flex justify-center">
          <div className="bg-white/10 dark:bg-black/10 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-full p-3 shadow-lg z-[100]">
            {/* iOS-style centered navigation - Compact spacing */}
            <div className="flex justify-center items-center gap-4 md:gap-6">
              {/* Navigation Items */}
              <nav className="flex items-center gap-4 md:gap-6">
                {navItems.map((item) => (
                  item.isModal ? (
                    <button
                      key={item.name}
                      onClick={(e) => handleNavigation(e, item)}
                      className="text-textLight dark:text-textDark hover:text-primaryLight dark:hover:text-primaryDark transition-colors duration-300 font-medium text-xs md:text-sm px-3 py-1.5 rounded-full bg-white/5 dark:bg-white/5 hover:bg-white/15 dark:hover:bg-white/10 border border-white/10 dark:border-white/10 relative z-[100]"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={(e) => handleNavigation(e, item)}
                      className="text-textLight dark:text-textDark hover:text-primaryLight dark:hover:text-primaryDark transition-colors duration-300 font-medium text-xs md:text-sm px-2 py-1 rounded-md hover:bg-white/5 dark:hover:bg-black/5 relative z-[100]"
                    >
                      {item.name}
                    </Link>
                  )
                ))}
              </nav>

              {/* Theme Toggle */}
              <div className="flex items-center relative z-[100]">
                <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;