import { X, MapPin } from 'lucide-react';
import { useDashboardStore } from '../store/dashboardStore';

function RightSlidePanel() {
  const { layersPanelOpen, setLayersPanelOpen } = useDashboardStore();

  return (
    <>
      {/* invisible click-catcher to close when clicking canvas */}
      {layersPanelOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setLayersPanelOpen(false)} />
      )}
      <aside
        className="fixed right-0 top-14 bottom-7 z-40 w-[360px] transition-transform duration-300 ease-out"
        style={{
          transform: layersPanelOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        <div
          className="relative h-full flex flex-col"
          style={{
            background: 'rgba(10,14,20,0.85)',
            backdropFilter: 'blur(16px)',
            borderLeft: '1px solid var(--border-hair)',
            boxShadow: '-8px 0 24px rgba(0,0,0,0.5)',
          }}
        >
          {/* header */}
          <div className="flex items-center justify-between px-4 h-12" style={{ borderBottom: '1px solid rgba(45,229,217,0.15)' }}>
            <span className="font-heading text-sm tracking-wider text-zinc-200">
              LAYERS<span className="text-accent-cyan">/DETAIL</span>
            </span>
            <button
              onClick={() => setLayersPanelOpen(false)}
              className="w-7 h-7 flex items-center justify-center text-zinc-500 hover:text-accent-cyan transition-colors"
            >
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>

          {/* body — empty state */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 gap-3">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ border: '1px dashed rgba(45,229,217,0.2)' }}
            >
              <MapPin className="w-6 h-6 text-zinc-600" strokeWidth={1.5} />
            </div>
            <span className="font-mono text-xs text-zinc-500 tracking-wider text-center">
              No location selected
            </span>
            <span className="font-mono text-[10px] text-zinc-700 text-center max-w-[240px]">
              Select a hotspot on the globe to view layered intelligence data for that region.
            </span>
          </div>

          {/* footer */}
          <div className="px-4 py-2 flex items-center justify-between" style={{ borderTop: '1px solid rgba(45,229,217,0.15)' }}>
            <span className="font-mono text-[10px] text-zinc-600">PANEL::LAYERS</span>
            <span className="font-mono text-[10px] text-zinc-600">v0.3</span>
          </div>
        </div>
      </aside>
    </>
  );
}

export default RightSlidePanel;
