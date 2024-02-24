import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './Reducer/_Users'
export const _Store = configureStore({
    reducer:{
        user:UserSlice,
    }
})