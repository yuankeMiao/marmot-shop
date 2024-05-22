import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemType, CartState } from "../../misc/productTypes";

const initialState: CartState = {
  products: [],
  total: 0,
  discountedTotal: 0,
  userId: 0,
  totalProducts: 0,
  totalQuantity: 0,
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemType>) => {
      const addToCartItem = action.payload;
      // if the item is already in the cart, increase the quantity
      const existItem = state.products.find(
        (item) => item.id === addToCartItem.id
      );
      if (existItem) {
        existItem.quantity += addToCartItem.quantity;
        existItem.total += addToCartItem.total;
        existItem.discountedPrice += addToCartItem.discountedPrice;
      } else {
        state.products.push(addToCartItem);
        state.totalProducts += 1;
      }
      state.total += addToCartItem.total;
      state.discountedTotal += addToCartItem.discountedPrice;
      state.totalQuantity += addToCartItem.quantity;
    },

    // recieve the id, then filter it out
    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemToDelete = state.products.find(
        (item) => item.id === action.payload
      );
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
      state.totalProducts -= 1;
      state.total -= itemToDelete?.total || 0;
      state.discountedTotal -= itemToDelete?.discountedPrice || 0;
      state.totalQuantity -= itemToDelete?.quantity || 0;
    },

    // update the quantity of the item
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.products.find((item) => item.id === id);
      if (item) {
        const itemDiscountedPrice = Math.round(
          (item.price * quantity * (100 - item.discountPercentage))
        )/100;
        state.totalQuantity += quantity - item.quantity;
        state.total += (quantity - item.quantity) * item.price;
        state.discountedTotal += itemDiscountedPrice - item.discountedPrice;
        item.quantity = quantity;
        item.total = quantity * item.price;
        item.discountedPrice = itemDiscountedPrice;
      }
    },
  },
});

const cartReducer = cartSlice.reducer;

export default cartReducer;
export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
