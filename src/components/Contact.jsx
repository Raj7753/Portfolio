import { useState, useEffect } from 'react';

const Contact = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('quick');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [animState, setAnimState] = useState('closed'); // closed | opening | open | closing

  useEffect(() => {
    if (isOpen) {
      setAnimState('opening');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimState('open'));
      });
    } else if (animState === 'open') {
      setAnimState('closing');
      const t = setTimeout(() => setAnimState('closed'), 400);
      return () => clearTimeout(t);
    }
  }, [isOpen, animState]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (animState === 'closed') return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`Hi Raj,\n\n${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`);
    window.location.href = `mailto:raaaj0555@gmail.com?subject=${subject}&body=${body}`;
  };

  const isVisible = animState === 'open';

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 transition-all duration-400 ${isVisible ? 'bg-black/60 backdrop-blur-sm' : 'bg-black/0 backdrop-blur-none'}`}
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div
        className={`relative w-full max-w-lg mx-4 mb-4 md:mb-8 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-full opacity-0 scale-95'
        }`}
        style={{ maxHeight: '85vh' }}
      >
        <div className="bg-black rounded-3xl border border-zinc-800 shadow-2xl overflow-hidden flex flex-col" style={{ maxHeight: '85vh' }}>

          {/* Drag Handle */}
          <div className="flex justify-center pt-4 pb-2 cursor-grab" onClick={onClose}>
            <div className="w-10 h-1 bg-zinc-700 rounded-full hover:bg-zinc-500 transition-colors" />
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto px-6 pb-4 flex-1" style={{ scrollbarWidth: 'thin', scrollbarColor: '#3f3f46 transparent' }}>

            {/* Social Icons */}
            <div className="flex justify-center gap-5 mb-5">
              {[
                { href: 'https://linkedin.com/in/onlyraaaj', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                { href: 'https://instagram.com/onlyraaaj', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
                { href: 'https://wa.me/919430202020', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/></svg> },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-300 hover:scale-110"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Segmented Tabs */}
            <div className="relative bg-zinc-800/60 rounded-xl p-1 flex mb-6">
              <div
                className="absolute top-1 bottom-1 rounded-lg bg-zinc-700 transition-all duration-300 ease-out"
                style={{
                  left: activeTab === 'quick' ? '4px' : '50%',
                  width: 'calc(50% - 4px)',
                }}
              />
              <button
                onClick={() => setActiveTab('quick')}
                className={`relative z-10 flex-1 py-2.5 text-sm font-semibold rounded-lg transition-colors duration-200 ${activeTab === 'quick' ? 'text-white' : 'text-zinc-400 hover:text-zinc-300'}`}
              >
                Quick connect
              </button>
              <button
                onClick={() => setActiveTab('form')}
                className={`relative z-10 flex-1 py-2.5 text-sm font-semibold rounded-lg transition-colors duration-200 ${activeTab === 'form' ? 'text-white' : 'text-zinc-400 hover:text-zinc-300'}`}
              >
                Fill a form
              </button>
            </div>

            {/* Tab Content */}
            <div className="relative overflow-hidden">
              {/* Quick Connect Tab */}
              <div
                className={`transition-all duration-300 ${activeTab === 'quick' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 absolute inset-0 pointer-events-none'}`}
              >
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {/* Email Card */}
                  <a
                    href="mailto:raaaj0555@gmail.com"
                    className="group p-5 bg-zinc-800/50 rounded-2xl border border-zinc-700/50 hover:border-blue-500/30 hover:bg-zinc-800/80 transition-all duration-300 cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
                      <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </div>
                    <h4 className="text-white font-bold text-base mb-1">Email</h4>
                    <p className="text-zinc-400 text-xs mb-1 truncate">raaaj0555@gmail.com</p>
                    <p className="text-zinc-500 text-xs">Send me an email directly</p>
                  </a>

                  {/* Book a Call Card */}
                  <a
                    href="https://calendly.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-5 bg-zinc-800/50 rounded-2xl border border-zinc-700/50 hover:border-purple-500/30 hover:bg-zinc-800/80 transition-all duration-300 cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-300">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="text-white font-bold text-base mb-1">Book a Call</h4>
                    <p className="text-zinc-400 text-xs mb-1">Schedule a time slot</p>
                    <p className="text-zinc-500 text-xs">Book a call on my calendar</p>
                  </a>
                </div>
              </div>

              {/* Form Tab */}
              <div
                className={`transition-all duration-300 ${activeTab === 'form' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 absolute inset-0 pointer-events-none'}`}
              >
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1.5">Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2.5 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all duration-200 hover:border-zinc-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1.5">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-2.5 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all duration-200 hover:border-zinc-600"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-medium text-zinc-400">Message</label>
                      <span className="text-xs text-zinc-600">{formData.message.length}/1000</span>
                    </div>
                    <textarea
                      required
                      rows={4}
                      maxLength={1000}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project..."
                      className="w-full px-3.5 py-2.5 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all duration-200 hover:border-zinc-600 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group w-full relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 hover:scale-[1.02] overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Send message
                      <svg className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Availability Bar */}
          <div className="px-6 py-3 mx-4 mb-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-emerald-400 text-sm font-medium">Currently available for new opportunities</span>
          </div>

        </div>
      </div>

      <style>{`
        .duration-400 { transition-duration: 400ms; }
      `}</style>
    </div>
  );
};

export default Contact;
