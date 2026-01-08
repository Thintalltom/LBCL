import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coach } from '../../types';
interface CoachState {
  coaches: Coach[];
  isLoading: boolean;
  error: string | null;
}
const initialState: CoachState = {
  coaches: [],
  isLoading: false,
  error: null
};
const coachSlice = createSlice({
  name: 'coaches',
  initialState,
  reducers: {
    setCoaches: (state, action: PayloadAction<Coach[]>) => {
      state.coaches = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    addCoach: (state, action: PayloadAction<Coach>) => {
      state.coaches.push(action.payload);
    },
    updateCoach: (state, action: PayloadAction<Coach>) => {
      const index = state.coaches.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.coaches[index] = action.payload;
      }
    },
    removeCoach: (state, action: PayloadAction<string>) => {
      state.coaches = state.coaches.filter(c => c.id !== action.payload);
    },
    removeCoachesByClub: (state, action: PayloadAction<string>) => {
      state.coaches = state.coaches.filter(c => c.clubId !== action.payload);
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
  setCoaches,
  addCoach,
  updateCoach,
  removeCoach,
  removeCoachesByClub,
  setLoading,
  setError
} = coachSlice.actions;
export default coachSlice.reducer;