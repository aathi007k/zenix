import { Link, useLocation, useNavigate, Navigate, Outlet } from 'react-router-dom';
import { useGlobal } from '../../context/GlobalContext';
import { useState } from 'react';
import { LayoutDashboard, Building2, Palette, Users, MessageSquareQuote, BarChart3, FileText, Blocks, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/company', icon: Building2, label: 'Company Info' },
  { to: '/admin/branding', icon: Palette, label: 'Branding' },
  { to: '/admin/workers', icon: Users, label: 'Team Members' },
  { to: '/admin/testimonials', icon: MessageSquareQuote, label: 'Testimonials' },
  { to: '/admin/stats', icon: BarChart3, label: 'Statistics' },
  { to: '/admin/terms', icon: FileText, label: 'Terms & Conditions' },
  { to: '/admin/requirements', icon: Blocks, label: 'Custom Fields' },
];

export default function AdminLayout() {
  const { auth, logout, company } = useGlobal();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!auth.isLoggedIn) {
    return <Navigate to="/admin" replace />;
  }

  const handleLogout = () => { logout(); navigate('/admin', { replace: true }); };

  return (
    <div className="min-h-screen flex bg-[#050505]">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden" 
            onClick={() => setSidebarOpen(false)} 
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-72 z-50 flex flex-col transition-transform duration-500 ease-[0.16,1,0.3,1]
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        border-r border-[#D4AF37]/10 bg-[#0B0B0F] overflow-hidden`}>
        
        {/* Decorative ambient light */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        {/* Brand */}
        <div className="p-6 border-b border-[#D4AF37]/10 relative z-10">
          <Link to="/" className="flex items-center gap-3 group">
            {company.logo ? (
              <img src={company.logo} alt="Logo" className="h-8 w-auto object-contain" />
            ) : (
              <div className="w-8 h-8 rounded border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] font-bold shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                {company.name.charAt(0)}
              </div>
            )}
            <div>
              <div className="text-sm font-bold text-white uppercase tracking-wider group-hover:text-[#D4AF37] transition-colors">{company.name}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#FFF7D6]/40">Admin Control</div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto relative z-10 scrollbar-hide">
          <div className="text-[10px] font-bold text-[#FFF7D6]/30 uppercase tracking-[0.2em] mb-4 px-2">Menu</div>
          {NAV.map(({ to, icon: Icon, label }) => {
            const isActive = location.pathname === to;
            return (
              <Link key={to} to={to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 font-medium text-sm
                  ${isActive ? 'bg-[#D4AF37]/10 text-[#D4AF37] shadow-[inset_2px_0_0_#D4AF37]' : 'text-[#FFF7D6]/60 hover:text-white hover:bg-[#D4AF37]/5'}
                `}
                onClick={() => setSidebarOpen(false)}>
                <Icon size={18} className={isActive ? "text-[#D4AF37]" : "text-[#FFF7D6]/40"} />
                <span>{label}</span>
              </Link>
            )
          })}
        </nav>

        {/* User + Logout */}
        <div className="p-6 border-t border-[#D4AF37]/10 relative z-10 bg-[#0B0B0F]">
          <div className="flex items-center gap-3 mb-4 px-3 py-2 rounded-lg border border-[#D4AF37]/10 bg-gradient-to-r from-[#D4AF37]/5 to-transparent">
            <div className="w-8 h-8 rounded bg-[#111] border border-[#D4AF37]/30 flex items-center justify-center">
              <span className="text-[#D4AF37] font-bold text-sm">A</span>
            </div>
            <div>
              <div className="text-xs text-white font-bold uppercase tracking-wide">Administrator</div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]" />
                <span className="text-[10px] uppercase text-[#FFF7D6]/40 tracking-wider">Online</span>
              </div>
            </div>
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-[#FFF7D6]/60 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        {/* Mobile Top bar */}
        <header className="h-16 border-b border-[#D4AF37]/10 flex items-center justify-between px-6 shrink-0 lg:hidden bg-[#0B0B0F]/80 backdrop-blur-md relative z-30">
          <button onClick={() => setSidebarOpen(true)} className="text-[#D4AF37] p-1">
            <Menu size={24} />
          </button>
          <span className="text-white font-bold text-sm uppercase tracking-wider">{company.name} Admin</span>
          <button onClick={handleLogout} className="text-[#FFF7D6]/40 hover:text-red-400">
            <LogOut size={20} />
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 md:p-8 lg:p-12 overflow-y-auto relative">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
