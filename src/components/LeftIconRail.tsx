import { Globe, Layers, FileBarChart, Search, Settings } from 'lucide-react';
import { useDashboardStore, type RailView } from '../store/dashboardStore';

const NAV_ITEMS: { id: RailView; icon: typeof Globe; label: string }[] = [
  { id: 'globe', icon: Globe, label: 'Globe View' },
  { id: 'layers', icon: Layers, label: 'Layers' },
  { id: 'reports', icon: FileBarChart, label: 'Reports' },
  { id: 'search', icon: Search, label: 'Search' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

function LeftIconRail() {
  const { activeView, setActiveView } = useDashboardStore();

  return (
    <nav
      className="fixed left-0 top-14 bottom-7 z-40 w-16 flex flex-col items-center py-4 gap-2 bg-bg-panel/90 backdrop-blur-md"
      style={{ borderRight: '1px solid var(--border-hair)' }}
    >
      {NAV_ITEMS.map(({ id, icon: Icon, label }) => {
        const active = activeView === id;
        return (
          <button
            key={id}
            onClick={() => setActiveView(id)}
            className="relative w-12 h-12 flex items-center justify-center group"
            title={label}
          >
            {/* glowing left border indicator */}
            {active && (
              <span
                className="absolute left-0 top-1/2 -translate-y-1/2 h-7 w-[2px]"
                style={{ background: 'var(--accent-cyan)', boxShadow: '0 0 10px var(--accent-cyan), 0 0 20px rgba(45,229,217,0.4)' }}
              />
            )}
            <Icon
              className={`w-5 h-5 transition-all duration-200 ${active ? 'text-accent-cyan' : 'text-zinc-500 group-hover:text-zinc-300'}`}
              strokeWidth={1.5}
              style={active ? { filter: 'drop-shadow(0 0 4px rgba(45,229,217,0.6))' } : undefined}
            />
            {/* tooltip */}
            <span
              className="absolute left-full ml-2 px-2 py-1 font-mono text-[10px] text-zinc-200 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity"
              style={{ background: 'rgba(10,14,20,0.95)', border: '1px solid var(--border-hair)' }}
            >
              {label.toUpperCase()}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

export default LeftIconRail;
