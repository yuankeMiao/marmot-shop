
import {createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemType, CartState } from "../../misc/productTypes";

import { DUMMYJSON_URL } from "../../misc/constants";

const initialState: CartState = {
    products: [],
    total: 0,
    discountedTotal: 0,
    userId: 0,
    totalProducts: 0,
    totalQuantity: 0,
    loading: false,
};

// feetch data from server after user login, then merge the guest cart with the user cart

export const fetchUserCart = createAsyncThunk(
    "fetchUserCart",
    async (userId: number, {getState, rejectWithValue }) => {
        try{
            const response = await fetch(DUMMYJSON_URL + `/carts/user/${userId}`);
            const data = await response.json();
            return data.carts[0];
        }
        catch(error){
            return rejectWithValue(error);
        }
    }
)

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItemType>) => {
            const addToCartItem = action.payload;
            // if the item is already in the cart, increase the quantity    
            const existItem = state.products.find((item) => item.id === addToCartItem.id);
            if (existItem) {
                existItem.quantity += addToCartItem.quantity;
                existItem.total += addToCartItem.total;
                existItem.discountedPrice += addToCartItem.discountedPrice
            } else {
                state.products.push(addToCartItem);
                state.totalProducts += 1;
            }
            state.total += addToCartItem.total;
            state.discountedTotal += addToCartItem.discountedPrice;
            state.totalQuantity += addToCartItem.quantity;
        },

        // recieve the id, then filter it out
        removeFromCart: (state, action: PayloadAction<number>) => {
            const itemToDelete = state.products.find((item) => item.id === action.payload);
            state.products = state.products.filter((item) => item.id !== action.payload);
            state.totalProducts -= 1;
            state.total -= itemToDelete?.total || 0;
            state.discountedTotal -= itemToDelete?.discountedPrice || 0;
            state.totalQuantity -= itemToDelete?.quantity || 0;
        },

        // update the quantity of the item
        updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const { id, quantity } = action.payload;
            const item = state.products.find((item) => item.id === id);
            if (item) {
                const itemDiscountedPrice = Math.round(item.price * quantity * (100 - item.discountPercentage)/100);
                state.totalQuantity += quantity - item.quantity;
                state.total += (quantity - item.quantity) * item.price;
                state.discountedTotal += itemDiscountedPrice - item.discountedPrice;
                item.quantity = quantity;
                item.total = quantity * item.price;
                item.discountedPrice = itemDiscountedPrice;
            }
        },
    },

    extraReducers: (builder) => {

        builder.addCase(fetchUserCart.fulfilled, (state, action) => {
            //merge the guest cart with the user cart
            if(!action.payload) return; // sometimes the user has no cart, then the cart[] is empty, so cart[0] is undefined
            state.products = [...state.products, ...action.payload.products]
            state.total+= action.payload.total;
            state.discountedTotal += action.payload.discountedTotal;
            state.userId = action.payload.userId;
            state.totalProducts += action.payload.totalProducts;
            state.totalQuantity += action.payload.totalQuantity;
            state.loading = false;
        });

        builder.addCase(fetchUserCart.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchUserCart.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        });
    }

});

const cartReducer = cartSlice.reducer

export default cartReducer;
export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;