import { useState } from 'react';
import { useGlobal } from '../../context/GlobalContext';
import { v4 as uuid } from 'uuid';
import { Blocks, Plus, Edit2, Trash2, X, Check, Link as LinkIcon, FileText, CheckSquare, Type, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TYPES = ['text', 'textarea', 'link', 'file', 'checkbox'];

const TYPE_ICONS = {
  text: Type,
  textarea: FileText,
  link: LinkIcon,
  file: UploadIcon,
  checkbox: CheckSquare
};

function UploadIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
  );
}

const EMPTY_FIELD = { key: '', label: '', type: 'text' };

function FieldModal({ item, onClose, onSave }) {
  const [form, setForm] = useState(item || EMPTY_FIELD);
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!form.label.trim()) { setError('Label is required'); return; }
    const key = form.key || form.label.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
    onSave({ ...form, key });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-md bg-[#0B0B0F] border border-[#D4AF37]/30 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center px-6 py-5 border-b border-[#D4AF37]/10 bg-[#050505]">
          <h2 className="font-bold text-white tracking-tight flex items-center gap-2">
            {item ? <Edit2 className="text-[#D4AF37]" size={18} /> : <Plus className="text-[#D4AF37]" size={18} />}
            {item ? 'Modify Field Config' : 'Create Custom Field'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/5 text-[#FFF7D6]/50 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="text-[10px] font-bold text-[#FFF7D6]/50 uppercase tracking-widest mb-2 block">Display Label *</label>
            <input className="w-full bg-[#050505] border border-[#D4AF37]/20 rounded-xl py-3 px-4 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all font-light text-sm" placeholder="e.g., GitHub Profile"
              value={form.label} onChange={e => setForm(f => ({ ...f, label: e.target.value }))} />
          </div>

          <div>
            <label className="text-[10px] font-bold text-[#FFF7D6]/50 uppercase tracking-widest mb-2 block flex items-center justify-between">
              <span>System Identifier</span>
              <span className="text-gray-600 text-[8px]">(Auto-generated)</span>
            </label>
            <input className="w-full bg-[#111] border border-gray-800 rounded-xl py-2 px-4 text-gray-500 font-mono text-xs focus:outline-none" placeholder="github_profile"
              value={form.key || form.label.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')}
              onChange={e => setForm(f => ({ ...f, key: e.target.value }))} />
          </div>

          <div>
            <label className="text-[10px] font-bold text-[#FFF7D6]/50 uppercase tracking-widest mb-2 block">Data Type</label>
            <div className="relative">
              <select className="w-full bg-[#050505] border border-[#D4AF37]/20 rounded-xl py-3 pl-4 pr-10 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all font-light text-sm appearance-none cursor-pointer" 
                value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                {TYPES.map(t => <option key={t} value={t} className="bg-[#0B0B0F]">{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#D4AF37]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
          </div>

          {/* Type preview */}
          <div className="rounded-xl p-5 border border-[#D4AF37]/10 bg-[#050505]">
            <p className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest mb-4">Rendering Preview</p>
            <label className="text-[10px] font-bold text-[#FFF7D6]/50 uppercase tracking-widest mb-2 block">{form.label || 'Field Label'}</label>
            {form.type === 'textarea' ? <textarea className="w-full bg-[#111] border border-gray-800 rounded-xl py-2 px-3 text-gray-600 text-sm resize-none" rows={2} placeholder="Input..." readOnly /> :
             form.type === 'checkbox' ? (
              <div className="w-10 h-6 bg-gray-800 rounded-full relative opacity-50"><div className="w-5 h-5 bg-gray-400 rounded-full absolute top-[2px] left-[2px]"></div></div>
             ) :
             <input type={form.type === 'link' ? 'url' : form.type === 'file' ? 'file' : 'text'}
               className="w-full bg-[#111] border border-gray-800 rounded-xl py-2 px-3 text-gray-600 text-sm" placeholder={form.type === 'file' ? '' : "Input..."} readOnly />}
          </div>

          {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-xs font-semibold text-center">{error}</motion.p>}
        </div>

        <div className="flex justify-end gap-3 p-5 border-t border-[#D4AF37]/10 bg-[#050505]">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-[#FFF7D6]/50 border border-transparent hover:border-gray-800 transition-all text-xs font-bold uppercase tracking-wider">Cancel</button>
          <button onClick={handleSave} className="btn-glow text-black font-bold uppercase tracking-wider px-6 py-2.5 rounded-xl text-xs flex items-center gap-2">
            <Check size={14} /> {item ? 'Update' : 'Create'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminRequirements() {
  const { customRequirements, saveCustomRequirements } = useGlobal();
  const [modal, setModal] = useState(null);

  const handleSave = (form) => {
    if (modal === 'add') {
      saveCustomRequirements([...customRequirements, { ...form, key: form.key || uuid() }]);
    } else {
      saveCustomRequirements(customRequirements.map(r => r.key === modal.key ? form : r));
    }
    setModal(null);
  };

  const handleDelete = (key) => {
    if (window.confirm('Delete this custom field? Existing data in worker profiles will be orphaned.')) {
      saveCustomRequirements(customRequirements.filter(r => r.key !== key));
    }
  };

  return (
    <div className="max-w-4xl space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Blocks className="text-[#D4AF37]" size={28} />
            Data Schema
          </h1>
          <p className="text-[#FFF7D6]/50 mt-2 font-light max-w-xl">Configure custom attributes for personnel profiles to extend the platform's data capabilities.</p>
        </div>
        <button onClick={() => setModal('add')}
          className="btn-glow px-6 py-3 rounded-xl text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 text-black whitespace-nowrap self-start md:self-auto">
          <Plus size={16} /> Add Schema Field
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-[#D4AF37]/5 border border-[#D4AF37]/20 flex items-start gap-4">
        <div className="p-2 bg-[#D4AF37]/10 rounded-lg text-[#D4AF37]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        </div>
        <div>
          <h3 className="text-sm font-bold text-[#D4AF37] mb-1">Architecture Note</h3>
          <p className="text-[#FFF7D6]/60 text-xs leading-relaxed">Fields defined in this schema are automatically injected into the worker registration forms and exposed on their public-facing portfolio pages. Modifying keys may disconnect existing data.</p>
        </div>
      </div>

      {customRequirements.length === 0 ? (
        <div className="rounded-3xl border border-[#D4AF37]/10 bg-[#0B0B0F] p-16 text-center shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <div className="w-24 h-24 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-6">
            <Blocks className="text-[#D4AF37]" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Standard Schema Active</h2>
          <p className="text-[#FFF7D6]/50 font-light max-w-md mx-auto mb-8">You are currently using the default profile attributes. Extend functionality by adding custom fields.</p>
          <button onClick={() => setModal('add')} className="btn-glow px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest text-black inline-flex items-center gap-2">
            <Plus size={16} /> Create Custom Field
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          <AnimatePresence>
            {customRequirements.map((req, i) => {
              const Icon = TYPE_ICONS[req.type] || Type;
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  key={req.key} 
                  className="rounded-2xl border border-[#D4AF37]/10 bg-[#0B0B0F] p-6 flex items-center gap-6 group hover:border-[#D4AF37]/30 transition-all shadow-[0_5px_20px_rgba(0,0,0,0.2)]"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#050505] border border-gray-800 flex items-center justify-center text-[#FFF7D6]/50 shrink-0 group-hover:text-[#D4AF37] group-hover:border-[#D4AF37]/30 transition-all">
                    <Icon size={20} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-white font-bold text-base">{req.label}</span>
                      <span className="text-[9px] px-2 py-0.5 rounded border border-[#D4AF37]/30 text-[#D4AF37] uppercase tracking-widest bg-[#D4AF37]/5">{req.type}</span>
                    </div>
                    <span className="text-gray-500 text-xs font-mono">id: {req.key}</span>
                  </div>
                  
                  <div className="flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shrink-0">
                    <button onClick={() => setModal(req)}
                      className="p-2.5 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all" title="Edit Field">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(req.key)}
                      className="p-2.5 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all" title="Delete Field">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {modal && (
          <FieldModal item={modal === 'add' ? null : modal} onClose={() => setModal(null)} onSave={handleSave} />
        )}
      </AnimatePresence>
    </div>
  );
}
