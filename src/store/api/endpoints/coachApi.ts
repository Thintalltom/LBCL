import { apiSlice } from "../apiSlice";
import { Coach } from "../../../types";
export const coachApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCoaches: builder.query<Coach[], string | void>({
      query: (clubId) => (clubId ? `/coaches?clubId=${clubId}/` : "/coaches/"),
      providesTags: ["Coach"],
    }),
    getCoach: builder.query<Coach, string>({
      query: (id) => `/coaches/${id}/`,
      providesTags: (result, error, id) => [
        {
          type: "Coach",
          id,
        },
      ],
    }),
    createCoach: builder.mutation<Coach, Omit<Coach, "id">>({
      query: (coach) => ({
        url: `clubs/${coach.clubId}/coaches/`,
        method: "POST",
        body: coach,
      }),
      invalidatesTags: ["Coach"],
    }),
    updateCoach: builder.mutation<
      Coach,
      {
        id: string;
        data: Partial<Coach>;
      }
    >({
      query: ({ id, data }) => ({
        url: `/coaches/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        {
          type: "Coach",
          id,
        },
      ],
    }),
    deleteCoach: builder.mutation<void, string>({
      query: (id) => ({
        url: `/coaches/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coach"],
    }),
  }),
});
export const {
  useGetCoachesQuery,
  useGetCoachQuery,
  useCreateCoachMutation,
  useUpdateCoachMutation,
  useDeleteCoachMutation,
} = coachApi;
