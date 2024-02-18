import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";

import productQueries from "./slices/productQuery";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    [productQueries.reducerPath]: productQueries.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productQueries.middleware)
});

export type AppStore = typeof store;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
