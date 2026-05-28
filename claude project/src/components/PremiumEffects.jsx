// Premium Effect Components for enhanced UI

// Premium Button with Glow Effect
export function PremiumButton({ children, className = '', variant = 'primary', ...props }) {
  const variants = {
    primary: 'btn-glow',
    secondary: 'btn-glow-secondary',
    glass: 'glass hover:border-blue-500/50',
  };
  
  return (
    <button 
      className={`${variants[variant]} px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// Premium Card with Premium Styling
export function PremiumCard({ children, className = '' }) {
  return (
    <div
      className={`card-premium rounded-xl relative overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

// Premium Badge with Glow
export function PremiumBadge({ children, className = '' }) {
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-400/30 text-blue-300 ${className}`}>
      {children}
    </span>
  );
}

// Animated Gradient Text
export function GradientText({ children, className = '', animated = false }) {
  return (
    <span className={`${animated ? 'gradient-text' : 'gradient-text-blue'} ${className}`}>
      {children}
    </span>
  );
}

// Premium Input Field
export function PremiumInput({ label, ...props }) {
  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`input-glow w-full rounded-lg px-4 py-2.5 bg-blue-950/30 border border-blue-400/30 text-white placeholder-gray-500 transition-all duration-300 focus:border-blue-400/60 focus:shadow-lg focus:shadow-blue-500/20`}
      />
    </div>
  );
}

// Floating Animation Container
export function FloatingContainer({ children, delay = 0, className = '' }) {
  return (
    <div 
      className={`animate-float ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

// Premium Section Header
export function SectionHeader({ title, subtitle, icon, className = '' }) {
  return (
    <div className={`mb-8 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        {icon && <div className="text-2xl">{icon}</div>}
        <h2 className="text-3xl font-bold gradient-text" style={{ fontFamily: 'Syne, sans-serif' }}>
          {title}
        </h2>
      </div>
      {subtitle && <p className="text-gray-400 text-sm">{subtitle}</p>}
    </div>
  );
}

// Loading Spinner with Premium Effect
export function PremiumLoader({ className = '' }) {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <div className="animate-spin">
        <div className="neon-pulse w-10 h-10 rounded-full" />
      </div>
    </div>
  );
}

// Premium Divider
export function PremiumDivider({ className = '' }) {
  return (
    <div className={`divider-glow my-6 ${className}`} />
  );
}

// Data Table Cell with Premium Styling
export function DataCell({ children, highlight = false, className = '' }) {
  return (
    <td className={`px-4 py-3 text-sm text-gray-300 border-b border-blue-900/20 ${highlight ? 'text-blue-300 font-medium' : ''} ${className}`}>
      {children}
    </td>
  );
}

// Premium Stats Box
export function StatsBox({ label, value, trend, icon, className = '' }) {
  return (
    <PremiumCard className={`p-6 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-gray-400 text-sm mb-2">{label}</p>
          <p className="text-2xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
            {value}
          </p>
        </div>
        {icon && <div className="text-2xl text-blue-400 opacity-50">{icon}</div>}
      </div>
      {trend && (
        <div className={`text-xs font-semibold ${trend.positive ? 'text-green-400' : 'text-red-400'}`}>
          {trend.positive ? '↑' : '↓'} {trend.value}% {trend.label}
        </div>
      )}
    </PremiumCard>
  );
}

export default {
  PremiumButton,
  PremiumCard,
  PremiumBadge,
  GradientText,
  PremiumInput,
  FloatingContainer,
  SectionHeader,
  PremiumLoader,
  PremiumDivider,
  DataCell,
  StatsBox,
};
