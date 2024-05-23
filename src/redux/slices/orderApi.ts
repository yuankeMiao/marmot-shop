import apiQueries from "./apiQuery";
import {
  OrderCreateDto,
  OrderQueryOptionsType,
  OrderReadDto,
  OrderUpdateDto,
} from "../../misc/orderTypes";
import { QueryResponse } from "../../misc/generalTypes";

const buildQueryParams = (options: OrderQueryOptionsType) => {
  const { limit = 20, offset = 0, sortBy, sortOrder, status } = options;
  const params = new URLSearchParams();

  if (limit) params.append("Limit", limit.toString());
  if (offset) params.append("Offset", offset.toString());
  if (sortBy) params.append("SortBy", sortBy);
  if (sortOrder) params.append("SortOrder", sortOrder);
  if (status) params.append("Status", status);

  console.log(params.toString())
  return params.toString();
};

const OrderApi = apiQueries.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query<QueryResponse<OrderReadDto>, OrderQueryOptionsType>({
      query: (options) => `/orders?${buildQueryParams(options)}`,
      providesTags: ["Order"],
    }),

    getOrderById: builder.query<OrderReadDto, string>({
      query: (id) => `/orders/${id}`,
      providesTags: (result, error, arg) => [{ type: "Order", id: arg }],
    }),

    getAllOrdersByUserId: builder.query<QueryResponse<OrderReadDto>, { userId: string; options: OrderQueryOptionsType }>({
      query: ({ userId, options }) => `/orders/user/${userId}?${buildQueryParams(options)}`,
      providesTags: ["User", "Order"],
    }),

    getMyOrders: builder.query<QueryResponse<OrderReadDto>, OrderQueryOptionsType>({
      query: (options) => `/orders/my-orders?${buildQueryParams(options)}`,
      providesTags: ["Order"],
    }),

    createOrder: builder.mutation<OrderReadDto, OrderCreateDto>({
      query: (order) => ({
        url: "/orders",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Order"],
    }),

    updateOrder: builder.mutation<OrderReadDto, { id: string; updateData: OrderUpdateDto }>({
      query: ({ id, updateData }) => ({
        url: `/orders/${id}`,
        method: "PUT",
        body: updateData,
      }),
      invalidatesTags: ["Order"],
    }),

    deleteOrder: builder.mutation<void, string>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Order", id }],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useGetAllOrdersByUserIdQuery,
  useGetMyOrdersQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = OrderApi;

export default OrderApi;
