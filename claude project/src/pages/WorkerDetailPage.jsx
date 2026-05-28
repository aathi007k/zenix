import { useParams, Link } from 'react-router-dom';
import { useGlobal } from '../context/GlobalContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import { Mail, Phone, Download, ArrowLeft, ExternalLink, CheckCircle, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DEFAULT_PROFILE = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80';

export default function WorkerDetailPage() {
  const { id } = useParams();
  const { workers, customRequirements } = useGlobal();
  const [lightbox, setLightbox] = useState(null);
  const worker = workers.find(w => w.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!worker) return (
    <div className="min-h-screen flex flex-col bg-[#050505] site-frame">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 rounded-full border border-red-500/30 flex items-center justify-center mb-6">
          <Search size={32} className="text-red-500" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Profile Not Found</h2>
        <p className="text-[#FFF7D6]/50 mb-8 max-w-md">The personnel profile you are looking for has been moved or no longer exists in our registry.</p>
        <Link to="/team" className="btn-glow px-8 py-3 rounded-xl uppercase tracking-widest font-bold text-sm text-black flex items-center gap-2">
          <ArrowLeft size={16} /> Return to Roster
        </Link>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-[#D4AF37] selection:text-black site-frame">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        {/* Background Ambience */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#D4AF37]/5 via-[#050505] to-[#050505]" />
        <div className="absolute top-20 right-0 w-[800px] h-[800px] bg-[#B8860B]/5 rounded-full blur-[150px] pointer-events-none" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        <div className="site-container relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link to="/team" className="inline-flex items-center gap-2 text-[#FFF7D6]/40 hover:text-[#D4AF37] transition-colors text-xs font-bold uppercase tracking-widest group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Directory Return
            </Link>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
            {/* Portrait */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="shrink-0 relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <img src={worker.photo || DEFAULT_PROFILE} alt={worker.name}
                className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl object-cover border border-[#D4AF37]/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] grayscale group-hover:grayscale-0 transition-all duration-700" />
            </motion.div>

            {/* Title & Bio */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex-1 text-center md:text-left pt-2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                {worker.role}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">{worker.name}</h1>
              
              {worker.bio && (
                <p className="text-[#FFF7D6]/60 text-lg leading-relaxed max-w-3xl mb-8 font-light italic">
                  "{worker.bio}"
                </p>
              )}

              {/* Action Links */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                {worker.contact?.email && (
                  <a href={`mailto:${worker.contact.email}`} className="flex items-center gap-2 text-sm text-[#FFF7D6]/50 hover:text-[#D4AF37] bg-[#111] hover:bg-[#1a1a1a] border border-gray-800 hover:border-[#D4AF37]/30 px-5 py-2.5 rounded-xl transition-all">
                    <Mail size={16} />
                    <span className="font-mono text-xs">{worker.contact.email}</span>
                  </a>
                )}
                {worker.contact?.phone && (
                  <a href={`tel:${worker.contact.phone}`} className="flex items-center gap-2 text-sm text-[#FFF7D6]/50 hover:text-[#D4AF37] bg-[#111] hover:bg-[#1a1a1a] border border-gray-800 hover:border-[#D4AF37]/30 px-5 py-2.5 rounded-xl transition-all">
                    <Phone size={16} />
                    <span className="font-mono text-xs">{worker.contact.phone}</span>
                  </a>
                )}
                {worker.resume && (
                  <a href={worker.resume} download={`${worker.name}_Resume.pdf`}
                    className="btn-glow text-black font-bold uppercase tracking-widest px-6 py-2.5 rounded-xl text-xs inline-flex items-center gap-2">
                    <Download size={14} />
                    Download CV
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="site-container py-16 grid grid-cols-1 lg:grid-cols-3 gap-12 w-full">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-8">
          {/* Skills */}
          {worker.skills?.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-premium rounded-3xl p-8 border border-[#D4AF37]/20"
            >
              <h2 className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em] border-b border-[#D4AF37]/10 pb-4 mb-6">Core Competencies</h2>
              <div className="flex flex-wrap gap-2">
                {worker.skills.map(s => (
                  <span key={s} className="px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded text-[#D4AF37] text-xs font-semibold uppercase tracking-wider">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Custom Fields */}
          {customRequirements?.length > 0 && worker.customFields && Object.keys(worker.customFields).length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-premium rounded-3xl p-8 border border-[#D4AF37]/20"
            >
              <h2 className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em] border-b border-[#D4AF37]/10 pb-4 mb-6">Extended Profile</h2>
              <div className="space-y-6">
                {customRequirements.map(req => {
                  const val = worker.customFields?.[req.key];
                  if (!val) return null;
                  return (
                    <div key={req.key}>
                      <div className="text-[#FFF7D6]/30 text-[10px] uppercase tracking-widest font-bold mb-1.5">{req.label}</div>
                      {req.type === 'link' ? (
                        <a href={val} target="_blank" rel="noreferrer" className="text-[#D4AF37] hover:underline text-sm break-all font-mono inline-flex items-center gap-1">
                          {val} <ExternalLink size={12} />
                        </a>
                      ) : req.type === 'checkbox' ? (
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${val ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                          {val ? <><CheckCircle size={12} /> Active</> : <><X size={12} /> Inactive</>}
                        </span>
                      ) : req.type === 'file' ? (
                        <a href={val} download className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold uppercase tracking-wider hover:bg-[#D4AF37]/20 transition-all border border-[#D4AF37]/20">
                          <Download size={14} /> Access Document
                        </a>
                      ) : (
                        <p className="text-[#FFF7D6]/80 text-sm font-light leading-relaxed">{val}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-12">
          {/* Projects */}
          {worker.projects?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#D4AF37]/30"></span>
                Featured Deliverables
                <span className="h-[1px] flex-1 bg-gradient-to-r from-[#D4AF37]/30 to-transparent"></span>
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {worker.projects.map((p, i) => (
                  <motion.div 
                    key={p.id} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group rounded-3xl overflow-hidden border border-[#D4AF37]/10 bg-[#0B0B0F] hover:border-[#D4AF37]/30 transition-all duration-500 flex flex-col"
                  >
                    {p.image && (
                      <div className="h-48 overflow-hidden relative">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                      </div>
                    )}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-[#D4AF37] transition-colors">{p.title}</h3>
                      <p className="text-[#FFF7D6]/50 text-sm mb-6 leading-relaxed font-light flex-1">{p.description}</p>
                      
                      {p.techStack?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {p.techStack.map(t => <span key={t} className="text-[9px] px-2 py-0.5 rounded border border-[#D4AF37]/20 text-[#D4AF37] uppercase tracking-widest">{t}</span>)}
                        </div>
                      )}
                      
                      {p.link && (
                        <a href={p.link} target="_blank" rel="noreferrer"
                          className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider hover:underline inline-flex items-center gap-2 mt-auto">
                          View Live Deployment <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Portfolio Gallery */}
          {worker.portfolio?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#D4AF37]/30"></span>
                Visual Assets
                <span className="h-[1px] flex-1 bg-gradient-to-r from-[#D4AF37]/30 to-transparent"></span>
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {worker.portfolio.map((img, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setLightbox(img)}
                    className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group border border-[#D4AF37]/10 hover:border-[#D4AF37]/40 transition-all"
                  >
                    <img src={img} alt={`Portfolio ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                      <Search size={24} className="text-[#D4AF37] scale-50 group-hover:scale-100 transition-transform duration-300" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" 
            onClick={() => setLightbox(null)}
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl w-full" 
              onClick={e => e.stopPropagation()}
            >
              <img src={lightbox} alt="Portfolio Detail" className="w-full rounded-2xl object-contain max-h-[85vh] shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10" />
              <button onClick={() => setLightbox(null)}
                className="absolute -top-4 -right-4 md:top-4 md:right-4 w-12 h-12 bg-black/50 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
