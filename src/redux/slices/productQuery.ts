// actually, it is working great!!

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ProductQueryType, ProductType } from "../../misc/productTypes";
import { PRODUCTS_URL } from "../../misc/constants";

const productQueries = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: PRODUCTS_URL }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (limit: number) => `?limit=${limit}`,
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
        `?limit=${limit}`,
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
      query: (id: number) => `${id}`,
      providesTags: (result, error, arg) => [{ type: "Product", id: arg }],
    }),

    // the same with the sorting here
    getProductsByCategory: builder.query({
      query: ({category, sort}: {category: string, sort: string}) => `category/${category}`,
      providesTags: ["Product"],
      transformResponse: (response: ProductQueryType,meta, arg) => {
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
      query: (search) => `search?q=${search}`,
      providesTags: ["Product"],
      transformResponse: (response: ProductQueryType) => {
        return response.products;
      },
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
  useGetProductsBySearchQuery,
  useGetSortedProductsQuery,
} = productQueries;
export default productQueries;
