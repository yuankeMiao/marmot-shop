import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

import { ProductsState, ProductType } from "../../types/productTypes";


const initialState: ProductsState = {
    products: [],
    favList: [],
    loading: false,
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addFav: (state, action: PayloadAction<ProductType>) => {
            if (state.favList.find(product => product.id === action.payload.id)) {
              return state
            }
            state.favList.push(action.payload)
          },
          removeFromFav: (state, action: PayloadAction<ProductType>) => {
            state.favList = state.favList.filter(product => {
              return product.id !== action.payload.id
            })
          },
    },
    extraReducers: builder => {},
})

const productsReducer = productsSlice.reducer;

export default productsReducer;