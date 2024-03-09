import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../../api/DataPasien';
import CryptoJS from "crypto-js";
import api2 from '../../api/Datass'
const salt = process.env.REACT_APP_SALT
export const RenewPasien = createAsyncThunk(
    'pasien/detail',async(id)=>{
  
        const res = await api.get()
        const outPars = res.data.out1
        const bytes=  CryptoJS.AES.decrypt(outPars, salt)
        const dataD = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        localStorage.setItem('data_pas',JSON.stringify(dataD.data))
        const local_pas = JSON.parse(localStorage.data_pas)

        const outPars1 = res.data.out2
        const bytes1=  CryptoJS.AES.decrypt(outPars1, salt)
        const dataD1 = JSON.parse(bytes1.toString(CryptoJS.enc.Utf8))
        localStorage.setItem('info_pas',JSON.stringify(dataD1.data))
        const local_pas1 = JSON.parse(localStorage.info_pas)


        const outPars2 = res.data.out3
        const bytes2=  CryptoJS.AES.decrypt(outPars2, salt)
        const dataD2 = JSON.parse(bytes2.toString(CryptoJS.enc.Utf8))
        localStorage.setItem('data_adm',JSON.stringify(dataD2.data))
        const local_pas2 = JSON.parse(localStorage.data_adm)

        
        return {local_pas,local_pas1,local_pas2}
    }
)
export const RenewPasien2 = createAsyncThunk(
    'pasien/detail2',async()=>{
        const res = await api2.get()
        const outPars = res.data.out1
        const bytes=  CryptoJS.AES.decrypt(outPars, salt)
        const dataD = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        localStorage.setItem('data_jad',JSON.stringify(dataD.data))
        const local_pas = JSON.parse(localStorage.data_jad)
   
        const outPars1 = res.data.out2
        const bytes1=  CryptoJS.AES.decrypt(outPars1, salt)
        const dataD1 = JSON.parse(bytes1.toString(CryptoJS.enc.Utf8))
        localStorage.setItem('data_brng',JSON.stringify(dataD1.data))
        const local_pas1 = JSON.parse(localStorage.data_brng)
        return {local_pas,local_pas1}
    }
)
const PasienSlice = createSlice({
    name:'pasien',
    initialState:{
        Loading:false,
        Err:null,
        Pasien:[],
        Rekam:[],
        DAdm:[],
        DJad:[],
        DBar:[],
        DPas:[]
    },
    reducers:{
        GetPasien:(state,action)=>{
            return {...state,Pasien:[action.payload]}
            
        },
        RekamPas:(state,action)=>{
            return {...state,Rekam:[action.payload]}
        },
        DataAdm:(state,action)=>{
            return{...state,DAdm:[action.payload]}
        },
        DataJad:(state,action)=>{
            return{...state,DJad:[action.payload]}
        },
        DataBrng:(state,action)=>{
            return{...state,DBar:[action.payload]}
        },
        Error:(state,action)=>{
            return {...state,Err:action.payload}
        },
       
    },
    extraReducers:(builder)=>{
        builder
        .addCase(RenewPasien.fulfilled,(state,action)=>{
            console.log("this",action.payload)
        })
        .addCase(RenewPasien2.fulfilled,(state,action)=>{
            console.log("htis",action.payload)
        })
       
    }


})


export const SelPasien = state=>state.pasien.Pasien
export const SelRekam = state=>state.pasien.Rekam
export const SelJadwal = state=>state.pasien.DJad
export const SelDetailP = state=>state.pasien.DPas
export const {GetPasien,RekamPas,Error,DataAdm,DataJad,DataBrng} = PasienSlice.actions


export default PasienSlice.reducer