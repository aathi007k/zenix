import { Link } from 'react-router-dom';
import { useGlobal } from '../context/GlobalContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const DEFAULT_PROFILE = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80';

function WorkerCard({ worker, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/team/${worker.id}`} className="block group">
        <div className="card-premium rounded-2xl overflow-hidden">
          {/* Photo */}
          <div className="relative h-64 bg-[#050505] overflow-hidden">
            <img src={worker.photo || DEFAULT_PROFILE} alt={worker.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out opacity-80 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-[#0B0B0F]/40 to-transparent" />
            
            {/* Role badge */}
            <div className="absolute bottom-4 left-5">
              <span className="tag-premium !bg-[#050505]/80 backdrop-blur-md !border-[#D4AF37]/50">{worker.role}</span>
            </div>
          </div>

          {/* Info */}
          <div className="p-6 relative">
            <div className="absolute top-0 right-6 w-12 h-1 -translate-y-full bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
              {worker.name}
            </h3>
            {worker.bio && (
              <p className="text-[#FFF7D6]/60 text-sm leading-relaxed mb-4 line-clamp-2 font-light">{worker.bio}</p>
            )}
            
            {/* Skills */}
            {worker.skills?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {worker.skills.slice(0, 3).map(s => (
                  <span key={s} className="text-[10px] uppercase tracking-wider text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-1 rounded border border-[#D4AF37]/20">{s}</span>
                ))}
                {worker.skills.length > 3 && (
                  <span className="text-[10px] uppercase tracking-wider text-[#FFF7D6]/40 bg-white/5 px-2 py-1 rounded">+{worker.skills.length - 3}</span>
                )}
              </div>
            )}
            
            {/* View Profile */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#D4AF37]/10 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">
              <span>View Profile</span>
              <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function TeamPage() {
  const { workers } = useGlobal();

  return (
    <div className="min-h-screen bg-[#050505] site-frame">
      <Navbar />

      {/* Hero */}
      <section className="relative h-screen flex items-center pt-0 pb-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-40 left-0 w-[400px] h-[400px] bg-[#B8860B]/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="site-container relative z-10 w-full h-full flex items-center justify-center text-center">
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="tag-premium mb-6"
          >
            The Architects of Innovation
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            Meet Our <span className="gradient-text italic pr-2">Experts</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#FFF7D6]/60 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
          >
            A collective of elite strategists, designers, and engineers united by a singular vision: to craft unparalleled digital experiences.
          </motion.p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 pb-32 relative z-10 w-full">
        <div className="site-container">
          {workers.length === 0 ? (
            <div className="text-center py-32 card-premium rounded-3xl">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/20">
                <span className="text-[#D4AF37] text-2xl font-serif italic">Z</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Assembling the Elite</h2>
              <p className="text-[#FFF7D6]/50 font-light max-w-md mx-auto">Our experts are currently being curated. Check back soon to meet the team driving our vision forward.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-4 mb-12">
                <div className="h-px bg-[#D4AF37]/30 flex-1" />
                <p className="text-[#D4AF37] text-xs font-semibold tracking-[0.2em] uppercase px-4">
                  {workers.length} Global Partner{workers.length !== 1 ? 's' : ''}
                </p>
                <div className="h-px bg-[#D4AF37]/30 flex-1" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {workers.map((worker, idx) => <WorkerCard key={worker.id} worker={worker} index={idx} />)}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
