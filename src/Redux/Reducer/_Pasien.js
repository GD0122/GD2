import { combineSlices, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../../api/DataPasien';
import CryptoJS from "crypto-js";
import api2 from '../../api/Datass'
import _InterCon from "../../api/_InterCon";
import Message from "../../components/Message";
import { act } from "react-dom/test-utils";
import { retry } from "@reduxjs/toolkit/query";
import { URLAPIS } from "../../Config/_Calls";

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



export const getPass = createAsyncThunk(
    'pasien/data',async(data)=>{
        let perPage =  data?.perPage || 5
        let pages = data.page || 1
        const res = await _InterCon.get(`${URLAPIS}pasien/pasien?&page=${pages}&perPage=${perPage}`,{origin:'http://localhost:3000'},{
            withCredentials:true
        })
        
        return res.data
    }
)

export const getRekamPas = createAsyncThunk(
    'pasien/rekam',async(data)=>{
        let perPage = data?.perPage || 5
        let pages = data.page || 1
        const rekam = await _InterCon.get(`${URLAPIS}rekam/${data.idP}?&page=${pages}&perPage=${perPage}`,
        {origin:'http://localhost:3000'},{
            withCredentials:true
        })
      
        return rekam.data

    }
)

export const getDetailPass = createAsyncThunk(
    'pasien/details', async(data)=>{
        const pasien = await _InterCon.get(`${URLAPIS}pasien/detail/${data}`,
        {origin:'http://localhost:3000'},
        {
            withCredentials:true
        })
       
        return pasien.data
    }
)






export const _getSearch = createAsyncThunk(
    'pasien/search',async(data)=>{
        const perPage = data?.perPage || 5
        const page = data?.page || 1
        try {
            const res = await _InterCon.get(`${URLAPIS}pasien/search/${data?.names}?&page=${page}&perpage=${perPage}`,{
                withCredentials:true
            }).catch((err)=>{
                throw err
            }).then((res)=>{return res.data})
          
            return res
        } catch (error) {
           
            return error
        }
    }
)


// export const _getJadPas = createAsyncThunk(
//     'pasien/jadwal',async()=>{
//         const pasien = await _InterCon.get(`http://localhost:5500/jadwal/all`,{
//             withCredentials:true
//         })
       
//         return pasien.data
    
//     }
// )
export const GetJadwals = createAsyncThunk(
    'pasien/jadwals',async(data)=>{
        let page = data.page || 1
        let perPage = data.perPage || 5
        const jadwal = await _InterCon.get(`${data.url}?&page=${page}&perPage=${perPage}`,{
            withCredentials:true
        })
       
        return jadwal.data
    }
)
const PasienSlice = createSlice({
    name:'pasien',
    initialState:{
        isLoading:false,
        Err:false,
        Pasien:[],
        PasienD:[],
        Rekam:[],
        DAdm:[],
        DJad:{
            today:[],
            yesterday:[],
            tomorrow:[]
        },
        DBar:[],
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
        // getDetail:(state,action)=>{
        //     const dt = state.Pasien['pasien']?.filter((data)=>data.id === action.payload)
        //     return{...state,PasienD:[dt]}
        // },
     
       
    },
    extraReducers:(builder)=>{
        builder
        .addCase(RenewPasien.fulfilled,(state,action)=>{
            console.log("this",action.payload)
        })
        .addCase(RenewPasien2.fulfilled,(state,action)=>{
            console.log("htis",action.payload)
        })
        .addCase(getPass.fulfilled,(state,action)=>{
            return{...state,Pasien:action.payload,Err:null,isLoading:false}
        })
        .addCase(getPass.pending,(state,action)=>{
            return{...state,isLoading:true}
        })
        .addCase(getPass.rejected,(state,action)=>{
            state.Err=true
        })
        .addCase(_getSearch.fulfilled,(state,action)=>{
          
            return {...state,Pasien:action.payload,isLoading:false,Err:false}
        })
        .addCase(_getSearch.pending,(state,action)=>{
            return {...state,isLoading:true}
        })
        .addCase(_getSearch.rejected,(state,action)=>{
            return {...state,Err:true}
        })
        .addCase(getRekamPas.fulfilled,(state,action)=>{
            console.log('this',action.payload)
            return {...state,Rekam:action.payload,isLoading:false,Err:false}
        })
        // .addCase(getRekamPas.pending,(state,action)=>{
        //     return {...state,isLoading:true,Err:false}
        // }).addCase(getRekamPas.rejected,(state,action)=>{
        //     return {...state,Err:true,isLoading:false,Rekam:[]}
        // })
        .addCase(getDetailPass.fulfilled,(state,action)=>{
            return {...state,PasienD:action.payload,isLoading:false,Err:false}
        })
        .addCase(getDetailPass.pending,(state,action)=>{
            return {...state,isLoading:true,Err:false}
        }).addCase(getDetailPass.rejected,(state,action)=>{
            return {...state,isLoading:false,Err:true,PasienD:[]}
        })
        .addCase(GetJadwals.fulfilled,(state,action)=>{
            const { today = state.DJad.today, tomorrow = state.DJad.tomorrow, yesterday = state.DJad.yesterday } = action.payload ?? {};
            return {
                ...state,
                DJad: {
                    ...state.DJad,
                    today,
                    tomorrow,
                    yesterday,
                }
            };
        })
   
        
       
       
    }


})


export const SelPasien = state=>state.pasien.Pasien
export const SelRekam = state=>state.pasien.Rekam
export const SelJadwal = state=>state.pasien.DJad
export const SelDetailP = state=>state.pasien.DPas
export const SelErrPass = state=>state.pasien.Err
export const SelLoad = state => state.pasien.isLoading
export const SelTotalPages = state => state.pasien.totalPages
export const SelPasienDetail = state => state.pasien.PasienD
export const {GetPasien,RekamPas,Error,DataAdm,DataJad,DataBrng,
   
} = PasienSlice.actions


export default PasienSlice.reducer