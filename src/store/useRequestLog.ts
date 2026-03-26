import { create, type StateCreator } from 'zustand';
import type { Filters } from '../types/Filters';
import type { RequestEntry } from '../types/RequestEntry';
import type { Status } from '../types/Status';

interface InitialState {
  log: RequestEntry[];
  filter: Filters;
}

interface Actions {
  addRequest: (status: Status, delay: number) => void;
  setFilter: (filter: Filters) => void;
}

interface RequestLogState extends InitialState, Actions {}

const initialState: InitialState = {
  log: [],
  filter: 'all',
};

const requestLog: StateCreator<RequestLogState> = (set) => ({
  ...initialState,
  addRequest: (status, delay) =>
    set((state) => {
      const newEntry: RequestEntry = {
        time: Date.now(),
        status,
        delay,
      };

      const updated = [newEntry, ...state.log].slice(0, 10);
      return { log: updated };
    }),
  setFilter: (filter) => set({ filter }),
});

const useRequestLog = create<RequestLogState>(requestLog);

export const useLog = () => useRequestLog((state) => state.log);
export const useFilter = () => useRequestLog((state) => state.filter);

export const addRequest = (status: Status, delay: number) =>
  useRequestLog.getState().addRequest(status, delay);

export const setFilter = (filter: Filters) =>
  useRequestLog.getState().setFilter(filter);
