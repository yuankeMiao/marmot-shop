import apiQueries from "./apiQuery";
import {
  ReviewCreateDto,
  ReviewQueryOptionsType,
  ReviewReadDto,
  ReviewUpdateDto,
} from "../../misc/reviewTypes";
import { QueryResponse } from "../../misc/generalTypes";

const buildQueryParams = (options: ReviewQueryOptionsType) => {
  const { limit = 20, offset = 0, sortBy, sortOrder, rating, hasContent } = options;
  const params = new URLSearchParams();
  
  if (rating) params.append("rating", rating.toString());
  if (hasContent) params.append("hasContent", hasContent.toString());
  if (sortBy) params.append("sortBy", sortBy);
  if (sortOrder) params.append("sortOrder", sortOrder);
  if (offset) params.append("offset", offset.toString());
  if (limit) params.append("limit", limit.toString());
  
  return params.toString();
};

const ReviewApi = apiQueries.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query<QueryResponse<ReviewReadDto>, ReviewQueryOptionsType>({
      query: (options) => `/reviews?${buildQueryParams(options)}`,
      providesTags: ["Review"],
    }),

    getReviewsByProductId: builder.query<QueryResponse<ReviewReadDto>, { productId: string; options: ReviewQueryOptionsType }>({
      query: ({ productId, options }) => 
        `/reviews/product/${productId}?${buildQueryParams(options)}`,
      providesTags: ["Product", "Review"],
    }),

    getReviewsByUserId: builder.query<QueryResponse<ReviewReadDto>, { userId: string; options: ReviewQueryOptionsType }>({
      query: ({ userId, options }) => 
        `/reviews/user/${userId}?${buildQueryParams(options)}`,
      providesTags: ["User", "Review"],
    }),

    getMyReviews: builder.query<QueryResponse<ReviewReadDto>, ReviewQueryOptionsType>({
      query: (options) => `/reviews/my-reviews?${buildQueryParams(options)}`,
      providesTags: ["Review"],
    }),

    getReviewById: builder.query<ReviewReadDto, string>({
      query: (id) => `/reviews/${id}`,
      providesTags: (result, error, arg) => [{ type: "Review", id: arg }],
    }),

    createReview: builder.mutation<ReviewReadDto, ReviewCreateDto>({
      query: (review) => ({
        url: "/reviews",
        method: "POST",
        body: review,
      }),
      invalidatesTags: ["Review"],
    }),

    updateReview: builder.mutation<ReviewReadDto, { id: string; updateData: ReviewUpdateDto }>({
      query: ({ id, updateData }) => ({
        url: `/reviews/${id}`,
        method: "PUT",
        body: updateData,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Review", id: arg.id }],
    }),

    deleteReview: builder.mutation<void, string>({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Review", id }],
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
  useGetReviewsByProductIdQuery,
  useGetReviewsByUserIdQuery,
  useGetMyReviewsQuery,
  useGetReviewByIdQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = ReviewApi;

export default ReviewApi;
