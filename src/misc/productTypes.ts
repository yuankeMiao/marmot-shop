import { UUID } from "crypto";
import { BaseDto } from "./generalTypes";

export interface ImageReadDto {
  id: UUID;
  url: string;
  productId: UUID;
}

export type ImageCreateDto = Omit<ImageReadDto, 'id'>;
export type ImageUpdateDto = Pick<ImageReadDto, 'url'>;


export interface ProductBase {
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating?: number;
  stock: number;
  brand?: string;
  category: UUID;
  thumbnail: string;
  images: ImageReadDto[];
}

export interface ProductReadDto extends ProductBase, BaseDto {};
export interface ProductCreateDto extends Omit<ProductBase, 'images'> {
  images: ImageCreateDto;
};
export interface ProductUpdateDto extends Partial<Omit<ProductBase, 'images'>> {
  id:UUID,
  images: ImageUpdateDto[];
};


export interface ProductQueryOptionsType {
  title?: string;
  minPrice?: number;
  maxPrice?: number;
  categoryId?: string;
  inStock?: boolean;
  sortBy?: "Title" | "Price" | "Created_Date" | "Updated_Date";
  sortOrder?: "Asc" | "Desc";
  limit: number;
  offset: number;
}

export interface ProductsState {
  products: ProductReadDto[];
  loading: boolean;
  error: string | null;
}


export interface CartItemType {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  stock: number;
  discountPercentage: number;
  discountedPrice: number;
  thumbnail: string;
}

export interface CartState {
  products: CartItemType[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
  loading: boolean;
  error?: string;
}

export type UserCartType = Pick<CartState, "products" | "total" | "userId" | "discountedTotal" | "totalProducts" | "totalQuantity"> & { id?: number };


export interface CartQueryType {
  carts: UserCartType[];
  total: number;
  skip: number;
  limit: number;
}

export type ProductsInfoToCartApi = { productId: number; quantity: number };

export interface FilterType {
  category?: UUID;
  sortByPrice: "asc" | "desc" | "";
}
