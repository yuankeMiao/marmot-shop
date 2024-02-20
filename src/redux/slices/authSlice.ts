import {createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { UserType } from "../../misc/userTypes";

const initialState: UserType = {
    id: null,
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    gender: "",
    image: "",
    token: "",
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setCurrentUser: (state, action: PayloadAction<UserType>) => {
            console.log(action.payload);
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.gender = action.payload.gender;
            state.image = action.payload.image;
            state.token = action.payload.token;
        },
        logout: (state,  action: PayloadAction<UserType>) => {
            state = initialState;
        }
    }
})

const userReducer = authSlice.reducer;

export default userReducer;
export const {setCurrentUser, logout} = authSlice.actions;