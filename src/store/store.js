import {configureStore} from '@reduxjs/toolkit';
import categoryReducer from './categorySlice.js';
import userReducer from './userSlice';
import cartReducer from './cartSlice.js';
import favoriteReducer from './favoriteSlice.js';
import orderReducer from './orderSlice.js';

const store = configureStore({
    reducer:{
        categories: categoryReducer,
        user: userReducer,
        cart: cartReducer,
        favorites: favoriteReducer,
        orders: orderReducer,
    }
});

export default store;