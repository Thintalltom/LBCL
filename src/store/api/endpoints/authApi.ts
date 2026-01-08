import { apiSlice } from '../apiSlice';
interface LoginRequest {
  email: string;
  password: string;
}
interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role?: string;
  };
  token: string;
}
export const authApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: credentials => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials
      }),
      invalidatesTags: ['Auth']
    }),
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: userData => ({
        url: '/auth/register',
        method: 'POST',
        body: userData
      }),
      invalidatesTags: ['Auth']
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST'
      }),
      invalidatesTags: ['Auth']
    }),
    getCurrentUser: builder.query<AuthResponse['user'], void>({
      query: () => '/auth/me',
      providesTags: ['Auth']
    })
  })
});
export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetCurrentUserQuery
} = authApi;