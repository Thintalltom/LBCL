import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Club } from '../../types';
interface ClubState {
  clubs: Club[];
  selectedClub: Club | null;
  isLoading: boolean;
  error: string | null;
}
const initialState: ClubState = {
  clubs: [],
  selectedClub: null,
  isLoading: false,
  error: null
};
const clubSlice = createSlice({
  name: 'clubs',
  initialState,
  reducers: {
    setClubs: (state, action: PayloadAction<Club[]>) => {
      state.clubs = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    addClub: (state, action: PayloadAction<Club>) => {
      state.clubs.push(action.payload);
    },
    updateClub: (state, action: PayloadAction<Club>) => {
      const index = state.clubs.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.clubs[index] = action.payload;
      }
    },
    removeClub: (state, action: PayloadAction<string>) => {
      state.clubs = state.clubs.filter(c => c.id !== action.payload);
    },
    setSelectedClub: (state, action: PayloadAction<Club | null>) => {
      state.selectedClub = action.payload;
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
  setClubs,
  addClub,
  updateClub,
  removeClub,
  setSelectedClub,
  setLoading,
  setError
} = clubSlice.actions;
export default clubSlice.reducer;