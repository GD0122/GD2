
import { googleLogout } from "@react-oauth/google";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Navigate, useNavigate } from "react-router-dom";






export const userLogout = createAsyncThunk(
    'user/logout',async()=>{
        googleLogout()
        localStorage.removeItem('access_dental')
        localStorage.clear()
        
    }
)

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
    extraReducers:(builder)=>{
        builder
        .addCase(userLogout.fulfilled,(state,action)=>{
            return {...state,Users:[]}
        })
        .addCase(userLogout.rejected,(state,action)=>{
            return <Navigate to='/login'/>
        })
    }


})


export const SelUsers = state => state.user.Users

export const {Active,Error,Logout} = UserSlice.actions


export default UserSlice.reducer