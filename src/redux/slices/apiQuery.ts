
/*
For the api queries, I put all queries and mutations here, 
because it is recommended to use only one createApi function for one base url
*/ 

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ProductQueryType, ProductType } from "../../misc/productTypes";
import { DUMMYJSON_URL } from "../../misc/constants";

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
  tagTypes: ["Product", "User", "Cart"],
  endpoints: (builder) => ({


    // product related queries

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

    //https://dummyjson.com/products/search?q=phone
    getProductsBySearch: builder.query<ProductType[], string>({
      query: (search) => `products/search?q=${search}`,
      providesTags: ["Product"],
      transformResponse: (response: ProductQueryType) => {
        console.log("search query called");
        return response.products;
      },
    }),

    /* 
    for all the mutations, they will not really change the data in the server,
    because for the api I am using, I cannot change the database, 
    it will only return a data to tell me if the mutation is successful or not.

    However, I have all the queries and mutations tested on mock server,
    to make sure they are working as expected
    */

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

    deleteProduct: builder.mutation({
      query: (id: number) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Product", id }],
    }),

  }),
});

export const {
  useGetAllProductsQuery,
  useGetSortedProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
  useLazyGetProductsBySearchQuery,
  useCreateNewProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = apiQueries;

export default apiQueries;
