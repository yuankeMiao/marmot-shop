import { UUID } from "crypto";
import apiQueries from "./apiQuery";
import {
  CategoryCreateDto,
  CategoryReadDto,
  CategoryUpdateDto,
} from "../../misc/categoryTypes";
import userApi from "./userApi";

const categoryApi = apiQueries.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<Array<CategoryReadDto>, null>({
      query: () => `categories`,
      providesTags: ["Category"],
    }),

    getCategoryById: builder.query({
      query: (id: UUID) => `category/${id}`,
      providesTags: ["Category"],
    }),

    createCategory: builder.mutation({
      query: (categoryCreateDto: CategoryCreateDto) => ({
        url: "categories",
        method: "POST",
        body: { ...categoryCreateDto },
      }),
      invalidatesTags: ["Category"],
    }),

    updateCategory: builder.mutation({
      query: (categoryUpdateDto: CategoryUpdateDto) => ({
        url: "categories",
        method: "PATCH",
        body: { ...categoryUpdateDto },
      }),
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation({
      query: (id: UUID) => ({
        url: `category/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
export default categoryApi;
