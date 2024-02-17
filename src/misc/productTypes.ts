import { CATEGORIES } from "./constants";

export interface ProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductsState {
  products: ProductType[];
  loading: boolean;
  error?: string;
};

export interface CartItemType extends ProductType {
  quantity: number;
}

export type AddToCartType = {
  newItem: CartItemType,
  quantity: number
}


export interface CartState {
  products: CartItemType[];
  total: number;
  loading: boolean;
  error?: string;
}



export type CategoriesType = (typeof CATEGORIES)[number];

export interface FilterType {
  categories: CategoriesType[];
  sortByPrice: "asc" | "desc" | "";
}
