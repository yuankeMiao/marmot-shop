import { UUID } from "crypto";
import { BaseDto } from "./generalTypes";

export interface Category {
    name: string;
    image: string;
}

export interface CategoryReadDto extends Category, BaseDto {};
export interface CategoryCreateDto extends Category {};
export interface CategoryUpdateDto extends Partial<Category> {
    id: UUID;
};