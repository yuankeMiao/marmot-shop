import { UUID } from "crypto";

export interface QueryResponse<T> {
    products: Array<T>;
    totalCount: number;
  }

export interface BaseDto {
    id: UUID;
    createdDate: Date;
    updatedDate: Date;
}