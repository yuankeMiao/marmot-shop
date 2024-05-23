import { BaseDto, BaseQueryOptionType } from "./generalTypes";

export interface ReviewBase {
  rating: number;
  content: string;
  userId: string;
  productId: string;
}
export interface ReviewReadDto extends ReviewBase, BaseDto {}
export interface ReviewCreateDto extends Omit<ReviewBase, "userId"> {}
export interface ReviewUpdateDto
  extends Omit<ReviewBase, "userId" | "productId"> {}

export interface ReviewQueryOptionsType extends BaseQueryOptionType {
  rating?: number;
  hasContent?: boolean;
  sortBy?: "Rating" | "CreatedDate" | "UpdatedDate";
}
