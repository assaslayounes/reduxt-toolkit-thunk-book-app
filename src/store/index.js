import { configureStore } from "@reduxjs/toolkit";  
import booksReducer  from "./bookSlice";
import authReducer from "./authSlice";  
import reportReducer from "./reportSlice";

export const store = configureStore({
    reducer: {
        books: booksReducer,
        auth : authReducer,
        report: reportReducer
    },
});