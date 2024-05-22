import { BaseDto } from "./generalTypes";

// order items
export interface OrderProductBase {
    productId: string;
    title: string;
    thumbnail: string;
    actualPrice: number;
    quantity: number;
    totalPrice: number;
}
export interface OrderProductReadDto extends OrderProductBase, BaseDto {}
export interface OrderProductCreateDto extends Pick<OrderProductBase, 'productId' | 'quantity'> {}



// order
export interface OrderBase {
    userId: string;
    orderStatus: "Shipped" | "Pending" | "AwaitingPayment" | "Processing" | "Shipping" | "Completed" | "Refunded" | "Cancelled";
    products: OrderProductBase[];
    shippingAddress: string;
}
export interface OrderReadDto extends Omit<OrderBase, 'products'>, BaseDto {
    products: OrderProductReadDto[];
}
export interface OrderCreateDto extends Omit<OrderBase, 'products'> {
    products: OrderProductCreateDto[];
}
export interface OrderUpdateDto extends Pick<OrderBase, 'orderStatus'> {}