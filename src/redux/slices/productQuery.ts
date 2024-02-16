// actually, it is working great!!

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ProductType } from "../../misc/productTypes";

const productQueries = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/products" }),
    tagTypes: ["Product"],
    endpoints: (builder) => ({
        getAllProducts: builder.query<ProductType[], void>({
            query: () => "",
            providesTags: ["Product"],
        }),

        // example here https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced
        getProductById: builder.query({
            query: (id: number) => `${id}`,
            providesTags: (result, error, arg) => [{ type: "Product", id:arg }],
        }),
        getProductsByCategory: builder.query<ProductType[], string>({
            query: (category) => `category/${category}`,
            providesTags: ["Product"],
        }),
    }),
})

export const { useGetAllProductsQuery, useGetProductByIdQuery, useGetProductsByCategoryQuery } = productQueries;
export default productQueries;