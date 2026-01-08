import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Player } from '../../types';
interface PlayerState {
  players: Player[];
  isLoading: boolean;
  error: string | null;
}
const initialState: PlayerState = {
  players: [],
  isLoading: false,
  error: null
};
const playerSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setPlayers: (state, action: PayloadAction<Player[]>) => {
      state.players = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    addPlayer: (state, action: PayloadAction<Player>) => {
      state.players.push(action.payload);
    },
    updatePlayer: (state, action: PayloadAction<Player>) => {
      const index = state.players.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.players[index] = action.payload;
      }
    },
    removePlayer: (state, action: PayloadAction<string>) => {
      state.players = state.players.filter(p => p.id !== action.payload);
    },
    removePlayersByClub: (state, action: PayloadAction<string>) => {
      state.players = state.players.filter(p => p.clubId !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});
export const {
  setPlayers,
  addPlayer,
  updatePlayer,
  removePlayer,
  removePlayersByClub,
  setLoading,
  setError
} = playerSlice.actions;
export default playerSlice.reducer;