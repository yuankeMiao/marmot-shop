import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { CurrentUserStateType } from "../../misc/userTypes";
import { DUMMYJSON_URL } from "../../misc/constants";

const initialState: CurrentUserStateType = {
  user: null,
  isLoading: false,
  error: "",
};

export const fetchCurrentUser = createAsyncThunk(
  "fetchCurrentUser",
  async (accessToken: string, {rejectWithValue }) => {
    try {
      const response = await axios.get(DUMMYJSON_URL + `/auth/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
        localStorage.removeItem("token");
      return rejectWithValue(error);
    }
  }
);

export const fetchCurrentUserWithGoogle = createAsyncThunk(
  "fetchCurrentUserWithGoogle",
  async (accessToken: string, { rejectWithValue }) => {
    // console.log("fetchCurrentUserWithGoogle");
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
        localStorage.removeItem("googleToken");
      return rejectWithValue(error);
    }
  }
);

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("googleToken");
      window.location.reload();
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.user = {
        ...action.payload,
        role:(action.payload.id === 1 ? "admin" : "user") 
        // because my api doesn't have role field
        // so I added this by myself by setting the No.1 user as admin
      }
      state.isLoading = false;
    });
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    // because the data shape of google is different from my api
    // so I need to modify the data shape
    // for all the google user, the are by default non-admin users
    builder.addCase(fetchCurrentUserWithGoogle.fulfilled, (state, action) => {
      state.user = {
        ...state.user,
        id: action.payload.id,
        firstName: action.payload.given_name,
        lastName: action.payload.family_name,
        username: action.payload.name,
        email: action.payload.email,
        image: action.payload.picture,
        role: "user",
        address: null,
      };
      state.isLoading = false;
    });

    builder.addCase(fetchCurrentUserWithGoogle.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchCurrentUserWithGoogle.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

const currentUserReducer = currentUserSlice.reducer;

export default currentUserReducer;
export const {logout } = currentUserSlice.actions;
