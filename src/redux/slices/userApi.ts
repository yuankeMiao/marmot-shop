import apiQueries from "./apiQuery";
import {
  UserCreateDto,
  UserReadDto,
  UserUpdateDto,
  UserQueryOptionType,
} from "../../misc/userTypes";
import {
  AddressReadDto,
  AddressCreateDto,
  AddressUpdateDto,
} from "../../misc/userTypes";
import { QueryResponse } from "../../misc/generalTypes";

const buildQueryParams = (options: UserQueryOptionType) => {
  const { limit = 20, offset = 0, sortBy, sortOrder, role, searchName } = options;
  const params = new URLSearchParams();

  if (limit) params.append("limit", limit.toString());
  if (offset) params.append("offset", offset.toString());
  if (sortBy) params.append("sortBy", sortBy);
  if (sortOrder) params.append("sortOrder", sortOrder);
  if (role) params.append("role", role);
  if (searchName) params.append("searchName", searchName);

  return params.toString();
};

const UserApi = apiQueries.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<QueryResponse<UserReadDto>, UserQueryOptionType>({
      query: (options) => `/users?${buildQueryParams(options)}`,
      providesTags: ["User"],
    }),

    getUserById: builder.query<UserReadDto, string>({
      query: (id) => `/users/${id}`,
      providesTags: ["User"],
    }),

    createUser: builder.mutation<UserReadDto, UserCreateDto>({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),

    updateUser: builder.mutation<UserReadDto, { id: string; updateData: UserUpdateDto }>({
      query: ({ id, updateData }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: updateData,
      }),
      invalidatesTags:["User"],
    }),

    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "User", id }],
    }),

    getUserProfile: builder.query<UserReadDto, void>({
      query: () => `/users/profile`,
      providesTags: ["User"],
    }),

    updateUserProfile: builder.mutation<UserReadDto, UserUpdateDto>({
      query: (updateData) => ({
        url: `/users/profile`,
        method: "PUT",
        body: updateData,
      }),
      invalidatesTags: ["User"],
    }),

    getAddressBookByUserId: builder.query<AddressReadDto[], void>({
      query: () => `/users/profile/addresses`,
      providesTags: ["Address"],
    }),

    getAddressById: builder.query<AddressReadDto, string>({
      query: (id) => `/users/profile/addresses/${id}`,
      providesTags: ["Address"],
    }),

    addAddress: builder.mutation<AddressReadDto, AddressCreateDto>({
      query: (address) => ({
        url: `/users/profile/addresses`,
        method: "POST",
        body: address,
      }),
      invalidatesTags: ["Address"],
    }),

    updateAddressById: builder.mutation<AddressReadDto, { id: string; updateData: AddressUpdateDto }>({
      query: ({ id, updateData }) => ({
        url: `/users/profile/addresses/${id}`,
        method: "PUT",
        body: updateData,
      }),
      invalidatesTags: ["Address"],
    }),

    deleteAddressById: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/profile/addresses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Address"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useGetAddressBookByUserIdQuery,
  useGetAddressByIdQuery,
  useAddAddressMutation,
  useUpdateAddressByIdMutation,
  useDeleteAddressByIdMutation,
} = UserApi;

export default UserApi;
