import apiQueries from "./apiQuery";
import {
  AuthTokens,
  UserCreateDto,
  UserCredential,
  UserReadDto,
  UserUpdateDto,
} from "../../misc/userTypes";

const authApi = apiQueries.injectEndpoints({
  endpoints: (builder) => ({
    // user related queries

    login: builder.mutation<AuthTokens, UserCredential>({
      query: (loginData: UserCredential) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...loginData },
      }),
      invalidatesTags: ["User"],
    }),

    register: builder.mutation({
      query: (registerData: UserCreateDto) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...registerData },
      }),
      invalidatesTags: ["User"],
    }),

    refreshToken: builder.query({
      query: () => ({
        url: `/auth/refresh`,
        method: "GET",
        body: {
          refreshToken: localStorage.getItem("refreshToken"),
        },
      }),
    }),

    updateUser: builder.mutation({
      query: (updateData: UserUpdateDto) => ({
        url: `/users/profile`,
        method: "PUT",
        body: { ...updateData },
      }),
      invalidatesTags: ["User"],
    }),

    getProfile: builder.query<UserReadDto, void>({
      query: () => ({
        url: `/users/profile`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: `/auth/logout`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLazyRefreshTokenQuery,
  useUpdateUserMutation,
  useLazyGetProfileQuery,
  useLogoutMutation,
} = authApi;

export default authApi;
