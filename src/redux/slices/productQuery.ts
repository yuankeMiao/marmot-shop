// actually, it is working great!!

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ProductType } from "../../types/productTypes";

const productQueries = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/products" }),
    tagTypes: ["Product"],
    endpoints: (builder) => ({
        getAllProducts: builder.query<ProductType[], void>({
            query: () => "",
            providesTags: ["Product"],
        }),

        // not sure if it is correct, found the example here https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced
        getProductById: builder.query({
            query: (id: number) => `${id}`,
            providesTags: (result, error, arg) => [{ type: "Product", id:arg }],
        }),
    }),
})

export const { useGetAllProductsQuery, useGetProductByIdQuery } = productQueries;
export default productQueries;