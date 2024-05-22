
import { BaseDto, BaseQueryOptionType } from "./generalTypes";

// image
export interface ImageReadDto {
  id: string;
  url: string;
  productId: string;
}

export type ImageCreateDto = Pick<ImageReadDto, 'url'>;
export type ImageUpdateDto = Pick<ImageReadDto, 'url'>;

// product
export interface ProductBase {
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating?: number;
  stock: number;
  brand?: string;
  categoryId: string;
  thumbnail: string;
  images: ImageReadDto[];
}

export interface ProductReadDto extends ProductBase, BaseDto {};
export interface ProductCreateDto extends Omit<ProductBase, 'images'> {
  images: ImageCreateDto[];
};
export interface ProductUpdateDto extends Partial<Omit<ProductBase, 'images'|'rating'>> {
  images?: ImageUpdateDto[];
};


export interface ProductQueryOptionsType extends BaseQueryOptionType {
  title?: string;
  minPrice?: number;
  maxPrice?: number;
  categoryId?: string;
  inStock?: boolean;
  sortBy?: "Title" | "Price" | "Created_Date" | "Updated_Date";
}


export interface ProductsState {
  products: ProductReadDto[];
  loading: boolean;
  error: string | null;
}

// note for later: cart type can be the same with orderProduct type, i might change it later

export interface CartItemType {
  id: string;
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
