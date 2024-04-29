import axios from "axios"
import _TokenVal from "../Config/_TokenVal"
import {useDispatch} from 'react-redux'
import { _uLogout } from "../Redux/Reducer/_Users"
import {useNavigate} from "react-router-dom"
import Message from "../components/Message"
import { type } from "@testing-library/user-event/dist/type"
import { URLAPIS } from "../Config/_Calls"
 const _InterCon = axios.create({})

_InterCon.interceptors.request.use(async(conf)=>{
 
   const res  = await axios.get(`${URLAPIS}token/refresh`,
   {withCredentials:true})
   .catch((err)=>{
    
    if(err.code === "ERR_NETWORK"){
        Message({type:'err',message:"Upss...mohon tunggu sebentar"})
        throw new Error({error:"Upss...mohon tunggu sebentar"})
    }
    localStorage.clear()
    const dispatch = useDispatch()
    dispatch(_uLogout())
    const navs = useNavigate()
    navs('/login')
    throw new Error(err?.response?.data?.message || 'maaf sepertinya ada yang salah')
   })
   const resRef = await _TokenVal(res?.data?.ac)
   localStorage.setItem('cs',res?.data?.csrfToken)
   conf.headers.Authorization = `Bearer ${resRef}`
   return conf
},(err)=>{
   
    Promise.reject(err)
    
})
export default _InterCon
