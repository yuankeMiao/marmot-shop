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

export type ProductsState = {
    products: ProductType[];
    favList: ProductType[];
    loading: boolean;
    error?: string;
};
