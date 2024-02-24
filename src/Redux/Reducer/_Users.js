
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";








 const UserSlice = createSlice({
    name:'user',
    initialState:{
        Loading:false,
        Err:null,
        Users:[],
    },
    reducers:{
        Active:(state,action)=>{
            return {...state,Users:[action.payload]}
            
        },Error:(state,action)=>{
            return {...state,Err:action.payload}
        },
        Logout:(state,action)=>{
            return {...state,Users:[]}
        }
    },


})


export const SelUsers = state => state.user.Users

export const {Active,Error,Logout} = UserSlice.actions


export default UserSlice.reducer