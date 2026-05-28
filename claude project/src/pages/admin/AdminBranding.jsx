import { useState, useRef } from 'react';
import { useGlobal } from '../../context/GlobalContext';
import { fileToBase64 } from '../../utils/storage';
import { Fingerprint, Upload, X, Save, Palette } from 'lucide-react';

export default function AdminBranding() {
  const { company, saveCompany } = useGlobal();
  const [logo, setLogo] = useState(company.logo || null);
  const [color, setColor] = useState(company.primaryColor || '#D4AF37');
  const [saved, setSaved] = useState(false);
  const fileRef = useRef();

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const b64 = await fileToBase64(file);
    setLogo(b64);
  };

  const handleSave = () => {
    saveCompany({ ...company, logo, primaryColor: color });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <Fingerprint className="text-[#D4AF37]" size={28} />
          Brand Assets
        </h1>
        <p className="text-[#FFF7D6]/50 mt-2 font-light">Manage visual identity and corporate branding.</p>
      </div>

      <div className="space-y-8">
        {/* Logo Upload */}
        <div className="rounded-3xl bg-[#0B0B0F] border border-[#D4AF37]/10 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <h2 className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em] border-b border-[#D4AF37]/10 pb-4 mb-8">Corporate Logo</h2>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <div className="w-32 h-32 rounded-2xl bg-[#050505] border border-[#D4AF37]/20 flex items-center justify-center overflow-hidden shadow-[inset_0_0_20px_rgba(212,175,55,0.05)] relative group">
              {logo ? (
                <>
                  <img src={logo} alt="Logo preview" className="w-full h-full object-contain p-4" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <button onClick={() => setLogo(null)} className="text-red-400 hover:text-red-300 p-2">
                      <X size={24} />
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-[#D4AF37]/20">
                  <Fingerprint size={48} />
                </div>
              )}
            </div>
            
            <div>
              <p className="text-white font-medium mb-2">Upload High-Res Asset</p>
              <p className="text-[#FFF7D6]/40 text-xs mb-6 max-w-sm leading-relaxed">
                Provide a high quality transparent PNG or SVG for optimal display across all backgrounds. Maximum size: 2MB.
              </p>
              
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
              <button onClick={() => fileRef.current?.click()}
                className="btn-outline px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest font-bold inline-flex items-center gap-2">
                <Upload size={16} /> Select File
              </button>
            </div>
          </div>
        </div>

        {/* Color Picker */}
        <div className="rounded-3xl bg-[#0B0B0F] border border-[#D4AF37]/10 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <h2 className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em] border-b border-[#D4AF37]/10 pb-4 mb-8 flex items-center gap-2">
            <Palette size={16} /> Theme Configuration
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-10">
            <div>
              <div className="relative mb-4">
                <input type="color" value={color} onChange={e => setColor(e.target.value)}
                  className="w-24 h-24 rounded-2xl cursor-pointer border-0 bg-transparent p-0" 
                  style={{
                    WebkitAppearance: 'none',
                    border: 'none',
                  }}
                />
                <div className="absolute inset-0 rounded-2xl pointer-events-none border border-white/10 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]" />
              </div>
              <p className="text-white font-mono text-center tracking-widest uppercase">{color}</p>
            </div>
            
            <div className="flex-1">
              <p className="text-[#FFF7D6]/60 text-sm mb-4 font-light">Selected Accent Color</p>
              <p className="text-[#FFF7D6]/40 text-xs mb-6 max-w-sm leading-relaxed">
                This accent color drives primary actions, highlights, and glowing elements across the platform.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {['#D4AF37','#F5D76E','#B8860B','#E5E4E2','#1E293B','#0F172A'].map(c => (
                  <button key={c} onClick={() => setColor(c)}
                    className="w-8 h-8 rounded-full border border-white/20 transition-all hover:scale-110 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                    style={{ 
                      background: c, 
                      borderColor: color === c ? '#fff' : 'rgba(255,255,255,0.2)',
                      boxShadow: color === c ? `0 0 15px ${c}` : ''
                    }} 
                  />
                ))}
              </div>

              {/* Live preview */}
              <div className="p-6 rounded-2xl bg-[#050505] border border-white/5 inline-block">
                <p className="text-[#FFF7D6]/30 text-[10px] uppercase tracking-widest mb-4">Component Preview</p>
                <button className="text-black font-bold tracking-widest uppercase text-xs px-8 py-3 rounded-xl transition-all"
                  style={{ background: color, boxShadow: `0 0 20px ${color}40` }}>
                  Execute Action
                </button>
              </div>
            </div>
          </div>
        </div>

        <button onClick={handleSave}
          className="btn-glow px-8 py-4 rounded-xl flex items-center justify-center gap-2 w-full md:w-auto uppercase tracking-widest font-bold text-sm">
          {saved ? '✓ Assets Updated' : <><Save size={18} /> Update Assets</>}
        </button>
      </div>
    </div>
  );
}
