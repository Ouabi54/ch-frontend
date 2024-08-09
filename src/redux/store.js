import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { configureStore, combineReducers } from "@reduxjs/toolkit"; // This uses localStorage by default

import { apiSlice } from "./features/api/apiSlice"
import authSlice from "./features/auth/authSlice";
import usersSlice from "./features/users/usersSlice";

// Create a persist configuration
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'data'], // List of reducers you want to persist
  };

// Create a persisted reducer
const rootReducer = {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    data: usersSlice
  };
  
const persistedReducer = persistReducer(persistConfig, combineReducers(rootReducer));

export const store = configureStore({
    reducer: persistedReducer,
    devTools:false,
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(apiSlice.middleware)
})

export const persistor = persistStore(store);
