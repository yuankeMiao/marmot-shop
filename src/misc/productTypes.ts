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
    
export type CategoryType = typeof CATEGORIES[number] | ""

export interface ProductType {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: CategoryType;
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
  error: string | null;
};

/*
    {
      "id": 59,
      "title": "Spring and summershoes",
      "price": 20,
      "quantity": 3,
      "total": 60,
      "discountPercentage": 8.71,
      "discountedPrice": 55,
      "thumbnail": "https://cdn.dummyjson.com/product-images/59/thumbnail.jpg"
    },
*/

export interface CartItemType {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
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
  category: CategoryType;
  sortByPrice: "asc" | "desc" | "";
}
