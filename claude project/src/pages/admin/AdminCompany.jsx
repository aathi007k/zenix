import { useState } from 'react';
import { useGlobal } from '../../context/GlobalContext';
import { Building2, Save, MapPin, Phone, Mail, Link as LinkIcon } from 'lucide-react';

export default function AdminCompany() {
  const { company, saveCompany } = useGlobal();
  const [form, setForm] = useState({ ...company });
  const [saved, setSaved] = useState(false);

  const handleChange = (field, value) => setForm(f => ({ ...f, [field]: value }));
  const handleSocial = (platform, value) => setForm(f => ({ ...f, socialLinks: { ...f.socialLinks, [platform]: value } }));

  const handleSubmit = (e) => {
    e.preventDefault();
    saveCompany(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <Building2 className="text-[#D4AF37]" size={28} />
          Corporate Identity
        </h1>
        <p className="text-[#FFF7D6]/50 mt-2 font-light">Manage your public facing corporate profile and contact details.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic */}
        <div className="rounded-3xl bg-[#0B0B0F] border border-[#D4AF37]/10 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <h2 className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em] border-b border-[#D4AF37]/10 pb-4 mb-6">Core Information</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-[#FFF7D6]/70 uppercase tracking-wider mb-2">Company Name</label>
              <input type="text" className="w-full bg-[#050505] border border-[#D4AF37]/20 rounded-xl py-3 px-4 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all font-light" placeholder="Zenixoft"
                value={form.name || ''} onChange={e => handleChange('name', e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#FFF7D6]/70 uppercase tracking-wider mb-2">Tagline</label>
              <input type="text" className="w-full bg-[#050505] border border-[#D4AF37]/20 rounded-xl py-3 px-4 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all font-light" placeholder="Premium Digital Excellence."
                value={form.tagline || ''} onChange={e => handleChange('tagline', e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#FFF7D6]/70 uppercase tracking-wider mb-2">Executive Summary / About</label>
              <textarea className="w-full bg-[#050505] border border-[#D4AF37]/20 rounded-xl py-3 px-4 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all font-light resize-none" rows={5} placeholder="Describe the corporate vision..."
                value={form.about || ''} onChange={e => handleChange('about', e.target.value)} />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="rounded-3xl bg-[#0B0B0F] border border-[#D4AF37]/10 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <h2 className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em] border-b border-[#D4AF37]/10 pb-4 mb-6">Contact Channels</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-[#FFF7D6]/70 uppercase tracking-wider mb-2">Official Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FFF7D6]/30" size={18} />
                <input type="email" className="w-full bg-[#050505] border border-[#D4AF37]/20 rounded-xl py-3 pl-12 pr-4 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all font-light" placeholder="contact@zenixoft.com"
                  value={form.email || ''} onChange={e => handleChange('email', e.target.value)} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#FFF7D6]/70 uppercase tracking-wider mb-2">Direct Line</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FFF7D6]/30" size={18} />
                <input type="text" className="w-full bg-[#050505] border border-[#D4AF37]/20 rounded-xl py-3 pl-12 pr-4 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all font-light" placeholder="+1 (555) 000-0000"
                  value={form.phone || ''} onChange={e => handleChange('phone', e.target.value)} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#FFF7D6]/70 uppercase tracking-wider mb-2">Headquarters</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FFF7D6]/30" size={18} />
                <input type="text" className="w-full bg-[#050505] border border-[#D4AF37]/20 rounded-xl py-3 pl-12 pr-4 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all font-light" placeholder="123 Luxury Ave, Tech District"
                  value={form.address || ''} onChange={e => handleChange('address', e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="rounded-3xl bg-[#0B0B0F] border border-[#D4AF37]/10 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <h2 className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em] border-b border-[#D4AF37]/10 pb-4 mb-6">Digital Presence</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['linkedin','twitter','instagram','facebook'].map(p => (
              <div key={p}>
                <label className="block text-xs font-semibold text-[#FFF7D6]/70 uppercase tracking-wider mb-2">{p}</label>
                <div className="relative">
                  <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FFF7D6]/30" size={16} />
                  <input type="url" className="w-full bg-[#050505] border border-[#D4AF37]/20 rounded-xl py-3 pl-11 pr-4 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all font-light text-sm" placeholder={`https://${p}.com/zenixoft`}
                    value={form.socialLinks?.[p] || ''} onChange={e => handleSocial(p, e.target.value)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button type="submit"
          className="btn-glow px-8 py-4 rounded-xl flex items-center justify-center gap-2 w-full md:w-auto uppercase tracking-widest font-bold text-sm">
          {saved ? '✓ Information Updated' : <><Save size={18} /> Update Profile</>}
        </button>
      </form>
    </div>
  );
}
