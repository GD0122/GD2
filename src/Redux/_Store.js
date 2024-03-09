import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './Reducer/_Users'
import PasienSlice from './Reducer/_Pasien'
export const _Store = configureStore({
    reducer:{
        user:UserSlice,
        pasien:PasienSlice
    }
})