import { useState } from 'react';
import { useGlobal } from '../../context/GlobalContext';
import { BarChart3, Users, Briefcase, Calendar, Activity, CheckCircle, Save } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminStats() {
  const { stats, saveStats } = useGlobal();
  const [form, setForm] = useState({ ...stats });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveStats({
      clients: Number(form.clients),
      projects: Number(form.projects),
      years: Number(form.years),
      teamMembers: Number(form.teamMembers),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const fields = [
    { key: 'clients', label: 'Elite Clients', icon: Users, desc: 'Global luxury brand partners' },
    { key: 'projects', label: 'Projects Delivered', icon: Briefcase, desc: 'High-end successful deployments' },
    { key: 'years', label: 'Years of Mastery', icon: Calendar, desc: 'Decades of industry dominance' },
    { key: 'teamMembers', label: 'Global Experts', icon: Activity, desc: 'World-class personnel' },
  ];

  return (
    <div className="max-w-4xl space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <BarChart3 className="text-[#D4AF37]" size={28} />
          Performance Metrics
        </h1>
        <p className="text-[#FFF7D6]/50 mt-2 font-light">Configure the live data points showcased on the global landing page.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="rounded-3xl bg-[#0B0B0F] border border-[#D4AF37]/10 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map(({ key, label, icon: Icon, desc }) => (
              <div key={key} className="bg-[#050505] p-6 rounded-2xl border border-[#D4AF37]/10 flex flex-col gap-4 group hover:border-[#D4AF37]/30 transition-all">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#111] border border-[#D4AF37]/20 flex items-center justify-center group-hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37]/40 transition-all">
                    <Icon className="text-[#D4AF37]" size={24} />
                  </div>
                  <input
                    type="number"
                    min="0"
                    max="99999"
                    className="w-24 bg-transparent border-b-2 border-gray-800 text-right text-2xl font-bold text-white focus:border-[#D4AF37] focus:outline-none transition-all pb-1 tracking-wider"
                    value={form[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1">{label}</label>
                  <p className="text-[#FFF7D6]/40 text-xs font-light">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="rounded-3xl bg-[#050505] border border-[#D4AF37]/10 p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-[60px] pointer-events-none" />
          
          <div className="flex items-center gap-2 mb-8">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <p className="text-[#FFF7D6]/50 text-[10px] uppercase tracking-[0.2em] font-bold">Public View Simulation</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
            {fields.map(({ key, label }) => (
              <div key={key} className="relative">
                <div className="text-4xl md:text-5xl font-bold gradient-text-gold tracking-tighter mb-2">{Number(form[key]).toLocaleString()}+</div>
                <div className="text-[#FFF7D6]/50 text-[10px] font-bold uppercase tracking-widest">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn-glow px-8 py-4 rounded-xl flex items-center justify-center gap-2 w-full md:w-auto uppercase tracking-widest font-bold text-sm text-black">
          {saved ? <><CheckCircle size={18} /> Metrics Synchronized</> : <><Save size={18} /> Update Metrics</>}
        </button>
      </form>
    </div>
  );
}
