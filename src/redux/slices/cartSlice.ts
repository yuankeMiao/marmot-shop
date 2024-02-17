
import {createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemType, AddToCartType, ProductsState, CartState } from "../../misc/productTypes";


const initialState: CartState = {
    products: [],
    total: 0,
    loading: false,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<AddToCartType>) => {
            const {newItem, quantity} = action.payload;
            // if the item is already in the cart, increase the quantity    
            const existItem = state.products.find((item) => item.id === newItem.id);
            if (existItem) {
                existItem.quantity += quantity;
            } else {
                newItem.quantity = quantity;
                state.products.push(newItem);
            }
            state.total += quantity;
        },

        // recieve the id, then filter it out
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.products = state.products.filter((item) => item.id !== action.payload);
        },
    },
});

const cartReducer = cartSlice.reducer;

export default cartReducer;
export const { addToCart, removeFromCart } = cartSlice.actions;