import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { LoginApi } from "../api/Login";


export const store = configureStore({
    reducer: {
        [LoginApi.reducerPath]: LoginApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(LoginApi.middleware)
           
            
})
setupListeners(store.dispatch);