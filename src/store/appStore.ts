import { create } from 'zustand';
import { Agent, SearchFilters, MapBounds, SearchLocation } from '@/types';

interface AppState {
  agents: Agent[];
  filteredAgents: Agent[];
  selectedAgent: Agent | null;
  searchLocation: SearchLocation | null;
  filters: SearchFilters;
  mapBounds: MapBounds | null;
  isMapView: boolean;
  
  setAgents: (agents: Agent[]) => void;
  setFilteredAgents: (agents: Agent[]) => void;
  setSelectedAgent: (agent: Agent | null) => void;
  setSearchLocation: (location: SearchLocation | null) => void;
  setFilters: (filters: Partial<SearchFilters>) => void;
  setMapBounds: (bounds: MapBounds | null) => void;
  setIsMapView: (isMapView: boolean) => void;
  resetFilters: () => void;
}

const defaultFilters: SearchFilters = {
  commission_min: 0,
  commission_max: 3,
  min_rating: 0,
  min_experience: 0,
  specialties: [],
  languages: [],
  sort_by: 'commission',
  sort_order: 'asc',
};

export const useAppStore = create<AppState>((set) => ({
  agents: [],
  filteredAgents: [],
  selectedAgent: null,
  searchLocation: null,
  filters: defaultFilters,
  mapBounds: null,
  isMapView: true,
  
  setAgents: (agents) => set({ agents }),
  setFilteredAgents: (filteredAgents) => set({ filteredAgents }),
  setSelectedAgent: (selectedAgent) => set({ selectedAgent }),
  setSearchLocation: (searchLocation) => set({ searchLocation }),
  setFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters }
  })),
  setMapBounds: (mapBounds) => set({ mapBounds }),
  setIsMapView: (isMapView) => set({ isMapView }),
  resetFilters: () => set({ filters: defaultFilters }),
}));
