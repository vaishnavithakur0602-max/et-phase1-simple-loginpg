import { Suspense, useState, useEffect, useRef, useCallback } from 'react';
import Spline from '@splinetool/react-spline';
import type { Application } from '@splinetool/runtime';
import { useDashboardStore } from '../store/dashboardStore';
import { RefreshCw, AlertTriangle } from 'lucide-react';

const SCENE_URL = import.meta.env.VITE_SPLINE_SCENE_URL as string | undefined;

type LoadState = 'loading' | 'ready' | 'error';

function GridTexture() {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          'linear-gradient(rgba(45,229,217,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(45,229,217,0.04) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    />
  );
}

function ScanLoader() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
      <GridTexture />
      <div className="relative w-24 h-24">
        {/* rotating sweep */}
        <div
          className="absolute inset-0 rounded-full"
          style={{ border: '1px solid rgba(45,229,217,0.2)' }}
        />
        <div
          className="absolute inset-0 rounded-full animate-spin"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(45,229,217,0.6) 350deg, transparent 360deg)',
            maskImage: 'radial-gradient(circle, transparent 58%, black 60%)',
            WebkitMaskImage: 'radial-gradient(circle, transparent 58%, black 60%)',
            animationDuration: '1.2s',
          }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{ border: '1px solid rgba(45,229,217,0.4)', boxShadow: 'inset 0 0 12px rgba(45,229,217,0.15)' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" style={{ boxShadow: '0 0 8px var(--accent-cyan)' }} />
        </div>
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="font-mono text-xs text-accent-cyan tracking-widest" style={{ textShadow: '0 0 8px rgba(45,229,217,0.4)' }}>
          INITIALIZING GLOBE FEED<span className="animate-pulse">...</span>
        </span>
        <span className="font-mono text-[10px] text-zinc-600">ACQUIRING SATELLITE UPLINK</span>
      </div>
    </div>
  );
}

function ErrorPanel({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
      <GridTexture />
      <AlertTriangle className="w-10 h-10 text-amber-400" strokeWidth={1.5} style={{ filter: 'drop-shadow(0 0 8px rgba(255,176,32,0.5))' }} />
      <div className="flex flex-col items-center gap-1">
        <span className="font-mono text-sm text-amber-400 tracking-wider">SCENE LOAD FAILURE</span>
        <span className="font-mono text-[10px] text-zinc-500">Globe feed could not be established</span>
      </div>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-4 py-2 font-mono text-xs text-accent-cyan transition-all duration-150 hover:bg-accent-cyan/10"
        style={{ border: '1px solid var(--border-hair)' }}
      >
        <RefreshCw className="w-3.5 h-3.5" />
        RETRY UPLINK
      </button>
    </div>
  );
}

function PlaceholderCanvas() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
      <GridTexture />
      <div className="relative">
        <div className="w-16 h-16 rounded-full" style={{ border: '1px dashed rgba(45,229,217,0.3)' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-accent-cyan/30 animate-pulse" />
        </div>
      </div>
      <span className="font-mono text-xs text-zinc-600 tracking-widest">GLOBE VIEWPORT — PHASE 3</span>
      <span className="font-mono text-[10px] text-zinc-700">SPLINE_SCENE_URL not configured</span>
    </div>
  );
}

function MainCanvas() {
  const { setSplineApp } = useDashboardStore();
  const [loadState, setLoadState] = useState<LoadState>(SCENE_URL ? 'loading' : 'ready');
  const [retryKey, setRetryKey] = useState(0);
  const [hasScene, setHasScene] = useState(!!SCENE_URL);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasScene(!!SCENE_URL);
  }, [retryKey]);

  const handleLoad = useCallback(
    (splineApp: Application) => {
      setSplineApp(splineApp);
      setLoadState('ready');
      try {
        const objects = splineApp.getAllObjects();
        const names = objects.map((o) => o.name).filter(Boolean);
        console.log('[Spline] Scene loaded. Object count:', objects.length);
        console.log('[Spline] Object names:', names);
      } catch (e) {
        console.warn('[Spline] Could not enumerate objects', e);
      }
    },
    [setSplineApp],
  );

  const handleRetry = () => {
    setLoadState('loading');
    setRetryKey((k) => k + 1);
  };

  return (
    <main className="relative flex-1 overflow-hidden bg-bg-base">
      <div ref={sceneRef} className="absolute inset-0">
        {hasScene && loadState !== 'error' && (
          <Suspense fallback={<ScanLoader />}>
            <Spline
              key={retryKey}
              scene={SCENE_URL!}
              onLoad={handleLoad}
              onError={() => setLoadState('error')}
              style={{ width: '100%', height: '100%', opacity: loadState === 'ready' ? 1 : 0, transition: 'opacity 0.6s ease' }}
            />
          </Suspense>
        )}

        {hasScene && loadState === 'loading' && <ScanLoader />}

        {hasScene && loadState === 'error' && <ErrorPanel onRetry={handleRetry} />}

        {!hasScene && <PlaceholderCanvas />}
      </div>

      {/* subtle vignette for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(5,7,10,0.5) 100%)' }}
      />
    </main>
  );
}

export default MainCanvas;
