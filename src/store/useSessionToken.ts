import { create, type StateCreator } from 'zustand';
import { createToken } from '../utils/generateRandomToken';

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
  token: localStorage.getItem('cache_token'),
  createdAt:
    localStorage.getItem('cache_token_created') ?
      Number(localStorage.getItem('cache_token_created'))
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
