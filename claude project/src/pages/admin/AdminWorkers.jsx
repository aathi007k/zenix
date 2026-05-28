import { useState, useRef } from 'react';
import { useGlobal } from '../../context/GlobalContext';
import { fileToBase64 } from '../../utils/storage';
import { v4 as uuid } from 'uuid';
import { Users, Search, Plus, Edit2, Trash2, X, Upload, Check, Link as LinkIcon, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EMPTY_WORKER = {
  name: '', role: '', bio: '', photo: null, resume: null,
  skills: [], portfolio: [], projects: [],
  contact: { email: '', phone: '' },
  customFields: {},
};

const EMPTY_PROJECT = { id: '', title: '', description: '', techStack: [], link: '', image: null };

// ── Tag Input ──────────────────────────────────────────────────────────────────
function TagInput({ tags = [], onChange, placeholder }) {
  const [input, setInput] = useState('');
  const add = () => {
    const v = input.trim();
    if (v && !tags.includes(v)) { onChange([...tags, v]); setInput(''); }
  };
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-3">
        <AnimatePresence>
          {tags.map(t => (
            <motion.span 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              key={t} 
              className="px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-lg text-[#D4AF37] text-xs font-semibold flex items-center gap-2"
            >
              {t}
              <button type="button" onClick={() => onChange(tags.filter(x => x !== t))} className="hover:text-red-400 transition-colors"><X size={12} /></button>
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
      <div className="flex gap-2">
        <input className="flex-1 bg-[#050505] border border-[#D4AF37]/20 rounded-xl py-2.5 px-4 text-white text-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all font-light" placeholder={placeholder || 'Add tag...'} value={input}
          onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), add())} />
        <button type="button" onClick={add}
          className="px-5 py-2.5 rounded-xl border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 text-sm font-bold uppercase tracking-wider transition-all">Add</button>
      </div>
    </div>
  );
}

// ── Projects Sub-form ──────────────────────────────────────────────────────────
function ProjectsEditor({ projects = [], onChange }) {
  const [adding, setAdding] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState(EMPTY_PROJECT);
  const imgRef = useRef();

  const open = (proj = null, idx = null) => {
    setForm(proj ? { ...proj } : { ...EMPTY_PROJECT, id: uuid() });
    setEditIdx(idx);
    setAdding(true);
  };

  const handleImg = async (e) => {
    const file = e.target.files?.[0];
    if (file) { const b64 = await fileToBase64(file); setForm(f => ({ ...f, image: b64 })); }
  };

  const save = () => {
    if (!form.title) return;
    if (editIdx !== null) {
      const updated = [...projects]; updated[editIdx] = form; onChange(updated);
    } else {
      onChange([...projects, form]);
    }
    setAdding(false); setForm(EMPTY_PROJECT); setEditIdx(null);
  };

  const remove = (i) => onChange(projects.filter((_, idx) => idx !== i));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em]">Portfolio Projects ({projects.length})</label>
        <button type="button" onClick={() => open()}
          className="text-xs px-4 py-2 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all font-semibold uppercase tracking-wider flex items-center gap-2">
          <Plus size={14} /> Add Project
        </button>
      </div>

      {projects.length > 0 && (
        <div className="space-y-3 mb-4">
          {projects.map((p, i) => (
            <div key={p.id || i} className="flex items-center justify-between p-4 rounded-xl border border-[#D4AF37]/20 bg-[#050505]">
              <div>
                <span className="text-white text-sm font-semibold">{p.title}</span>
                {p.techStack?.length > 0 && <span className="text-[#FFF7D6]/50 text-xs ml-3 font-light">{p.techStack.slice(0,3).join(', ')}</span>}
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => open(p, i)}
                  className="p-2 rounded-lg bg-[#D4AF37]/5 text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-colors"><Edit2 size={14} /></button>
                <button type="button" onClick={() => remove(i)}
                  className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {adding && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-2xl border border-[#D4AF37]/30 p-6 bg-[#0B0B0F] space-y-5 overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="text-[10px] text-[#FFF7D6]/50 uppercase tracking-widest mb-2 block">Project Title *</label>
                <input className="w-full bg-[#050505] border border-[#D4AF37]/20 rounded-xl py-2.5 px-4 text-white text-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all" placeholder="Enter project name" value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
              </div>
              <div>
                <label className="text-[10px] text-[#FFF7D6]/50 uppercase tracking-widest mb-2 block">Live URL</label>
                <input className="w-full bg-[#050505] border border-[#D4AF37]/20 rounded-xl py-2.5 px-4 text-white text-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all" placeholder="https://..." value={form.link}
                  onChange={e => setForm(f => ({ ...f, link: e.target.value }))} />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-[#FFF7D6]/50 uppercase tracking-widest mb-2 block">Description</label>
              <textarea className="w-full bg-[#050505] border border-[#D4AF37]/20 rounded-xl py-2.5 px-4 text-white text-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all resize-none" rows={3} placeholder="Project overview..."
                value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            </div>
            <div>
              <label className="text-[10px] text-[#FFF7D6]/50 uppercase tracking-widest mb-2 block">Technologies Used</label>
              <TagInput tags={form.techStack} onChange={v => setForm(f => ({ ...f, techStack: v }))} placeholder="React, Node.js, etc..." />
            </div>
            <div>
              <label className="text-[10px] text-[#FFF7D6]/50 uppercase tracking-widest mb-2 block">Featured Image</label>
              <input ref={imgRef} type="file" accept="image/*" className="hidden" onChange={handleImg} />
              {form.image ? (
                <div className="flex items-center gap-4">
                  <img src={form.image} alt="" className="h-20 w-32 rounded-lg object-cover border border-[#D4AF37]/30" />
                  <button type="button" onClick={() => setForm(f => ({ ...f, image: null }))} className="text-red-400 text-xs font-semibold uppercase tracking-wider hover:underline">Remove</button>
                </div>
              ) : (
                <button type="button" onClick={() => imgRef.current?.click()}
                  className="px-5 py-3 rounded-xl border border-[#D4AF37]/20 text-[#D4AF37] bg-[#050505] text-xs font-bold uppercase tracking-wider hover:bg-[#D4AF37]/10 transition-all flex items-center gap-2">
                  <Upload size={14} /> Upload Image
                </button>
              )}
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-[#D4AF37]/10">
              <button type="button" onClick={() => { setAdding(false); setForm(EMPTY_PROJECT); setEditIdx(null); }}
                className="px-5 py-2.5 rounded-xl border border-gray-800 text-[#FFF7D6]/50 hover:text-white text-xs font-bold uppercase tracking-wider transition-all">Cancel</button>
              <button type="button" onClick={save}
                className="btn-glow px-6 py-2.5 rounded-xl text-black text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                <Check size={14} /> Save Project
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Worker Modal ───────────────────────────────────────────────────────────────
function WorkerModal({ worker, onClose, onSave, customRequirements }) {
  const [form, setForm] = useState(worker ? { ...worker } : { ...EMPTY_WORKER });
  const photoRef = useRef();
  const resumeRef = useRef();
  const portfolioRef = useRef();
  const [tab, setTab] = useState('basic');

  const upPhoto = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const b64 = await fileToBase64(f);
    setForm(x => ({ ...x, photo: b64 }));
  };
  const upResume = async (e) => { const f = e.target.files?.[0]; if (f) { const b64 = await fileToBase64(f); setForm(x => ({ ...x, resume: b64 })); } };
  const upPortfolio = async (e) => {
    const files = Array.from(e.target.files || []);
    const b64s = await Promise.all(files.map(fileToBase64));
    setForm(x => ({ ...x, portfolio: [...(x.portfolio || []), ...b64s] }));
  };
  const removePortfolio = (i) => setForm(x => ({ ...x, portfolio: x.portfolio.filter((_, idx) => idx !== i) }));
  const setCustomField = (key, val) => setForm(x => ({ ...x, customFields: { ...x.customFields, [key]: val } }));

  const TABS = [
    { id: 'basic', label: 'Identity' },
    { id: 'media', label: 'Assets' },
    { id: 'projects', label: 'Portfolio' },
    ...(customRequirements?.length ? [{ id: 'custom', label: 'Custom' }] : []),
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-3xl max-h-[90vh] flex flex-col bg-[#0B0B0F] border border-[#D4AF37]/30 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center px-8 py-6 border-b border-[#D4AF37]/10 bg-[#050505]">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-3">
            {worker ? <Edit2 className="text-[#D4AF37]" size={20} /> : <Plus className="text-[#D4AF37]" size={20} />}
            {worker ? 'Modify Profile' : 'Register Personnel'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/5 text-[#FFF7D6]/50 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex px-8 border-b border-[#D4AF37]/10 bg-[#050505]">
          {TABS.map(t => (
            <button key={t.id} type="button" onClick={() => setTab(t.id)}
              className={`px-6 py-4 text-xs font-bold uppercase tracking-wider transition-all relative ${tab === t.id ? 'text-[#D4AF37]' : 'text-[#FFF7D6]/40 hover:text-white'}`}>
              {t.label}
              {tab === t.id && (
                <motion.div layoutId="modal-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37]" />
              )}
            </button>
          ))}
        </div>

        <div className="overflow-y-auto flex-1 p-8 custom-scrollbar">
          {/* Basic Info */}
          {tab === 'basic' && (
            <div className="space-y-6 animate-fade-in">
              {/* Photo Upload — Front and center */}
              <div className="flex items-center gap-6 p-5 rounded-2xl bg-[#050505] border border-[#D4AF37]/10">
                <div 
                  className="w-24 h-24 rounded-2xl border-2 border-dashed border-[#D4AF37]/30 bg-[#111] flex items-center justify-center overflow-hidden cursor-pointer shrink-0 group hover:border-[#D4AF37]/60 transition-all"
                  onClick={() => photoRef.current?.click()}
                >
                  {form.photo ? (
                    <div className="relative w-full h-full">
                      <img src={form.photo} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Camera className="text-white" size={20} />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <Camera className="text-[#D4AF37]/40" size={24} />
                      <span className="text-[8px] text-[#FFF7D6]/30 uppercase tracking-wider">Upload</span>
                    </div>
                  )}
                </div>
                <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={upPhoto} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.15em] mb-1">Profile Photo</p>
                  <p className="text-[#FFF7D6]/40 text-xs font-light leading-relaxed">Click the frame to upload a headshot. Recommended: square image, 400×400px minimum.</p>
                  {form.photo && (
                    <button type="button" onClick={() => setForm(f => ({ ...f, photo: null }))}
                      className="mt-2 text-red-400 text-[10px] font-bold uppercase tracking-wider hover:underline">Remove Photo</button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-bold text-[#FFF7D6]/50 uppercase tracking-widest mb-2 block">Full Name *</label>
                  <input className="w-full bg-[#050505] border border-[#D4AF37]/20 rounded-xl py-3 px-4 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all font-light" placeholder="e.g. Jane Doe" value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[#FFF7D6]/50 uppercase tracking-widest mb-2 block">Official Title *</label>
                  <input className="w-full bg-[#050505] border border-[#D4AF37]/20 rounded-xl py-3 px-4 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all font-light" placeholder="e.g. Senior Architect" value={form.role}
                    onChange={e => setForm(f => ({ ...f, role: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-[#FFF7D6]/50 uppercase tracking-widest mb-2 block">Professional Biography</label>
                <textarea className="w-full bg-[#050505] border border-[#D4AF37]/20 rounded-xl py-3 px-4 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all font-light resize-none" rows={4} placeholder="Summarize expertise and background..."
                  value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} />
              </div>
              <div>
                <label className="text-[10px] font-bold text-[#FFF7D6]/50 uppercase tracking-widest mb-2 block">Core Competencies</label>
                <TagInput tags={form.skills || []} onChange={v => setForm(f => ({ ...f, skills: v }))} placeholder="Add specific skills..." />
              </div>
              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#D4AF37]/10">
                <div>
                  <label className="text-[10px] font-bold text-[#FFF7D6]/50 uppercase tracking-widest mb-2 block">Corporate Email</label>
                  <input className="w-full bg-[#050505] border border-[#D4AF37]/20 rounded-xl py-3 px-4 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all font-light" type="email" placeholder="email@company.com"
                    value={form.contact?.email || ''} onChange={e => setForm(f => ({ ...f, contact: { ...f.contact, email: e.target.value } }))} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[#FFF7D6]/50 uppercase tracking-widest mb-2 block">Direct Line</label>
                  <input className="w-full bg-[#050505] border border-[#D4AF37]/20 rounded-xl py-3 px-4 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all font-light" placeholder="+1 (555) 000-0000"
                    value={form.contact?.phone || ''} onChange={e => setForm(f => ({ ...f, contact: { ...f.contact, phone: e.target.value } }))} />
                </div>
              </div>
            </div>
          )}

          {/* Media */}
          {tab === 'media' && (
            <div className="space-y-8 animate-fade-in">
              {/* Photo */}
              <div className="bg-[#050505] p-6 rounded-2xl border border-[#D4AF37]/10">
                <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em] mb-4 block">Headshot Portrait</label>
                <div className="flex items-center gap-6">
                  <div className="w-28 h-28 rounded-full border-2 border-[#D4AF37]/30 bg-[#111] flex items-center justify-center overflow-hidden cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.1)] group"
                    onClick={() => photoRef.current?.click()}>
                    {form.photo ? (
                      <div className="relative w-full h-full">
                        <img src={form.photo} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Camera className="text-white" size={24} />
                        </div>
                      </div>
                    ) : (
                      <Camera className="text-[#D4AF37]/30" size={32} />
                    )}
                  </div>
                  <div>
                    <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={upPhoto} />
                    <button type="button" onClick={() => photoRef.current?.click()}
                      className="px-5 py-2.5 rounded-xl border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-wider hover:bg-[#D4AF37]/10 transition-all mb-3 block">
                      Upload Image
                    </button>
                    {form.photo && <button type="button" onClick={() => setForm(f => ({ ...f, photo: null }))}
                      className="text-red-400 text-xs font-bold uppercase tracking-wider hover:underline block">Remove Asset</button>}
                  </div>
                </div>
              </div>

              {/* Resume */}
              <div className="bg-[#050505] p-6 rounded-2xl border border-[#D4AF37]/10">
                <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em] mb-4 block">Curriculum Vitae (PDF)</label>
                <input ref={resumeRef} type="file" accept=".pdf" className="hidden" onChange={upResume} />
                {form.resume ? (
                  <div className="flex items-center justify-between p-4 rounded-xl border border-green-500/30 bg-green-500/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center"><Check size={14} className="text-green-500" /></div>
                      <span className="text-green-500 font-semibold text-sm">Document Attached</span>
                    </div>
                    <button type="button" onClick={() => setForm(f => ({ ...f, resume: null }))}
                      className="text-red-400 text-xs font-bold uppercase tracking-wider hover:underline">Remove</button>
                  </div>
                ) : (
                  <button type="button" onClick={() => resumeRef.current?.click()}
                    className="w-full py-8 rounded-xl border border-dashed border-[#D4AF37]/30 text-[#FFF7D6]/50 hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 hover:border-[#D4AF37]/50 transition-all flex flex-col items-center gap-2">
                    <Upload size={24} />
                    <span className="text-sm font-semibold tracking-wider uppercase">Select PDF Document</span>
                  </button>
                )}
              </div>

              {/* Portfolio */}
              <div className="bg-[#050505] p-6 rounded-2xl border border-[#D4AF37]/10">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em]">Gallery Assets ({form.portfolio?.length || 0})</label>
                  <button type="button" onClick={() => portfolioRef.current?.click()}
                    className="text-xs px-3 py-1.5 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all font-semibold uppercase tracking-wider">
                    Add Media
                  </button>
                </div>
                <input ref={portfolioRef} type="file" accept="image/*" multiple className="hidden" onChange={upPortfolio} />
                
                {form.portfolio?.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mt-4">
                    {form.portfolio.map((img, i) => (
                      <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-[#D4AF37]/20 group">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button type="button" onClick={() => removePortfolio(i)}
                            className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"><X size={14} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center border border-dashed border-gray-800 rounded-xl mt-4">
                    <p className="text-[#FFF7D6]/30 text-sm font-light">No gallery images uploaded.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Projects */}
          {tab === 'projects' && (
            <div className="animate-fade-in">
              <ProjectsEditor projects={form.projects || []} onChange={v => setForm(f => ({ ...f, projects: v }))} />
            </div>
          )}

          {/* Custom Fields */}
          {tab === 'custom' && customRequirements?.length > 0 && (
            <div className="space-y-6 animate-fade-in bg-[#050505] p-8 rounded-2xl border border-[#D4AF37]/10">
              {customRequirements.map(req => (
                <div key={req.key}>
                  <label className="text-[10px] font-bold text-[#FFF7D6]/50 uppercase tracking-widest mb-2 block">{req.label}</label>
                  {req.type === 'text' && (
                    <input className="w-full bg-[#0B0B0F] border border-[#D4AF37]/20 rounded-xl py-3 px-4 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all font-light" value={form.customFields?.[req.key] || ''}
                      onChange={e => setCustomField(req.key, e.target.value)} />
                  )}
                  {req.type === 'textarea' && (
                    <textarea className="w-full bg-[#0B0B0F] border border-[#D4AF37]/20 rounded-xl py-3 px-4 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all font-light resize-none" rows={3}
                      value={form.customFields?.[req.key] || ''}
                      onChange={e => setCustomField(req.key, e.target.value)} />
                  )}
                  {req.type === 'link' && (
                    <div className="relative">
                      <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FFF7D6]/30" size={16} />
                      <input className="w-full bg-[#0B0B0F] border border-[#D4AF37]/20 rounded-xl py-3 pl-11 pr-4 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all font-light" type="url" placeholder="https://..."
                        value={form.customFields?.[req.key] || ''}
                        onChange={e => setCustomField(req.key, e.target.value)} />
                    </div>
                  )}
                  {req.type === 'checkbox' && (
                    <label className="flex items-center gap-3 cursor-pointer mt-2">
                      <div className="relative flex items-center">
                        <input type="checkbox" className="peer sr-only"
                          checked={!!form.customFields?.[req.key]}
                          onChange={e => setCustomField(req.key, e.target.checked)} />
                        <div className="w-10 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
                      </div>
                      <span className="text-white text-sm font-medium tracking-wide">Enabled</span>
                    </label>
                  )}
                  {req.type === 'file' && (
                    <input type="file" className="block w-full text-sm text-[#FFF7D6]/50 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-wider file:bg-[#D4AF37]/10 file:text-[#D4AF37] hover:file:bg-[#D4AF37]/20 file:transition-all"
                      onChange={async e => { const b64 = await fileToBase64(e.target.files[0]); setCustomField(req.key, b64); }} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4 p-6 border-t border-[#D4AF37]/20 bg-[#050505]">
          <button type="button" onClick={onClose}
            className="px-6 py-3 rounded-xl text-[#FFF7D6]/50 hover:text-white border border-transparent hover:border-gray-800 transition-all text-xs font-bold uppercase tracking-widest">Cancel</button>
          <button type="button" onClick={() => { if (form.name && form.role) onSave(form); }}
            className={`btn-glow px-8 py-3 rounded-xl text-black text-xs font-bold uppercase tracking-widest ${(form.name && form.role) ? '' : 'opacity-50 cursor-not-allowed'}`}>
            {worker ? 'Save Changes' : 'Register Profile'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function AdminWorkers() {
  const { workers, createWorker, editWorker, removeWorker, customRequirements } = useGlobal();
  const [modal, setModal] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = workers.filter(w =>
    w.name?.toLowerCase().includes(search.toLowerCase()) ||
    w.role?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (form) => {
    if (modal === 'add') createWorker({ ...form, id: uuid() });
    else editWorker(modal.id, form);
    setModal(null);
  };

  const handleDelete = (w) => {
    if (window.confirm(`Delete profile for ${w.name}? This action cannot be reversed.`)) removeWorker(w.id);
  };

  return (
    <div className="max-w-6xl animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Users className="text-[#D4AF37]" size={28} />
            Personnel Registry
          </h1>
          <p className="text-[#FFF7D6]/50 mt-2 font-light">Managing {workers.length} active corporate profiles.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FFF7D6]/30" size={16} />
            <input className="w-full sm:w-64 bg-[#0B0B0F] border border-[#D4AF37]/20 rounded-xl py-3 pl-11 pr-4 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all font-light text-sm" placeholder="Search roster..."
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button onClick={() => setModal('add')}
            className="btn-glow px-6 py-3 rounded-xl text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 text-black whitespace-nowrap">
            <Plus size={16} /> Register Profile
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-[#D4AF37]/10 bg-[#0B0B0F] p-16 text-center shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          {workers.length === 0 ? (
            <>
              <div className="w-24 h-24 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-6">
                <Users className="text-[#D4AF37]" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Database Empty</h2>
              <p className="text-[#FFF7D6]/50 font-light max-w-md mx-auto mb-8">Begin constructing the corporate roster by registering your first personnel profile.</p>
              <button onClick={() => setModal('add')} className="btn-glow px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest text-black inline-flex items-center gap-2">
                <Plus size={16} /> Add First Member
              </button>
            </>
          ) : (
            <>
              <Search className="text-gray-600 w-16 h-16 mx-auto mb-4" />
              <p className="text-[#FFF7D6]/50">No profiles match the query "{search}"</p>
            </>
          )}
        </div>
      ) : (
        <div className="rounded-3xl border border-[#D4AF37]/10 bg-[#0B0B0F] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-12 px-8 py-5 border-b border-[#D4AF37]/10 bg-[#050505] text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em]">
            <div className="col-span-12 sm:col-span-6 md:col-span-5">Identity</div>
            <div className="col-span-3 hidden md:block">Core Competencies</div>
            <div className="col-span-2 hidden sm:block text-center">Portfolio</div>
            <div className="col-span-4 sm:col-span-4 md:col-span-2 text-right">Directives</div>
          </div>
          <div className="divide-y divide-[#D4AF37]/5">
            {filtered.map(w => (
              <div key={w.id} className="grid grid-cols-12 px-8 py-5 items-center hover:bg-white/[0.02] transition-colors group">
                <div className="col-span-8 sm:col-span-6 md:col-span-5 flex items-center gap-5">
                  <div className="relative">
                    {w.photo ? (
                      <img src={w.photo} alt={w.name} className="w-12 h-12 rounded-xl object-cover border border-[#D4AF37]/30 shrink-0" />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#111] to-[#222] border border-gray-800 flex items-center justify-center text-[#D4AF37] font-bold shrink-0">
                        {w.name?.[0] || '?'}
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0B0B0F]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-white text-sm font-bold truncate tracking-wide">{w.name}</div>
                    <div className="text-[#FFF7D6]/50 text-[10px] uppercase tracking-widest truncate mt-0.5">{w.role}</div>
                  </div>
                </div>
                
                <div className="col-span-3 hidden md:flex flex-wrap gap-2">
                  {w.skills?.slice(0, 2).map(s => <span key={s} className="px-2 py-1 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-[10px] uppercase tracking-wider">{s}</span>)}
                  {w.skills?.length > 2 && <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-gray-400 text-[10px] uppercase tracking-wider">+{w.skills.length - 2}</span>}
                </div>
                
                <div className="col-span-2 hidden sm:block text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#111] border border-gray-800 text-white font-mono text-xs">
                    {w.projects?.length || 0}
                  </span>
                </div>
                
                <div className="col-span-4 sm:col-span-4 md:col-span-2 flex gap-3 justify-end opacity-100 sm:opacity-50 sm:group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setModal(w)}
                    className="p-2.5 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all" title="Edit Profile">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(w)}
                    className="p-2.5 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all" title="Delete Profile">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence>
        {modal && (
          <WorkerModal
            worker={modal === 'add' ? null : modal}
            onClose={() => setModal(null)}
            onSave={handleSave}
            customRequirements={customRequirements}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
