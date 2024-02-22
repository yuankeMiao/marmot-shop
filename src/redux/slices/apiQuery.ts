// actually, it is working great!!
// for the auth part, I learned from this video: https://www.youtube.com/watch?v=-JJFQ9bkUbo

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ProductQueryType, ProductType } from "../../misc/productTypes";
import { DUMMYJSON_URL } from "../../misc/constants";
import { AppState } from "../store";
import { LoginType, UserType } from "../../misc/userTypes";

const apiQueries = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: DUMMYJSON_URL,
    // prepareHeaders: (headers, { getState }) => {
    //   console.log('prepareHeaders is called');
    //   // const state = getState() as AppState;
    //   // const token = state.auth.accessToken;
    //   const token = window.localStorage.getItem("token");
    //   console.log('token', token);
    //   if (token) {
    //     headers.set("authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  tagTypes: ["Product", "User"],
  endpoints: (builder) => ({

    getAllProducts: builder.query({
      query: (limit: number) => `products/?limit=${limit}`,
      providesTags: ["Product"],
      transformResponse: (response: ProductQueryType) => {
        return response.products;
      },
    }),

    /* 
    NOTE:
    this reducer is actually a "fake" reducer, bacause the api I am using does not have a sort query
    so I use the transformResponse to sort the products in the frontend, the endpoint of this reducer is actually the same with getAllProducts
    thus, this reducer is not working with pagination, because it only sort after the data is fetched
    but since our assignmnent requires us to use the sort reducer, I have to implement it
    */
    getSortedProducts: builder.query({
      query: ({ limit, sort }: { limit: number; sort: string }) =>
        `products/?limit=${limit}`,
      providesTags: ["Product"],
      transformResponse: (response: ProductQueryType, meta, arg) => {
        if (arg.sort === "asc") {
          return response.products.sort((a, b) => a.price - b.price);
        } else if (arg.sort === "desc") {
          return response.products.sort((a, b) => b.price - a.price);
        } else {
          return response.products;
        }
      },
    }),

    getProductById: builder.query({
      query: (id: number) => `products/${id}`,
      providesTags: (result, error, arg) => [{ type: "Product", id: arg }],
    }),

    // the same with the sorting here
    getProductsByCategory: builder.query({
      query: ({ category, sort }: { category: string; sort: string }) =>
        `products/category/${category}`,
      providesTags: ["Product"],
      transformResponse: (response: ProductQueryType, meta, arg) => {
        if (arg.sort === "asc") {
          return response.products.sort((a, b) => a.price - b.price);
        } else if (arg.sort === "desc") {
          return response.products.sort((a, b) => b.price - a.price);
        } else {
          return response.products;
        }
      },
    }),

    getProductsBySearch: builder.query<ProductType[], string>({
      query: (search) => `products/search?q=${search}`,
      providesTags: ["Product"],
      transformResponse: (response: ProductQueryType) => {
        return response.products;
      },
    }),

    createNewProduct: builder.mutation({
      query: (newProduct: Omit<ProductType, 'id'>) => ({
        url: "/products/add",
        method: "POST",
        body: { ...newProduct },
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      query: (updateData: Partial<ProductType>) => ({
        url: `/products/${updateData.id}`,
        method: "PUT",
        body: { ...updateData },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Product", id: arg.id }],
    }),

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
        }
    }),

  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
  useGetProductsBySearchQuery,
  useGetSortedProductsQuery,
  useLoginMutation,
  useRegisterMutation,
  useGetCurrentUserQuery,
} = apiQueries;

export default apiQueries;
