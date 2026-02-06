import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../index";

// Base API configuration
// TODO: Update this URL when your backend is ready
// const BASE_URL = "https://lsbc-backend-1.onrender.com/api/";
const BASE_URL = "http://127.0.0.1:8000/api/";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Get token from auth state
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Club", "Player", "Coach", "Auth"],
  endpoints: () => ({}),
});

// Export hooks for usage in components
// export const {} = apiSlice;
