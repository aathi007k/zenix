import { Link, useLocation } from 'react-router-dom';
import { useGlobal } from '../context/GlobalContext';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { company } = useGlobal();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/team', label: 'Team' },
    { to: '/terms', label: 'Terms' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-[#D4AF37]/10 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent py-6'}`}
      >
        <div className="max-w-7xl mx-auto px-8 sm:px-12 md:px-16 lg:px-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group relative z-50">
            {company.logo ? (
              <img src={company.logo} alt="Logo" className="h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center text-black font-bold text-xl shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                {company.name.charAt(0)}
              </div>
            )}
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-[#D4AF37] transition-colors duration-300 uppercase">
              {company.name}
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-8 px-6 py-2 rounded-full glass border border-[#D4AF37]/10">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`text-sm font-semibold tracking-wide uppercase transition-colors duration-300 relative group ${location.pathname === to ? 'text-[#D4AF37]' : 'text-gray-400 hover:text-white'}`}
                >
                  {label}
                  {location.pathname === to && (
                    <motion.span layoutId="nav-indicator" className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#D4AF37] rounded-full" />
                  )}
                  {location.pathname !== to && (
                    <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#D4AF37]/50 rounded-full group-hover:w-full transition-all duration-300" />
                  )}
                </Link>
              ))}
            </div>
            
            <Link
              to="/admin"
              className="btn-glow px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            >
              Admin
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative z-50 text-gray-300 hover:text-[#D4AF37] transition-colors p-2"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 px-6 pt-20"
          >
            {navLinks.map(({ to, label }, i) => (
              <motion.div
                key={to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link 
                  to={to} 
                  onClick={() => setMenuOpen(false)} 
                  className={`text-2xl font-bold uppercase tracking-widest ${location.pathname === to ? 'text-[#D4AF37]' : 'text-gray-400 hover:text-white'}`}
                >
                  {label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.1 }}
            >
              <Link 
                to="/admin" 
                onClick={() => setMenuOpen(false)} 
                className="mt-8 btn-glow px-10 py-4 rounded-xl text-sm font-bold uppercase tracking-widest inline-block"
              >
                Admin Access
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
