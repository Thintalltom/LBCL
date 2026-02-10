import { apiSlice } from "../apiSlice";
import { Club } from "../../../types";
export const clubApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClubs: builder.query<Club[], void>({
      query: () => "clubs/list/",
      providesTags: ["Club"],
    }),
    getClub: builder.query<Club, string>({
      query: (id) => `/clubs/${id}/`,
      providesTags: (result, error, id) => [
        {
          type: "Club",
          id,
        },
      ],
    }),
    createClub: builder.mutation<Club, any>({
      query: (club) => ({
        url: "clubs/",
        method: "POST",
        body: club,
      }),
      invalidatesTags: ["Club"],
    }),
    updateClub: builder.mutation<
      Club,
      {
        id: string;
        data: Partial<Club>;
      }
    >({
      query: ({ id, data }) => ({
        url: `/clubs/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        {
          type: "Club",
          id,
        },
      ],
    }),
    deleteClub: builder.mutation<void, string>({
      query: (id) => ({
        url: `/clubs/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Club"],
    }),
  }),
});
export const {
  useGetClubsQuery,
  useGetClubQuery,
  useCreateClubMutation,
  useUpdateClubMutation,
  useDeleteClubMutation,
} = clubApi;
