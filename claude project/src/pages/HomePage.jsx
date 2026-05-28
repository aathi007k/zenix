import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobal } from '../context/GlobalContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, ArrowRight, Star, Shield, Zap, Globe, Award, Briefcase, Users, LayoutTemplate, Activity } from 'lucide-react';
import { services } from '../data/services';

// ─── Animated Counter ──────────────────────────────────────────────────────────
function Counter({ end, label, suffix = '+' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsInView(true);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2500;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center group relative p-6 glass rounded-2xl"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
      <div className="relative">
        <div className="text-4xl md:text-5xl font-bold gradient-text mb-2 tracking-tight">
          {count.toLocaleString()}{suffix}
        </div>
        <div className="text-[#FFF7D6]/60 text-xs font-semibold uppercase tracking-[0.2em]">{label}</div>
      </div>
    </motion.div>
  );
}



// ─── Testimonial Carousel ──────────────────────────────────────────────────────
function TestimonialCarousel({ testimonials }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!testimonials.length) return;
    const timer = setInterval(() => setCurrent(c => (c + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (!testimonials.length) return null;

  return (
    <div className="relative max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.id}
            onClick={() => setCurrent(i)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`card-premium rounded-2xl p-8 cursor-pointer transition-all duration-500 ${i === current ? 'border-[#D4AF37]/50 shadow-[0_0_30px_rgba(212,175,55,0.15)] scale-105 z-10' : 'opacity-60 hover:opacity-100 scale-95 hover:scale-100'}`}
          >
            <div className="flex items-center gap-4 mb-6">
              {t.photo ? (
                <img src={t.photo} alt={t.clientName} className="w-14 h-14 rounded-full object-cover border border-[#D4AF37]/30" />
              ) : (
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#111] to-[#222] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] font-bold text-xl">
                  {t.clientName?.[0] || '?'}
                </div>
              )}
              <div>
                <div className="font-bold text-white tracking-wide">{t.clientName}</div>
                <div className="text-[#D4AF37]/80 text-xs tracking-wider uppercase">{t.company}</div>
              </div>
            </div>
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} size={14} className={star <= t.rating ? "text-[#D4AF37] fill-[#D4AF37]" : "text-gray-700"} />
              ))}
            </div>
            <p className="text-[#FFF7D6]/70 text-sm leading-relaxed italic">"{t.review}"</p>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center gap-3 mt-12">
        {testimonials.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? 'w-8 bg-gradient-to-r from-[#D4AF37] to-[#F5D76E]' : 'w-2 bg-gray-800 hover:bg-gray-700'}`} />
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const { company, stats, testimonials } = useGlobal();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <div className="min-h-screen bg-[#050505] site-frame">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen h-screen flex items-center pt-0 pb-0 overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a1500] via-[#050505] to-[#050505] opacity-80" />
        <motion.div style={{ y: y1 }} className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-full blur-[120px]" />
        <motion.div style={{ y: y2 }} className="absolute bottom-0 -left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[#B8860B]/10 to-transparent rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.025] flex flex-wrap" style={{ backgroundImage: 'linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div key={`p-${i}`} className="absolute w-1 h-1 rounded-full bg-[#D4AF37]/30" style={{ top: `${15 + i * 14}%`, left: `${10 + i * 15}%` }} animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.7 }} />
        ))}

        <div className="absolute inset-0 flex items-center justify-center z-0" />

        <div className="site-container relative z-10 w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-14 lg:gap-16 text-center">

            {/* Hero Content */}
            <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 backdrop-blur-md mb-10"
              >
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="text-[#D4AF37] text-xs font-semibold tracking-[0.25em] uppercase">Premium Digital Agency</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl md:text-[3.5rem] lg:text-[4.5rem] font-bold text-white mb-6 leading-[1.08] tracking-tight"
              >
                {company.tagline.split('. ').map((part, i) => (
                  <span key={i} className="block">
                    {i === 1 ? <span className="gradient-text">{part}.</span> : `${part}.`}
                  </span>
                ))}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-[#FFF7D6]/50 text-base md:text-lg leading-relaxed mb-12 max-w-2xl mx-auto font-light"
              >
                We architect high-end digital experiences for brands that refuse to blend in. Strategy. Design. Engineering. Results.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <a href="#services" className="btn-glow px-10 py-4 rounded-xl flex items-center justify-center gap-3 text-sm font-semibold">
                  Explore Services <ArrowRight size={16} />
                </a>
                <Link to="/team" className="btn-outline px-10 py-4 rounded-xl flex items-center justify-center gap-3 text-sm font-semibold">
                  Meet Our Experts
                </Link>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 mt-16 pt-8 border-t border-[#D4AF37]/10 w-full"
              >
                {[
                  { val: `${stats.clients}+`, label: 'Clients' },
                  { val: `${stats.projects}+`, label: 'Projects' },
                  { val: `${stats.years}+`, label: 'Years' },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-3xl font-bold text-[#D4AF37]">{s.val}</div>
                    <div className="text-[10px] text-[#FFF7D6]/40 uppercase tracking-[0.2em]">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div style={{ opacity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[#FFF7D6]/40 text-[10px] uppercase tracking-[0.2em]">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-12 bg-gradient-to-b from-[#D4AF37] to-transparent"
          />
        </motion.div>
      </section>

      {/* ── ABOUT ── */}
      <section className="premium-shell relative section-alt">
        <div className="site-container">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-sm font-semibold tracking-[0.2em] text-[#D4AF37] uppercase mb-4 flex items-center justify-center gap-2">
                <span className="w-8 h-px bg-[#D4AF37]"></span> Our Essence <span className="w-8 h-px bg-[#D4AF37]"></span>
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                Where Luxury Meets <br />
                <span className="gradient-text">Innovation</span>
              </h3>
              <p className="text-[#FFF7D6]/60 text-lg leading-relaxed mb-6 font-light">
                {company.about}
              </p>
              <p className="text-[#FFF7D6]/60 text-lg leading-relaxed mb-10 font-light">
                From high-end web platforms to sophisticated marketing campaigns, we engineer digital solutions that command attention and drive exponential growth.
              </p>
              <Link to="/team" className="inline-flex items-center justify-center gap-2 text-[#D4AF37] font-semibold hover:text-[#F5D76E] transition-colors group">
                Discover Our Team <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto"
            >
              {[
                { icon: Award, title: 'Award Winning', desc: 'Industry recognized excellence' },
                { icon: Zap, title: 'Rapid Delivery', desc: 'Precision and speed combined' },
                { icon: Shield, title: 'Secure & Reliable', desc: 'Enterprise-grade architecture' },
                { icon: Globe, title: 'Global Reach', desc: 'Impact across borders' },
              ].map((item, i) => (
                <div key={item.title} className="card-premium p-6 rounded-2xl">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-4 border border-[#D4AF37]/20">
                    <item.icon className="text-[#D4AF37]" size={20} />
                  </div>
                  <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-[#FFF7D6]/50 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </motion.div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="premium-shell relative w-full">
        <div className="site-container relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-semibold tracking-[0.2em] text-[#D4AF37] uppercase mb-4"
            >
              Our Expertise
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white"
            >
              Tailored Digital Solutions
            </motion.h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link to={`/services/${s.slug}`} className="block group h-full">
                  <div className="card-premium p-1 h-full rounded-2xl">
                    <div className="relative overflow-hidden rounded-xl mb-4 aspect-[4/3]">
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                      <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent z-20">
                        <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                        <div className="h-0.5 w-0 group-hover:w-12 bg-[#D4AF37] transition-all duration-300" />
                      </div>
                    </div>
                    <div className="px-6 pb-6 pt-2">
                      <p className="text-[#FFF7D6]/60 text-sm leading-relaxed mb-4">{s.shortDescription}</p>
                      <span className="text-[#D4AF37] text-xs font-semibold uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
                        Discover <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="premium-shell relative section-alt overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
        <div className="site-container relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-5xl mx-auto">
            <Counter end={stats.clients} label="Elite Clients" />
            <Counter end={stats.projects} label="Projects Crafted" />
            <Counter end={stats.years} label="Years Mastery" suffix=" yrs" />
            <Counter end={stats.teamMembers} label="Global Experts" />
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="premium-shell relative">
        <div className="site-container">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-semibold tracking-[0.2em] text-[#D4AF37] uppercase mb-4"
            >
              Client Voices
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Excellence Recognized
            </motion.h3>
          </div>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="premium-shell relative w-full">
        <div className="site-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto relative rounded-[1.25rem] overflow-hidden p-12 md:p-20 text-center border border-[#D4AF37]/20 bg-[#0B0B0F]"
        >
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-[#B8860B]/10" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/20 rounded-full blur-[80px] -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B8860B]/20 rounded-full blur-[80px] translate-y-1/2" />

          <div className="relative z-10">
            <span className="tag-premium mb-8">Initiate Transformation</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
              Ready to redefine <br className="hidden md:block" />
              <span className="gradient-text italic pr-2">your digital legacy?</span>
            </h2>
            <p className="text-[#FFF7D6]/60 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light">
              Connect with our partners to discuss your vision and discover how Zenixoft can architect your next breakthrough.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <a href={`mailto:${company.email}`} className="btn-glow px-10 py-5 rounded-xl text-base flex items-center justify-center gap-3">
                Schedule Consultation <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
