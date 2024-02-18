import { CATEGORIES } from "./constants";

// {
//   "products": [
//     {
//       "id": 1,
//       "title": "iPhone 9",
//       "description": "An apple mobile which is nothing like apple",
//       "price": 549,
//       "discountPercentage": 12.96,
//       "rating": 4.69,
//       "stock": 94,
//       "brand": "Apple",
//       "category": "smartphones",
//       "thumbnail": "...",
//       "images": ["...", "...", "..."]
//     },
//     {...},
//     {...},
//     {...}
//     // 30 items
//   ],

//   "total": 100,
//   "skip": 0,
//   "limit": 30
// }
    

export interface ProductType {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductQueryType {
  products: ProductType[];
  total: number;
  skip: number;
  limit: number;
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


export interface FilterType {
  category: (typeof CATEGORIES)[number];
  sortByPrice: "asc" | "desc" | "";
}
