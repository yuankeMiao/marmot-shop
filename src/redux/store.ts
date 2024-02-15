import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        // Add your reducers here
    },
    });


export type AppState = ReturnType<typeof store.getState>;

export default store;