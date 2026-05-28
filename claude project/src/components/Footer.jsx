import { Link } from 'react-router-dom';
import { useGlobal } from '../context/GlobalContext';
import { Globe, MessageCircle, Share2, Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  const { company } = useGlobal();
  const year = new Date().getFullYear();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/team', label: 'Our Team' },
    { to: '/terms', label: 'Terms & Conditions' },
    { to: '/admin', label: 'Admin Portal' },
  ];

  const services = ['Performance Marketing', 'Brand Identity', 'Web Platforms', 'Mobile Applications', 'Cloud Architecture', 'Digital Strategy'];

  const getIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return <Globe size={18} />;
      case 'twitter': return <MessageCircle size={18} />;
      case 'linkedin': return <Share2 size={18} />;
      default: return null;
    }
  };

  return (
    <footer className="relative border-t border-[#D4AF37]/10 bg-[#050505] overflow-hidden pt-20 pb-8">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#B8860B]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-8 sm:px-12 md:px-16 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-6 inline-block">
              {company.logo ? (
                <img src={company.logo} alt="Logo" className="h-10 w-auto object-contain" />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center text-black font-bold text-xl shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                  {company.name.charAt(0)}
                </div>
              )}
              <span className="text-2xl font-bold tracking-tight text-white uppercase">{company.name}</span>
            </Link>
            <p className="text-[#FFF7D6]/60 text-sm leading-relaxed mb-8 pr-4 font-light">
              {company.tagline} We build digital experiences that define luxury and performance.
            </p>
            <div className="flex gap-4">
              {Object.entries(company.socialLinks || {}).map(([platform, url]) => (
                <a key={platform} href={url} target="_blank" rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-[#D4AF37]/20 flex items-center justify-center text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 transition-all duration-300">
                  {getIcon(platform) || <span className="text-xs uppercase">{platform.substring(0,2)}</span>}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-[#D4AF37] text-xs font-semibold uppercase tracking-[0.2em] mb-6">Navigation</h4>
            <ul className="space-y-4">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-[#FFF7D6]/60 text-sm hover:text-white transition-colors relative group">
                    {label}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="text-[#D4AF37] text-xs font-semibold uppercase tracking-[0.2em] mb-6">Expertise</h4>
            <ul className="space-y-4">
              {services.map(s => (
                <li key={s}><span className="text-[#FFF7D6]/60 text-sm hover:text-white transition-colors cursor-pointer">{s}</span></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-[#D4AF37] text-xs font-semibold uppercase tracking-[0.2em] mb-6">Contact</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 text-[#FFF7D6]/60 text-sm group cursor-pointer hover:text-white transition-colors">
                <Mail className="text-[#D4AF37] mt-0.5" size={16} />
                <span className="font-light">{company.email}</span>
              </li>
              <li className="flex items-start gap-4 text-[#FFF7D6]/60 text-sm group cursor-pointer hover:text-white transition-colors">
                <Phone className="text-[#D4AF37] mt-0.5" size={16} />
                <span className="font-light">{company.phone}</span>
              </li>
              <li className="flex items-start gap-4 text-[#FFF7D6]/60 text-sm group cursor-pointer hover:text-white transition-colors">
                <MapPin className="text-[#D4AF37] mt-0.5 shrink-0" size={16} />
                <span className="font-light leading-relaxed">{company.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#D4AF37]/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#FFF7D6]/40 text-xs tracking-wider uppercase">
            © {year} {company.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-2 text-[#FFF7D6]/40 text-xs tracking-wider uppercase">
            Crafted with <Heart className="text-[#B8860B]" size={12} fill="currentColor" /> by Zenixoft
          </p>
        </div>
      </div>
    </footer>
  );
}
