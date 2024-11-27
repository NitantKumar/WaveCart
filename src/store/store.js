import {configureStore} from '@reduxjs/toolkit';
import categoryReducer from './categorySlice.js';
import userReducer from "./userSlice";

const store = configureStore({
    reducer:{
        categories: categoryReducer,
        user: userReducer,
    }
});

export default store;