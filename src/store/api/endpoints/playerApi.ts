import { apiSlice } from '../apiSlice';
import { Player } from '../../../types';
export const playerApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPlayers: builder.query<Player[], string | void>({
      query: clubId => clubId ? `/players?clubId=${clubId}` : '/players',
      providesTags: ['Player']
    }),
    getPlayer: builder.query<Player, string>({
      query: id => `/players/${id}`,
      providesTags: (result, error, id) => [{
        type: 'Player',
        id
      }]
    }),
    createPlayer: builder.mutation<Player, Omit<Player, 'id'>>({
      query: player => ({
        url: '/players',
        method: 'POST',
        body: player
      }),
      invalidatesTags: ['Player']
    }),
    updatePlayer: builder.mutation<Player, {
      id: string;
      data: Partial<Player>;
    }>({
      query: ({
        id,
        data
      }) => ({
        url: `/players/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: (result, error, {
        id
      }) => [{
        type: 'Player',
        id
      }]
    }),
    deletePlayer: builder.mutation<void, string>({
      query: id => ({
        url: `/players/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Player']
    })
  })
});
export const {
  useGetPlayersQuery,
  useGetPlayerQuery,
  useCreatePlayerMutation,
  useUpdatePlayerMutation,
  useDeletePlayerMutation
} = playerApi;