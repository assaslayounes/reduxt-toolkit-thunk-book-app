import { configureStore } from "@reduxjs/toolkit";  
import booksReducer  from "./bookSlice";
import authReducer from "./authSlice";  

export const store = configureStore({
    reducer: {
        books: booksReducer,
        auth : authReducer
    },
});