import { useGlobal } from '../context/GlobalContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

export default function TermsPage() {
  const { terms } = useGlobal();

  const parseContent = (content) => {
    if (!content) return [];
    const lines = content.split('\n');
    const blocks = [];
    let currentSection = null;
    let buffer = [];

    lines.forEach((line) => {
      if (line.startsWith('## ')) {
        if (currentSection) blocks.push({ ...currentSection, body: buffer.join('\n') });
        currentSection = { heading: line.replace('## ', ''), id: line.replace('## ', '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') };
        buffer = [];
      } else if (line.startsWith('# ')) {
        // skip h1
      } else {
        buffer.push(line);
      }
    });
    if (currentSection) blocks.push({ ...currentSection, body: buffer.join('\n') });
    return blocks;
  };

  const blocks = parseContent(terms?.content);
  const lastUpdated = terms?.lastUpdated ? new Date(terms.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A';

  return (
    <div className="min-h-screen bg-[#050505] site-frame">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="site-container relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="tag-premium mb-6"
          >
            Legal & Policies
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Terms & <span className="gradient-text italic pr-2">Conditions</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#FFF7D6]/60 text-lg max-w-2xl mx-auto font-light"
          >
            Please review our service agreements and operational guidelines.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-[#FFF7D6]/40 text-xs mt-6 uppercase tracking-widest"
          >
            Last Updated: <span className="text-[#D4AF37]">{lastUpdated}</span>
          </motion.p>
        </div>
      </section>

      <div className="site-container py-12 flex flex-col lg:flex-row gap-12 relative z-10 w-full">
        {/* Sidebar TOC */}
        <aside className="lg:w-72 shrink-0">
          <div className="glass rounded-2xl p-6 sticky top-32">
            <h3 className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <span className="w-4 h-px bg-[#D4AF37]"></span> Directory
            </h3>
            <ul className="space-y-3">
              {blocks.map((b) => (
                <li key={b.id}>
                  <a href={`#${b.id}`}
                    className="block text-sm text-[#FFF7D6]/50 hover:text-[#D4AF37] py-2 px-4 rounded-lg hover:bg-[#D4AF37]/5 border border-transparent hover:border-[#D4AF37]/10 transition-all font-light">
                    {b.heading}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 pb-24">
          {blocks.length > 0 ? blocks.map((block, i) => (
            <article key={block.id} id={block.id} className="mb-16 scroll-mt-32">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] text-sm font-bold shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                  {i + 1}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{block.heading}</h2>
              </div>
              <div className="card-premium rounded-3xl p-8 md:p-10">
                {block.body.split('\n').filter(l => l.trim()).map((line, j) => (
                  <p key={j} className="text-[#FFF7D6]/70 leading-loose mb-4 text-sm font-light">{line}</p>
                ))}
              </div>
            </article>
          )) : (
            <div className="card-premium rounded-3xl p-16 text-center">
              <p className="text-[#FFF7D6]/50 font-light text-lg">Legal documentation is currently being updated. Please contact administration for specific inquiries.</p>
            </div>
          )}

          <div className="glass rounded-2xl p-8 border border-[#D4AF37]/20 mt-12 text-center">
            <p className="text-[#FFF7D6]/60 text-sm font-light">
              For legal inquiries or clarifications regarding these terms, please contact our legal team at{' '}
              <a href="mailto:legal@zenixoft.com" className="text-[#D4AF37] font-semibold hover:underline">legal@zenixoft.com</a>
            </p>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
