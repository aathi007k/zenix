import { useState } from 'react';
import { useGlobal } from '../../context/GlobalContext';
import { FileText, Eye, Edit3, Save, CheckCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminTerms() {
  const { terms, saveTerms } = useGlobal();
  const [content, setContent] = useState(terms?.content || '');
  const [preview, setPreview] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    saveTerms({ content, lastUpdated: new Date().toISOString() });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const renderPreview = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-bold text-white mt-8 mb-4 tracking-tight">{line.replace('# ', '')}</h1>;
      if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-[#D4AF37] mt-6 mb-3 tracking-wide">{line.replace('## ', '')}</h2>;
      if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-semibold text-[#FFF7D6] mt-5 mb-2 uppercase tracking-wider text-sm">{line.replace('### ', '')}</h3>;
      if (line.trim() === '') return <div key={i} className="h-4" />;
      return <p key={i} className="text-[#FFF7D6]/60 text-sm leading-relaxed mb-3 font-light">{line}</p>;
    });
  };

  return (
    <div className="max-w-5xl space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <FileText className="text-[#D4AF37]" size={28} />
            Legal Documentation
          </h1>
          <p className="text-[#FFF7D6]/50 mt-2 font-light max-w-xl">Configure terms of service, privacy policies, and corporate guidelines using standard markdown syntax.</p>
        </div>
        
        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="bg-[#111] p-1 rounded-xl border border-gray-800 flex">
            <button onClick={() => setPreview(false)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                !preview ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 'text-gray-500 hover:text-white'
              }`}>
              <Edit3 size={14} /> Editor
            </button>
            <button onClick={() => setPreview(true)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                preview ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 'text-gray-500 hover:text-white'
              }`}>
              <Eye size={14} /> Preview
            </button>
          </div>
          <button onClick={handleSave}
            className="btn-glow px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest text-black flex items-center gap-2">
            {saved ? <><CheckCircle size={16} /> Saved</> : <><Save size={16} /> Publish</>}
          </button>
        </div>
      </div>

      {terms?.lastUpdated && (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#050505] border border-gray-800 text-[10px] uppercase tracking-widest text-gray-500">
          <Clock size={12} />
          Last modified: {new Date(terms.lastUpdated).toLocaleString()}
        </div>
      )}

      <div className="rounded-3xl bg-[#0B0B0F] border border-[#D4AF37]/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col h-[600px]">
        {/* Editor Toolbar */}
        {!preview && (
          <div className="px-6 py-3 border-b border-[#D4AF37]/10 bg-[#050505] flex gap-2 overflow-x-auto scrollbar-hide">
            {[
              { label: 'H1 Title', val: '# ' }, 
              { label: 'H2 Section', val: '## ' }, 
              { label: 'H3 Sub-section', val: '### ' }
            ].map(h => (
              <button key={h.label} onClick={() => setContent(c => c + '\n' + h.val + 'Heading Text\n')}
                className="whitespace-nowrap px-3 py-1.5 rounded bg-[#111] border border-gray-800 text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-colors text-[10px] font-bold uppercase tracking-wider">
                {h.label}
              </button>
            ))}
          </div>
        )}

        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            {preview ? (
              <motion.div 
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 p-8 overflow-y-auto custom-scrollbar"
              >
                <div className="max-w-3xl">
                  {renderPreview(content || 'No content provided.')}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="editor"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                <textarea
                  className="w-full h-full p-8 bg-transparent text-[#FFF7D6]/80 text-sm leading-relaxed resize-none focus:outline-none focus:ring-inset focus:ring-1 focus:ring-[#D4AF37]/20 transition-all font-mono custom-scrollbar"
                  placeholder={`# Terms & Conditions\n\n## 1. Usage Policy\nYour usage policy content here...\n\n## 2. Privacy Policy\nPrivacy content here...`}
                  value={content}
                  onChange={e => setContent(e.target.value)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
