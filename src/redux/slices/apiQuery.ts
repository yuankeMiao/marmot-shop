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

    login: builder.mutation({
      query: (loginData: LoginType) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...loginData },
      }),
      invalidatesTags: ["User"],
    }),

    getCurrentUser: builder.query({
      query: (token) => {
          return {
            url: "/auth/me",
            headers: {
              authorization: `Bearer ${token}`,
            },
          };
      },
      providesTags: ["User"],
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
  useGetCurrentUserQuery,
} = apiQueries;

export default apiQueries;
