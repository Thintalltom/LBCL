import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './slices/authSlice';
import clubReducer from './slices/clubSlice';
import playerReducer from './slices/playerSlice';
import coachReducer from './slices/coachSlice';
import { apiSlice } from './api/apiSlice';
import { chatSlice } from './api/chatbotSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    clubs: clubReducer,
    players: playerReducer,
    coaches: coachReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [chatSlice.reducerPath]: chatSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks for use throughout the app
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;