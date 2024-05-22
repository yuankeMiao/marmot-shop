import apiQueries from "./apiQuery";
import { UserCreateDto, UserCredential, UserUpdateDto } from "../../misc/userTypes";

const authApi = apiQueries.injectEndpoints({
  endpoints: (builder) => ({
    // user related queries

    login: builder.mutation({
      query: (loginData:  UserCredential) => ({
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
        Authorization: `Bear ${localStorage.getItem("token")}`
      }),
      invalidatesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: (updateData: UserUpdateDto) => ({
        url: `/user/profile`,
        method: "PATCH",
        body: { ...updateData },
        Authorization: `Bear ${localStorage.getItem("token")}`
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useUpdateUserMutation } = authApi;

export default authApi;
