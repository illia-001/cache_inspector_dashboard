import { create, type StateCreator } from 'zustand';
import type { CacheItem } from '../types/CacheItem';
import { readLocaleStorage } from '../utils/readLocaleStorage';

interface InitialState {
  items: CacheItem[];
}

interface Actions {
  refresh: () => void;
  clear: () => void;
}

interface CacheInspectorState extends InitialState, Actions {}

const initialState: InitialState = {
  items: readLocaleStorage(),
};

export const cacheInspector: StateCreator<CacheInspectorState> = (set) => ({
  ...initialState,
  refresh: () => set({ items: readLocaleStorage() }),
  clear: () => {
    localStorage.clear();
    set({ items: [] });
  },
});

const useCacheInspector = create<CacheInspectorState>(cacheInspector);

export const useItems = () => useCacheInspector((state) => state.items);
export const refreshCache = () => useCacheInspector.getState().refresh();
export const clearCache = () => useCacheInspector.getState().clear();
