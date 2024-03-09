import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Active, SelUsers, userLogout } from '../Redux/Reducer/_Users'
import CryptoJS from "crypto-js";
function _UsersVal({children}) {
    let salt =process.env.REACT_APP_SALT
    
   const dispatch = useDispatch()
   const Navs = useNavigate()
  
 
 
    async function exec2(){
        const peop = localStorage.getItem('access_dental')
        
            const getUser =  axios.get(`/.netlify/functions/exec2?peop=${peop}`,{
                headers:{Accept:'application/json'}
              }
              ).then(async(res)=>{
                
                const outPars = res.data.outPars
                const bytes=  CryptoJS.AES.decrypt(outPars, salt)
                const dataD = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
                if(dataD?.email!==process.env.REACT_APP_VER) {
                    dispatch(userLogout())
                    return Navs('/login')
                }
                await dispatch(Active(dataD))
                
              }).catch((err)=>{
                return Navs('/login')
              })
             
      

        
        
          

    // console.log([getUser].length)
    // // if([getUser].length !==0) return <children/>
    //  Navs('/login')
   }

useEffect(()=>{
    exec2()   
},[])
return children

 
  
   
     


 
 
  
}

export default _UsersVal