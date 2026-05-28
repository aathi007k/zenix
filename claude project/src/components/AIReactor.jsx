import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// ─── Futuristic AI Core Reactor (Pure CSS + Framer Motion) ──────────────────
// A premium 3D-looking reactor with holographic rings, particles, energy core,
// pulse waves, scanning lines, and neural network links — all CSS-rendered
// for maximum compatibility and performance.

function useMouseParallax(intensity = 15) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setOffset({
        x: ((e.clientX - cx) / cx) * intensity,
        y: ((e.clientY - cy) / cy) * intensity,
      });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [intensity]);
  return offset;
}

export default function AIReactor() {
  const mouse = useMouseParallax(12);

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      {/* Mouse-reactive parallax wrapper */}
      <motion.div
        className="relative w-[360px] h-[360px]"
        animate={{ x: mouse.x, y: mouse.y }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
      >
        {/* ── Deep Volumetric Glow ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-64 h-64 bg-[#D4AF37] rounded-full blur-[100px]"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="w-32 h-32 bg-[#F5D76E] rounded-full blur-[50px] opacity-20"
          />
        </div>

        {/* ── Scanning Line ── */}
        <motion.div
          animate={{ top: ['-5%', '105%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent pointer-events-none z-20"
          style={{ filter: 'blur(0.5px)' }}
        />

        {/* ── Ring 1: Outermost — Segmented Holographic ── */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <svg width="360" height="360" viewBox="0 0 360 360" className="absolute">
            <defs>
              <linearGradient id="ringGrad1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#F5D76E" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <circle cx="180" cy="180" r="175" fill="none" stroke="url(#ringGrad1)" strokeWidth="0.5" strokeDasharray="8 16" />
          </svg>
          {/* Particle trail on outer ring */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
            <motion.div
              key={`op-${i}`}
              className="absolute w-1 h-1 rounded-full bg-[#D4AF37]"
              style={{
                top: '50%', left: '50%',
                transform: `rotate(${deg}deg) translateX(175px) translate(-50%, -50%)`,
              }}
              animate={{ opacity: [0.1, 0.8, 0.1], scale: [0.6, 1.2, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </motion.div>

        {/* ── Ring 2: Labels Orbit ── */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <svg width="300" height="300" viewBox="0 0 300 300" className="absolute">
            <circle cx="150" cy="150" r="145" fill="none" stroke="#D4AF37" strokeWidth="0.3" strokeOpacity="0.12" strokeDasharray="4 8" />
          </svg>
          {['Strategy', 'Design', 'Code', 'Growth'].map((label, i) => (
            <motion.div
              key={label}
              className="absolute px-3 py-1.5 rounded-lg bg-[#0a0a0f]/95 backdrop-blur-xl border border-[#D4AF37]/30 text-[8px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(212,175,55,0.1),_inset_0_1px_0_rgba(212,175,55,0.08)]"
              style={{
                top: '50%', left: '50%',
                transform: `rotate(${i * 90}deg) translateX(145px) rotate(-${i * 90 - 360}deg) translate(-50%, -50%)`,
              }}
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.7 }}
            >
              {label}
            </motion.div>
          ))}
        </motion.div>

        {/* ── Ring 3: Neural Network Ring ── */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <svg width="240" height="240" viewBox="0 0 240 240" className="absolute">
            <circle cx="120" cy="120" r="115" fill="none" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.1" />
            {/* Neural link arcs */}
            {[0, 60, 120, 180, 240, 300].map((deg, i) => {
              const r = 115;
              const x1 = 120 + r * Math.cos((deg * Math.PI) / 180);
              const y1 = 120 + r * Math.sin((deg * Math.PI) / 180);
              const x2 = 120 + r * Math.cos(((deg + 120) * Math.PI) / 180);
              const y2 = 120 + r * Math.sin(((deg + 120) * Math.PI) / 180);
              return (
                <line key={`nl-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D4AF37" strokeWidth="0.3" strokeOpacity="0.08" />
              );
            })}
          </svg>
          {/* Glowing nodes */}
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <motion.div
              key={`nn-${i}`}
              className="absolute w-2 h-2 rounded-full bg-[#D4AF37]/30 border border-[#D4AF37]/50 shadow-[0_0_8px_rgba(212,175,55,0.3)]"
              style={{
                top: '50%', left: '50%',
                transform: `rotate(${deg}deg) translateX(115px) translate(-50%, -50%)`,
              }}
              animate={{ scale: [1, 1.6, 1], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.33 }}
            />
          ))}
        </motion.div>

        {/* ── Ring 4: Fast Inner Ring ── */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <svg width="160" height="160" viewBox="0 0 160 160" className="absolute">
            <circle cx="80" cy="80" r="75" fill="none" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.15" />
          </svg>
          {[0, 90, 180, 270].map((deg, i) => (
            <motion.div
              key={`ir-${i}`}
              className="absolute w-1.5 h-1.5 rounded-full bg-[#F5D76E]"
              style={{
                top: '50%', left: '50%',
                transform: `rotate(${deg}deg) translateX(75px) translate(-50%, -50%)`,
              }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}
        </motion.div>

        {/* ── Ring 5: Tight Core Ring ── */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <svg width="110" height="110" viewBox="0 0 110 110" className="absolute">
            <circle cx="55" cy="55" r="50" fill="none" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="2 6" />
          </svg>
        </motion.div>

        {/* ── Pulse Waves ── */}
        {[0, 1.2, 2.4].map((delay, i) => (
          <motion.div
            key={`pulse-${i}`}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <motion.div
              animate={{ scale: [0.3, 2.2], opacity: [0.2, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay, ease: 'easeOut' }}
              className="w-20 h-20 rounded-full border border-[#D4AF37]/30"
            />
          </motion.div>
        ))}

        {/* ── Glass Shield ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[90px] h-[90px] rounded-full border border-[#D4AF37]/20 bg-gradient-to-br from-[#D4AF37]/[0.04] to-transparent backdrop-blur-[2px]" />
        </div>

        {/* ── Energy Core ── */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: [
                '0 0 40px rgba(212,175,55,0.3), 0 0 80px rgba(212,175,55,0.1), 0 0 160px rgba(212,175,55,0.05)',
                '0 0 60px rgba(212,175,55,0.5), 0 0 120px rgba(212,175,55,0.2), 0 0 200px rgba(212,175,55,0.08)',
                '0 0 40px rgba(212,175,55,0.3), 0 0 80px rgba(212,175,55,0.1), 0 0 160px rgba(212,175,55,0.05)',
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#F5D76E] via-[#D4AF37] to-[#B8860B] flex items-center justify-center z-10"
          >
            {/* Inner glow layer */}
            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-[#F5D76E]/40 to-transparent" />
            <span className="relative text-black font-black text-xl tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>Z</span>
          </motion.div>
        </div>

        {/* ── Floating Micro Particles ── */}
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const radius = 60 + Math.random() * 100;
          return (
            <motion.div
              key={`mp-${i}`}
              className="absolute w-[2px] h-[2px] rounded-full bg-[#D4AF37]/50"
              style={{
                top: `${50 + (Math.sin(angle) * radius / 3.6)}%`,
                left: `${50 + (Math.cos(angle) * radius / 3.6)}%`,
              }}
              animate={{
                y: [0, -15 - Math.random() * 20, 0],
                x: [0, (Math.random() - 0.5) * 10, 0],
                opacity: [0.1, 0.7, 0.1],
              }}
              transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: i * 0.4 }}
            />
          );
        })}

        {/* ── HUD Corner Elements ── */}
        <svg className="absolute top-3 left-3 w-6 h-6 text-[#D4AF37]/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M1 8V1h7M23 8V1h-7" />
        </svg>
        <svg className="absolute bottom-3 right-3 w-6 h-6 text-[#D4AF37]/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M1 16v7h7M23 16v7h-7" />
        </svg>
      </motion.div>
    </div>
  );
}
