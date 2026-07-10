import { create } from 'zustand';

export type RailView = 'globe' | 'layers' | 'reports' | 'search' | 'settings';

interface DashboardState {
  activeView: RailView;
  layersPanelOpen: boolean;
  splineApp: unknown | null;
  setActiveView: (view: RailView) => void;
  toggleLayersPanel: () => void;
  setLayersPanelOpen: (open: boolean) => void;
  setSplineApp: (app: unknown | null) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  activeView: 'globe',
  layersPanelOpen: false,
  splineApp: null,
  setActiveView: (view) =>
    set((state) => ({
      activeView: view,
      // Layers icon toggles the side panel; all other icons leave it as-is
      layersPanelOpen: view === 'layers' ? !state.layersPanelOpen : state.layersPanelOpen,
    })),
  toggleLayersPanel: () => set((state) => ({ layersPanelOpen: !state.layersPanelOpen })),
  setLayersPanelOpen: (open) => set({ layersPanelOpen: open }),
  setSplineApp: (app) => set({ splineApp: app }),
}));
