import { configureStore } from '@reduxjs/toolkit';
import stockReducer from './slices/stockSlice';
import salesReducer from './slices/salesSlice';
import pricesReducer from './slices/pricesSlice'


const store=configureStore({
    reducer:{
        stock:stockReducer,
        sales:salesReducer,
        prices:pricesReducer,
    },
});

export default store;