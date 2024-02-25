import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Active, SelUsers } from '../Redux/Reducer/_Users'
import CryptoJS from "crypto-js";
function _UsersVal({children}) {
    let salt =process.env.REACT_APP_SALT
    
   const dispatch = useDispatch()
   const Navs = useNavigate()
  
   const getUsers = async()=>{
    const getUser = axios.get(`/.netlify/functions/exec2?peop=${localStorage.getItem('access_dental')}`,{
        headers:{Accept:'application/json'},
        params:{tropies:true} 
      }).then(async(res)=>{
            const outPars = res.data.outPars
            const bytes=  CryptoJS.AES.decrypt(outPars, salt)
            const dataD = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
            await dispatch(Active(dataD))
          
        })
        .catch((err)=>{   
            return Navs('/login')
        })


    if([getUser].length !==0) return <children/>
     Navs('/login')
   }

useEffect(()=>{
    getUsers()    
},[])
return children

 
  
   
     


 
 
  
}

export default _UsersVal