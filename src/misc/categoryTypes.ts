import { BaseDto } from "./generalTypes";

export interface Category {
    name: string;
    image: string;
}

export interface CategoryReadDto extends BaseDto {};
export interface CategoryCreateDto extends Category {};
export interface CategoryUpdateDto extends Partial<Category> {};