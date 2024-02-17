import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { ProductsState, ProductType } from "../../misc/productTypes";
import { API_URL } from "../../misc/constants";

const initialState: ProductsState = {
  products: [],
  loading: false,
};

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    try {
      const response= await axios.get(API_URL);
      const data: ProductType[]  = response.data;
    //   console.log(data)
      return data;
    } catch (e) {
      const error = e as Error;
      return error;
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state) => {
      return { ...state, isLoading: true };
    });

    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          isLoading: false,
          products: action.payload,
        };
      }
    });

    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          isLoading: false,
          error: action.payload.message,
        };
      }
    });
  },
});

const productsReducer = productsSlice.reducer;

export default productsReducer;
