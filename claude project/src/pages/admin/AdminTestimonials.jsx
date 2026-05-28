import { useState, useRef } from 'react';
import { useGlobal } from '../../context/GlobalContext';
import { fileToBase64 } from '../../utils/storage';
import { v4 as uuid } from 'uuid';
import { MessageSquareQuote, Plus, Star, Edit2, Trash2, X, Upload, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EMPTY = { clientName: '', company: '', review: '', rating: 5, photo: null };

function Stars({ rating, onChange }) {
  return (
    <div className="flex gap-2">
      {[1,2,3,4,5].map(i => (
        <button key={i} type="button" onClick={() => onChange && onChange(i)}
          className="transition-transform hover:scale-125 focus:outline-none">
          <Star 
            size={24} 
            className={i <= rating ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-gray-700'} 
          />
        </button>
      ))}
    </div>
  );
}

function Modal({ item, onClose, onSave }) {
  const [form, setForm] = useState(item || EMPTY);
  const fileRef = useRef();

  const handlePhoto = async (e) => {
    const file = e.target.files?.[0];
    if (file) { const b64 = await fileToBase64(file); setForm(f => ({ ...f, photo: b64 })); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-2xl bg-[#0B0B0F] border border-[#D4AF37]/30 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center px-8 py-6 border-b border-[#D4AF37]/10 bg-[#050505]">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-3">
            {item ? <Edit2 className="text-[#D4AF37]" size={20} /> : <Plus className="text-[#D4AF37]" size={20} />}
            {item ? 'Modify Testimonial' : 'Register Testimonial'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/5 text-[#FFF7D6]/50 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-8">
          <div className="flex items-center gap-6">
            <div className="relative group cursor-pointer" onClick={() => fileRef.current?.click()}>
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#D4AF37]/30 bg-[#111] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                {form.photo ? (
                  <img src={form.photo} alt="" className="w-full h-full object-cover" />
                ) : (
                  <Camera className="text-[#D4AF37]/30" size={32} />
                )}
              </div>
              <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Upload className="text-white" size={20} />
              </div>
            </div>
            <div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
              <button type="button" onClick={() => fileRef.current?.click()}
                className="px-5 py-2.5 rounded-xl border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-wider hover:bg-[#D4AF37]/10 transition-all mb-2 block">
                Upload Portrait
              </button>
              {form.photo && <button type="button" onClick={() => setForm(f => ({ ...f, photo: null }))}
                className="text-red-400 text-xs font-bold uppercase tracking-wider hover:underline block ml-2">Remove</button>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-bold text-[#FFF7D6]/50 uppercase tracking-widest mb-2 block">Client Identity *</label>
              <input className="w-full bg-[#050505] border border-[#D4AF37]/20 rounded-xl py-3 px-4 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all font-light" placeholder="e.g. Sarah Johnson" value={form.clientName}
                onChange={e => setForm(f => ({ ...f, clientName: e.target.value }))} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-[#FFF7D6]/50 uppercase tracking-widest mb-2 block">Organization / Entity</label>
              <input className="w-full bg-[#050505] border border-[#D4AF37]/20 rounded-xl py-3 px-4 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all font-light" placeholder="e.g. TechFlow Inc." value={form.company}
                onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-[#FFF7D6]/50 uppercase tracking-widest mb-2 block">Executive Review *</label>
            <textarea className="w-full bg-[#050505] border border-[#D4AF37]/20 rounded-xl py-3 px-4 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all font-light resize-none" rows={4} placeholder="Client statement..."
              value={form.review} onChange={e => setForm(f => ({ ...f, review: e.target.value }))} />
          </div>

          <div>
            <label className="text-[10px] font-bold text-[#FFF7D6]/50 uppercase tracking-widest mb-3 block">Performance Rating</label>
            <div className="bg-[#050505] p-4 rounded-xl border border-[#D4AF37]/10 inline-block">
              <Stars rating={form.rating} onChange={v => setForm(f => ({ ...f, rating: v }))} />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 p-6 border-t border-[#D4AF37]/20 bg-[#050505]">
          <button type="button" onClick={onClose}
            className="px-6 py-3 rounded-xl text-[#FFF7D6]/50 hover:text-white border border-transparent hover:border-gray-800 transition-all text-xs font-bold uppercase tracking-widest">
            Cancel
          </button>
          <button onClick={() => { if (form.clientName && form.review) onSave(form); }}
            className={`btn-glow px-8 py-3 rounded-xl text-black text-xs font-bold uppercase tracking-widest ${(form.clientName && form.review) ? '' : 'opacity-50 cursor-not-allowed'}`}>
            {item ? 'Save Changes' : 'Publish Review'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminTestimonials() {
  const { testimonials, createTestimonial, editTestimonial, removeTestimonial } = useGlobal();
  const [modal, setModal] = useState(null);

  const handleSave = (form) => {
    if (modal === 'add') createTestimonial({ ...form, id: uuid() });
    else editTestimonial(modal.id, form);
    setModal(null);
  };

  return (
    <div className="max-w-6xl animate-fade-in space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <MessageSquareQuote className="text-[#D4AF37]" size={28} />
            Client Feedback
          </h1>
          <p className="text-[#FFF7D6]/50 mt-2 font-light">Managing {testimonials.length} public client endorsements.</p>
        </div>
        <button onClick={() => setModal('add')}
          className="btn-glow px-6 py-3 rounded-xl text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 text-black whitespace-nowrap self-start md:self-auto">
          <Plus size={16} /> Record Review
        </button>
      </div>

      {testimonials.length === 0 ? (
        <div className="rounded-3xl border border-[#D4AF37]/10 bg-[#0B0B0F] p-16 text-center shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <div className="w-24 h-24 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-6">
            <Star className="text-[#D4AF37]" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">No Endorsements</h2>
          <p className="text-[#FFF7D6]/50 font-light max-w-md mx-auto mb-8">Begin building trust by registering your first client testimonial.</p>
          <button onClick={() => setModal('add')} className="btn-glow px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest text-black inline-flex items-center gap-2">
            <Plus size={16} /> Add First Review
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {testimonials.map((t, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                key={t.id} 
                className="card-premium rounded-3xl p-8 border border-[#D4AF37]/20 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-[40px] pointer-events-none" />
                
                <div className="flex items-start justify-between gap-4 mb-6 relative z-10">
                  <div className="flex items-center gap-4">
                    {t.photo ? (
                      <img src={t.photo} alt={t.clientName} className="w-14 h-14 rounded-full object-cover border-2 border-[#D4AF37]/30 shadow-[0_0_15px_rgba(212,175,55,0.2)]" />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#111] to-[#222] border border-gray-800 flex items-center justify-center text-[#D4AF37] font-bold text-xl shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                        {t.clientName?.[0] || '?'}
                      </div>
                    )}
                    <div>
                      <div className="text-base font-bold text-white tracking-wide">{t.clientName}</div>
                      <div className="text-[#D4AF37] text-[10px] uppercase tracking-widest font-semibold">{t.company}</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setModal(t)}
                      className="p-2.5 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all" title="Edit">
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => removeTestimonial(t.id)}
                      className="p-2.5 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all" title="Delete">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-4 relative z-10">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} size={16} className={star <= t.rating ? "text-[#D4AF37] fill-[#D4AF37]" : "text-gray-800"} />
                  ))}
                </div>
                
                <p className="text-[#FFF7D6]/70 text-sm leading-relaxed font-light italic relative z-10">"{t.review}"</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {modal && (
          <Modal item={modal === 'add' ? null : modal} onClose={() => setModal(null)} onSave={handleSave} />
        )}
      </AnimatePresence>
    </div>
  );
}
