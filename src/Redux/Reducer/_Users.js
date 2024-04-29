
import { googleLogout } from "@react-oauth/google";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Navigate, useNavigate } from "react-router-dom";
import _InterCon from "../../api/_InterCon";
import axios from 'axios'
import { act } from "react-dom/test-utils";





export const userLogout = createAsyncThunk(
    'user/logout',async()=>{
        
       return new Promise((resolve,reject)=>{

       })
        
    }
)


export const _GetUser = createAsyncThunk(
    'user/profiles',async()=>{

        try {
            const users = await _InterCon.get('http://localhost:5500/account/users',{
                withCredentials:true
            }).then(res=>{
                localStorage.setItem('users',JSON.stringify(res.data.user))
                return res.data.user})
            .catch((err)=>{throw err.data})
        } catch (error) {
            return error
        }
     
    }
)

 const UserSlice = createSlice({
    name:'user',
    initialState:{
        Loading:false,
        Err:false,
        Users:[],
    },
    reducers:{
        Active:(state,action)=>{
            return {...state,Users:[action.payload]}
            
        },Error:(state,action)=>{
            return {...state,Err:action.payload}
        },
        _uLogout:(state,action)=>{
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
        .addCase(_GetUser.pending,(state,action)=>{
            return {...state,Loading:true}
        })
        .addCase(_GetUser.fulfilled,(state,action)=>{
            return {...state,Users:[action.payload],Err:false,Loading:false}
        })
        .addCase(_GetUser.rejected,(state,action)=>{
            return {...state,Err:true,Loading:false}
        })
      
    }


})


export const SelUsers = state => state.user.Users
export const _LoadUsers = state => state.user.Loading
export const _UserErr = state => state.user.Err
export const {Active,Error,_uLogout} = UserSlice.actions


export default UserSlice.reducer