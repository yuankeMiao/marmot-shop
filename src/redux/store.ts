import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";

import productQueries from "./slices/productQuery";

const store = configureStore({
  reducer: {
    products: productsReducer,
    [productQueries.reducerPath]: productQueries.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productQueries.middleware)
});

export type AppStore = typeof store;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
