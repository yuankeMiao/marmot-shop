// optional - I will check later

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ProductType } from "../types/productTypes";

const productQueries = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/products" }),
    tagTypes: ["Product"],
    endpoints: (builder) => ({
        getAllProducts: builder.query<ProductType[], void>({
            query: () => "",
            providesTags: ["Product"],
        }),
    }),
})

export const { useGetAllProductsQuery } = productQueries;
export default productQueries;