import { BaseDto, BaseQueryOptionType } from "./generalTypes";

// order items
export interface OrderProductBase {
  productId: string;
  title: string;
  thumbnail: string;
  actualPrice: number;
  quantity: number;
  totalPrice: number;
}
export interface OrderProductReadDto
  extends OrderProductBase,
    Partial<BaseDto> {}
export interface OrderProductCreateDto
  extends Pick<OrderProductBase, "productId" | "quantity"> {}

// order
export type OrderStatusType =
  | "Shipped"
  | "Pending"
  | "AwaitingPayment"
  | "Processing"
  | "Shipping"
  | "Completed"
  | "Refunded"
  | "Cancelled";
export interface OrderBase {
  userId: string;
  status: OrderStatusType;
  products: OrderProductBase[];
  shippingAddress: string;
}
export interface OrderReadDto extends Omit<OrderBase, "products">, BaseDto {
  products: OrderProductReadDto[];
}
export interface OrderCreateDto  {
  shippingAddress: string;
  products: OrderProductCreateDto[];
}
export interface OrderUpdateDto extends Pick<OrderBase, "status"> {}

// query options
export interface OrderQueryOptionsType extends BaseQueryOptionType {
  status?: OrderStatusType;
  sortBy?: "CreatedDate" | "UpdatedDate";
}
