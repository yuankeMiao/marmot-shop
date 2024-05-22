/*
For the api queries, I put all queries and mutations here, 
because it is recommended to use only one createApi function for one base url
*/

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  ProductReadDto,
  ProductQueryOptionsType,
  ProductCreateDto,
  ProductUpdateDto,
} from "../../misc/productTypes";
import { BACKEND_URL } from "../../misc/constants";
import { QueryResponse } from "../../misc/generalTypes";

const apiQueries = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Product", "Category", "User", "Cart", "Review"],
  endpoints: (builder) => ({
    // get product related queries
    getAllProducts: builder.query<QueryResponse<ProductReadDto>, ProductQueryOptionsType>({
      query: ({
        limit = 20, // default limit
        offset = 0, // default offset
        sortBy,
        sortOrder,
        title,
        minPrice,
        maxPrice,
        categoryId,
        inStock,
      }) => {
        const params = new URLSearchParams();
        if (title) params.append("title", title);
        if (minPrice !== undefined)
          params.append("minPrice", minPrice.toString());
        if (maxPrice !== undefined)
          params.append("maxPrice", maxPrice.toString());
        if (categoryId) params.append("categoryId", categoryId);
        if (inStock !== undefined)
          params.append("in_stock", inStock.toString());
        if (limit) params.append("limit", limit.toString());
        if (offset) params.append("offset", offset.toString());
        if (sortBy) params.append("sortBy", sortBy);
        if (sortOrder) params.append("sortOrder", sortOrder);

        return `/products?${params.toString()}`;
      },
      providesTags: ["Product"],
    }),

    getProductsBySearch: builder.query<QueryResponse<ProductReadDto>, string>({
      query: (searchValue: string) => `/products?title=${searchValue}`,
    }),

    getProductById: builder.query({
      query: (id: string) => `/products/${id}`,
      providesTags:["Product"],
    }),

    // mutations
    createNewProduct: builder.mutation({
      query: (newProduct: ProductCreateDto) => ({
        url: "/products",
        method: "POST",
        body: { ...newProduct },
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, updateData }: {id: string, updateData: ProductUpdateDto}) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: updateData ,
      }),
      invalidatesTags:["Product"],
    }),

    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useLazyGetProductsBySearchQuery,
  useGetProductByIdQuery,
  useCreateNewProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = apiQueries;

export default apiQueries;
