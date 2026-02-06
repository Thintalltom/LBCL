import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const CHAT_URL = 'https://lsbc-chatbot.onrender.com'
export const chatSlice = createApi({
    reducerPath: 'chatbot',
    baseQuery: fetchBaseQuery({
        baseUrl: CHAT_URL,
        prepareHeaders: (headers) => {
            headers.set("Content-Type", "application/json");
            return headers;
        },
    }),
    endpoints: () => ({}),
});