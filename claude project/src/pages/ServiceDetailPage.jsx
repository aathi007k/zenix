import { Link, Navigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getServiceBySlug } from '../data/services';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-[#D4AF37] selection:text-black site-frame">
      <Navbar />

      <section className="pt-32 pb-20 relative overflow-hidden">
        
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#D4AF37]/5 via-[#050505] to-[#050505]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#B8860B]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        <div className="site-container relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-10"
          >
            <Link to="/" className="inline-flex items-center gap-2 text-[#FFF7D6]/40 hover:text-[#D4AF37] transition-colors text-xs font-bold uppercase tracking-widest group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Return to Core
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                Premium Service
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                {service.title}
              </h1>
              
              <p className="text-xl text-[#FFF7D6]/60 leading-relaxed font-light mb-8 border-l-2 border-[#D4AF37]/30 pl-6">
                {service.overview}
              </p>
              
              <button className="btn-glow px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest text-black flex items-center gap-2">
                Initiate Consultation
              </button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group perspective"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#D4AF37]/20 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative rounded-[2rem] overflow-hidden border border-[#D4AF37]/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-gpu transition-transform duration-700 group-hover:scale-[1.02] group-hover:rotate-y-2 group-hover:rotate-x-2">
                <img src={service.image} alt={service.title} className="w-full h-96 object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="premium-shell relative z-10 w-full">
        <div className="site-container-narrow">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2.5rem] bg-[#0B0B0F] border border-[#D4AF37]/10 p-10 md:p-16 shadow-[0_10px_40px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent opacity-50" />
            
            <div className="text-center mb-12">
              <h2 className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em] mb-3">Deliverables</h2>
              <h3 className="text-3xl font-bold text-white tracking-tight">Executive Scope of Work</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
              {service.deliverables.map((item, index) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  key={item} 
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/[0.02] transition-colors border border-transparent hover:border-white/5"
                >
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0 border border-[#D4AF37]/20 mt-1">
                    <CheckCircle2 size={16} className="text-[#D4AF37]" />
                  </div>
                  <p className="text-[#FFF7D6]/80 text-sm leading-relaxed font-medium">
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
