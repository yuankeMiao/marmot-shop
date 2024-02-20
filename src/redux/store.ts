import { configureStore } from "@reduxjs/toolkit";


import cartReducer from "./slices/cartSlice";
import apiQueries from "./slices/apiQuery";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    [apiQueries.reducerPath]: apiQueries.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiQueries.middleware)
});

export type AppStore = typeof store;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
