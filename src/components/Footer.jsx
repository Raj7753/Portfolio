const Footer = () => {
  return (
    <footer className="relative pt-20 pb-12 bg-transparent z-[50]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex space-x-6 mb-12">
            {[
              { href: 'https://github.com/Raash-03', label: 'GitHub', icon: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg> },
              { href: 'mailto:raaaj0555@gmail.com', label: 'Email', icon: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg> },
              { href: 'https://linkedin.com/in/onlyraaaj', label: 'LinkedIn', icon: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
            ].map((s) => (
              <a key={s.label} href={s.href} target={s.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer" className="group relative p-4 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all duration-500" aria-label={s.label}>
                <div className="absolute inset-0 bg-white/5 dark:bg-white/10 backdrop-blur-xl rounded-2xl border border-slate-200/20 dark:border-slate-700/20 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg" />
                <div className="relative z-10 transition-all duration-500 group-hover:scale-105">{s.icon}</div>
              </a>
            ))}
          </div>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent mb-8" />
          <p className="text-sm text-slate-500 dark:text-slate-400 font-light tracking-wide">
            © {new Date().getFullYear()}{' '}
            <span className="text-slate-700 dark:text-slate-300 font-medium mx-2">Raj</span>
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;