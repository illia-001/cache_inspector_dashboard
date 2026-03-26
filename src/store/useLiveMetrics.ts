import { create, type StateCreator } from 'zustand';
import { randomValue } from '../utils/getRandomValue';

interface InitialState {
  cpu: number;
  memory: number;
  activeSession: number;
  live: boolean;
}

interface Actions {
  toggle: () => void;
  update: () => void;
}

interface LiveMatricsState extends InitialState, Actions {}

const initialState: InitialState = {
  cpu: randomValue(),
  memory: randomValue(),
  activeSession: randomValue(),
  live: true,
};

const liveMatricsState: StateCreator<LiveMatricsState> = (set, get) => ({
  ...initialState,
  toggle: () => set({ live: !get().live }),
  update: () =>
    set({
      cpu: randomValue(),
      memory: randomValue(),
      activeSession: randomValue(),
    }),
});

const useLiveMatrics = create<LiveMatricsState>(liveMatricsState);

export const useCpu = () => useLiveMatrics((state) => state.cpu);
export const useMemory = () => useLiveMatrics((state) => state.memory);
export const useActiveSessions = () =>
  useLiveMatrics((state) => state.activeSession);
export const useLive = () => useLiveMatrics((state) => state.live);
export const updateMetrics = () => useLiveMatrics.getState().update();
export const toggleLive = () => useLiveMatrics.getState().toggle();
