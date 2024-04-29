import { useGoogleLogin } from '@react-oauth/google'
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import { useNavigate } from 'react-router-dom'
import "../component/datapasien.css"
import axios from 'axios'
import {useDispatch } from 'react-redux'
import { Active } from '../Redux/Reducer/_Users'
import CryptoJS from "crypto-js";

function _Logins() {
 
  let salt = process.env.REACT_APP_SALT
  const [user,setUser] = useState([])
    const navs = useNavigate()
    const dispatch = useDispatch()
    const Logins = useGoogleLogin({
        onSuccess:(codeResponse) => {
          localStorage.setItem('access_dental',codeResponse.access_token)
          setUser(codeResponse)
          navs('/')
        },
        onError:(err)=> console.log(err)
      })
    
      async function exec2(){
       const peop = localStorage.getItem('access_dental')
        axios.get(`/.netlify/functions/exec2?peop=${peop}`,{
        headers:{Accept:'application/json'}
      }
      ).then(async(res)=>{
        
        const outPars = res.data.outPars
        const bytes=  CryptoJS.AES.decrypt(outPars, salt)
        const dataD = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        await dispatch(Active(dataD))
        alert("Telah Login")
        navs('/')
            
          })
          .catch((err) => {
           return null
          });

      }
    useEffect(()=>{
      if (user) {
          exec2()
          }
  },[])
     
  return (
    <div className='containers' style={{display:'flex',justifyContent:"center"}}>
        <Button onClick={() => Logins()}>Sign in with Google 🚀 </Button>
    </div>
  )
}

export default _Logins