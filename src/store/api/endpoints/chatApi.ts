import { chatSlice } from "../chatbotSlice";

export const chatApi = chatSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation<{ response: string }, { text: string }>({
      query: ({ text }) => ({
        url: "/prompt",
        method: "POST",
        body: { text },
        }),
        }),
    }),
});

export const { useSendMessageMutation } = chatApi;