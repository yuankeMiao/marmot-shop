import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./slices/cartSlice";
import currentUserReducer from "./slices/currentUserSlice";
import apiQueries from "./slices/apiQuery";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    currentUser: currentUserReducer,
    [apiQueries.reducerPath]: apiQueries.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiQueries.middleware)
});


const createStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      currentUser: currentUserReducer,
      [apiQueries.reducerPath]: apiQueries.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiQueries.middleware)
  });
}


export type AppStore = typeof store;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

export { createStore };
