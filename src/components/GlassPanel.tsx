import { ReactNode } from 'react';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
}

function GlassPanel({ children, className = '' }: GlassPanelProps) {
  return (
    <div className={`relative max-w-[420px] w-full mx-4 ${className}`}>
      {/* Main panel */}
      <div
        className="relative z-10 p-8"
        style={{
          background: 'rgba(10, 14, 20, 0.8)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(45, 229, 217, 0.3)',
          boxShadow: `
            0 0 30px rgba(45, 229, 217, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.05)
          `,
        }}
      >
        {children}
      </div>

      {/* Corner brackets */}
      <div className="absolute top-0 left-0 w-4 h-4">
        <div
          className="absolute top-0 left-0 w-full"
          style={{ height: '1px', background: 'var(--accent-cyan)', boxShadow: '0 0 8px var(--accent-cyan)' }}
        />
        <div
          className="absolute top-0 left-0 h-full"
          style={{ width: '1px', background: 'var(--accent-cyan)', boxShadow: '0 0 8px var(--accent-cyan)' }}
        />
      </div>

      <div className="absolute top-0 right-0 w-4 h-4">
        <div
          className="absolute top-0 right-0 w-full"
          style={{ height: '1px', background: 'var(--accent-cyan)', boxShadow: '0 0 8px var(--accent-cyan)' }}
        />
        <div
          className="absolute top-0 right-0 h-full"
          style={{ width: '1px', background: 'var(--accent-cyan)', boxShadow: '0 0 8px var(--accent-cyan)' }}
        />
      </div>

      <div className="absolute bottom-0 left-0 w-4 h-4">
        <div
          className="absolute bottom-0 left-0 w-full"
          style={{ height: '1px', background: 'var(--accent-cyan)', boxShadow: '0 0 8px var(--accent-cyan)' }}
        />
        <div
          className="absolute bottom-0 left-0 h-full"
          style={{ width: '1px', background: 'var(--accent-cyan)', boxShadow: '0 0 8px var(--accent-cyan)' }}
        />
      </div>

      <div className="absolute bottom-0 right-0 w-4 h-4">
        <div
          className="absolute bottom-0 right-0 w-full"
          style={{ height: '1px', background: 'var(--accent-cyan)', boxShadow: '0 0 8px var(--accent-cyan)' }}
        />
        <div
          className="absolute bottom-0 right-0 h-full"
          style={{ width: '1px', background: 'var(--accent-cyan)', boxShadow: '0 0 8px var(--accent-cyan)' }}
        />
      </div>
    </div>
  );
}

export default GlassPanel;
