import apiQueries from "./apiQuery";
import { LoginType, UserType } from "../../misc/userTypes";

const userApi = apiQueries.injectEndpoints({
  endpoints: (builder) => ({
    // user related queries

    login: builder.mutation({
      query: (loginData: LoginType) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...loginData },
      }),
      invalidatesTags: ["User"],
    }),

    register: builder.mutation({
      query: (registerData: Omit<UserType, "id">) => ({
        url: "/users/add",
        method: "POST",
        body: { ...registerData },
      }),
      invalidatesTags: ["User"],
    }),

    getCurrentUser: builder.query({
      query: (token: string | null) => {
        return {
          url: "/auth/me",
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["User"],
      transformResponse: (response: any): UserType => {
        return {
          id: response.id,
          username: response.username,
          email: response.email,
          firstName: response.firstName,
          lastName: response.lastName,
          image: response.image,
          address: response.address,
        };
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetCurrentUserQuery } = userApi;
