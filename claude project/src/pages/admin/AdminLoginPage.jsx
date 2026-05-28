import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useGlobal } from '../../context/GlobalContext';
import { Lock, User, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLoginPage() {
  const { auth, login } = useGlobal();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (auth.isLoggedIn) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const ok = login(form.username, form.password);
    setLoading(false);
    if (ok) navigate('/admin/dashboard', { replace: true });
    else setError('Invalid credentials. Access Denied.');
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#111] via-[#050505] to-[#050505]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#B8860B]/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: 'linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            <ShieldCheck className="text-black" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white uppercase tracking-widest mb-2">Secure Portal</h1>
          <p className="text-[#FFF7D6]/40 text-xs uppercase tracking-[0.2em]">Authorized Personnel Only</p>
        </div>

        <div className="card-premium rounded-3xl p-8 md:p-10 border border-[#D4AF37]/20 backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">Identifier</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="text-[#FFF7D6]/40" size={18} />
                </div>
                <input
                  id="admin-username"
                  type="text"
                  className="w-full bg-[#050505] border border-[#D4AF37]/20 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder-[#FFF7D6]/20 font-light"
                  placeholder="Enter administrator ID"
                  value={form.username}
                  onChange={e => setForm({...form, username: e.target.value})}
                  required
                  autoComplete="username"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">Security Key</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="text-[#FFF7D6]/40" size={18} />
                </div>
                <input
                  id="admin-password"
                  type="password"
                  className="w-full bg-[#050505] border border-[#D4AF37]/20 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder-[#FFF7D6]/20 font-light"
                  placeholder="Enter passcode"
                  value={form.password}
                  onChange={e => setForm({...form, password: e.target.value})}
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-900/20 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-xs font-medium text-center"
              >
                {error}
              </motion.div>
            )}

            <button
              id="admin-login-btn"
              type="submit"
              disabled={loading}
              className="w-full btn-glow text-black font-bold uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Authenticating...
                </>
              ) : 'Authenticate'}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-[#D4AF37]/10 pt-6">
             <p className="text-[#FFF7D6]/30 text-xs font-light">
              Demo Access: <span className="text-[#D4AF37] font-medium">admin</span> / <span className="text-[#D4AF37] font-medium">zen@2026</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
