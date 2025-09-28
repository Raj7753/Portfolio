import { FiGithub, FiMail, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer id="contact" className="relative bg-white dark:bg-black pt-12 pb-6">
      

      <div className="container mx-auto px-4">
        {/* Centered content */}
        <div className="flex flex-col items-center justify-center text-center">
          {/* Social icons centered */}
          <div className="flex space-x-6 mb-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:-translate-y-1"
              aria-label="GitHub"
            >
              <FiGithub className="h-6 w-6" />
            </a>
            <a
              href="mailto:raaaj0555@gmail.com"
              className="p-4 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:-translate-y-1"
              aria-label="Email"
            >
              <FiMail className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com/in/onlyraaaj"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:-translate-y-1"
              aria-label="LinkedIn"
            >
              <FiLinkedin className="h-6 w-6" />
            </a>
          </div>

          {/* Copyright centered */}
          <p className="text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 font-semibold"> Raj</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;