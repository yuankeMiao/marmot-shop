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

const roundToTwoDecimals = (value: number): number => {
  return parseFloat(value.toFixed(2));
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
        existItem.total = roundToTwoDecimals(existItem.total + addToCartItem.total);
        existItem.discountedPrice = roundToTwoDecimals(existItem.discountedPrice + addToCartItem.discountedPrice);
      } else {
        state.products.push(addToCartItem);
        state.totalProducts += 1;
      }
      state.total = roundToTwoDecimals(state.total + addToCartItem.total);
      state.discountedTotal = roundToTwoDecimals(state.discountedTotal + addToCartItem.discountedPrice);
      state.totalQuantity += addToCartItem.quantity;
    },

    // receive the id, then filter it out
    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemToDelete = state.products.find(
        (item) => item.id === action.payload
      );
      if (itemToDelete) {
        state.products = state.products.filter(
          (item) => item.id !== action.payload
        );
        state.totalProducts -= 1;
        state.total = roundToTwoDecimals(state.total - itemToDelete.total);
        state.discountedTotal = roundToTwoDecimals(state.discountedTotal - itemToDelete.discountedPrice);
        state.totalQuantity -= itemToDelete.quantity;
      }
    },
    
    clearCart: (state) => {
      Object.assign(state, initialState);
    },

    // update the quantity of the item
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.products.find((item) => item.id === id);
      if (item) {
        const itemDiscountedPrice = roundToTwoDecimals(
          item.price * quantity * (100 - item.discountPercentage) / 100
        );
        state.totalQuantity += quantity - item.quantity;
        state.total = roundToTwoDecimals(state.total + (quantity - item.quantity) * item.price);
        state.discountedTotal = roundToTwoDecimals(state.discountedTotal + itemDiscountedPrice - item.discountedPrice);
        item.quantity = quantity;
        item.total = roundToTwoDecimals(quantity * item.price);
        item.discountedPrice = itemDiscountedPrice;
      }
    },
  },
});

const cartReducer = cartSlice.reducer;

export default cartReducer;
export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;
