import { UUID } from "crypto";
import apiQueries from "./apiQuery";
import {
  CategoryCreateDto,
  CategoryReadDto,
  CategoryUpdateDto,
} from "../../misc/categoryTypes";

const categoryApi = apiQueries.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<Array<CategoryReadDto>, null>({
      query: () => `/categories`,
      providesTags: ["Category"],
    }),

    getCategoryById: builder.query({
      query: (id: UUID) => `/categories/${id}`,
      providesTags: (result, error, arg) => [{ type: "Category", id: arg }],
    }),

    createCategory: builder.mutation({
      query: (categoryCreateDto: CategoryCreateDto) => ({
        url: "/categories",
        method: "POST",
        body: { ...categoryCreateDto },
      }),
      invalidatesTags: ["Category"],
    }),

    updateCategory: builder.mutation({
      query: ({ id, ...updateData }: CategoryUpdateDto) => ({
        url: `/categories/${id}`,
        method: "PATCH",
        body: { ...updateData },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Category", id: arg.id },
      ],
    }),

    deleteCategory: builder.mutation({
      query: (id: UUID) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Category", id }],
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
