import { Link } from 'react-router-dom';
import { useGlobal } from '../../context/GlobalContext';
import { Users, Briefcase, MessageSquareQuote, FileText, Settings, Activity, ArrowUpRight, BarChart3, Fingerprint, LockKeyhole } from 'lucide-react';
import { motion } from 'framer-motion';

function StatCard({ icon: Icon, label, value, to, color = 'gold', delay = 0 }) {
  const colors = {
    gold: 'from-[#D4AF37]/20 to-[#B8860B]/10 border-[#D4AF37]/20 text-[#D4AF37]',
    light: 'from-[#FFF7D6]/20 to-[#FFF7D6]/5 border-[#FFF7D6]/20 text-[#FFF7D6]',
    dark: 'from-[#222]/50 to-[#111]/50 border-gray-800 text-gray-300',
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Link 
        to={to} 
        className={`block relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br ${colors[color]} border backdrop-blur-md group hover:scale-[1.02] transition-all duration-300`}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[40px] group-hover:bg-white/10 transition-all pointer-events-none" />
        <div className="w-12 h-12 rounded-xl bg-black/40 flex items-center justify-center mb-4 border border-white/10 group-hover:border-white/20 transition-all">
          <Icon size={24} className="opacity-80" />
        </div>
        <div className="text-3xl font-bold text-white mb-1 tracking-tight">{value}</div>
        <div className="text-xs uppercase tracking-wider opacity-70 font-semibold">{label}</div>
      </Link>
    </motion.div>
  );
}

function QuickLink({ to, icon: Icon, label, desc, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Link 
        to={to} 
        className="flex items-center gap-5 p-4 rounded-xl hover:bg-[#D4AF37]/10 border border-transparent hover:border-[#D4AF37]/20 transition-all group"
      >
        <div className="w-12 h-12 rounded-xl bg-[#111] border border-gray-800 flex items-center justify-center shrink-0 group-hover:border-[#D4AF37]/30 transition-all">
          <Icon size={20} className="text-[#D4AF37]" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors">{label}</div>
          <div className="text-xs text-[#FFF7D6]/40 font-light">{desc}</div>
        </div>
        <ArrowUpRight size={18} className="text-gray-600 group-hover:text-[#D4AF37] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
      </Link>
    </motion.div>
  );
}

export default function AdminDashboard() {
  const { workers, testimonials, customRequirements, stats } = useGlobal();

  const quickLinks = [
    { to: '/admin/workers', icon: Users, label: 'Manage Personnel', desc: 'Add, edit or remove team members' },
    { to: '/admin/testimonials', icon: MessageSquareQuote, label: 'Client Feedback', desc: 'Review and publish testimonials' },
    { to: '/admin/company', icon: Briefcase, label: 'Corporate Identity', desc: 'Update contact and about info' },
    { to: '/admin/branding', icon: Fingerprint, label: 'Brand Assets', desc: 'Logo and visual customization' },
    { to: '/admin/stats', icon: BarChart3, label: 'Performance Metrics', desc: 'Update public statistics' },
    { to: '/admin/terms', icon: LockKeyhole, label: 'Legal Documentation', desc: 'Edit terms and privacy policies' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[2rem] p-10 bg-[#0B0B0F] border border-[#D4AF37]/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D4AF37]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            System Online
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Executive Dashboard</h1>
          <p className="text-[#FFF7D6]/60 text-lg max-w-2xl font-light">
            Centralized control for platform management, corporate identity, and performance metrics.
          </p>
        </div>
      </motion.div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Users} label="Total Personnel" value={workers.length} to="/admin/workers" color="gold" delay={0.1} />
        <StatCard icon={Activity} label="Active Projects" value={workers.reduce((a, w) => a + (w.projects?.length || 0), 0)} to="/admin/workers" color="light" delay={0.2} />
        <StatCard icon={MessageSquareQuote} label="Client Reviews" value={testimonials.length} to="/admin/testimonials" color="gold" delay={0.3} />
        <StatCard icon={Settings} label="Custom Configs" value={customRequirements.length} to="/admin/requirements" color="dark" delay={0.4} />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Live Site Stats */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-1 rounded-[2rem] bg-[#0B0B0F] border border-[#D4AF37]/10 p-8 flex flex-col"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-bold text-white uppercase tracking-wider text-sm flex items-center gap-2">
              <BarChart3 size={16} className="text-[#D4AF37]" />
              Public Metrics
            </h2>
            <Link to="/admin/stats" className="text-[#D4AF37] text-xs font-semibold hover:underline">Configure</Link>
          </div>
          
          <div className="flex-1 flex flex-col justify-center space-y-6">
            {[
              { label: 'Elite Clients', val: stats.clients },
              { label: 'Projects Delivered', val: stats.projects },
              { label: 'Years of Mastery', val: stats.years },
              { label: 'Global Experts', val: stats.teamMembers },
            ].map((s, i) => (
              <div key={s.label} className="flex justify-between items-end border-b border-gray-800 pb-3 group">
                <div className="text-[#FFF7D6]/50 text-xs uppercase tracking-widest">{s.label}</div>
                <div className="text-2xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">{s.val}+</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-2 rounded-[2rem] bg-[#0B0B0F] border border-[#D4AF37]/10 overflow-hidden flex flex-col"
        >
          <div className="px-8 py-6 border-b border-[#D4AF37]/10 bg-black/20">
            <h2 className="font-bold text-white uppercase tracking-wider text-sm flex items-center gap-2">
              <Settings size={16} className="text-[#D4AF37]" />
              Command Center
            </h2>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {quickLinks.map((l, i) => <QuickLink key={l.to} {...l} delay={0.7 + i * 0.05} />)}
          </div>
        </motion.div>
      </div>

      {/* View site link */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center pt-8"
      >
        <Link to="/" target="_blank"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111] border border-gray-800 text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all">
          Launch Public Portal
          <ArrowUpRight size={14} />
        </Link>
      </motion.div>
    </div>
  );
}
