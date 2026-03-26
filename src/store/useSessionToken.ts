import { create, type StateCreator } from 'zustand';
import { createToken } from '../utils/generateRandomToken';
import { LocalStorageKeys } from '../types/LocalStorageKeys';

interface InitialState {
  token: string | null;
  createdAt: number | null;
}

interface Actions {
  generate: () => void;
  clear: () => void;
}

interface SessionTokenState extends InitialState, Actions {}

const initialState: InitialState = {
  token: localStorage.getItem(LocalStorageKeys.Token),
  createdAt:
    localStorage.getItem(LocalStorageKeys.CreatedAt) ?
      Number(localStorage.getItem(LocalStorageKeys.CreatedAt))
    : null,
};

const sessionToken: StateCreator<SessionTokenState> = (set) => ({
  ...initialState,
  generate: () => {
    const [newToken, createdAt] = createToken();
    set({ token: newToken, createdAt });
  },

  clear: () => {
    localStorage.clear();
    set({ token: null, createdAt: null });
  },
});

const useSessionToken = create<SessionTokenState>(sessionToken);

export const useToken = () => useSessionToken((state) => state.token);
export const useCreatedAt = () => useSessionToken((state) => state.createdAt);
export const generateToken = () => useSessionToken.getState().generate();
export const clearToken = () => useSessionToken.getState().clear();
