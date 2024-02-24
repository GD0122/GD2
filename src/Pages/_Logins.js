import { useGoogleLogin } from '@react-oauth/google'
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import { useNavigate } from 'react-router-dom'
import "../component/datapasien.css"
import axios from 'axios'
import {useDispatch } from 'react-redux'
import { Active } from '../Redux/Reducer/_Users'
function _Logins() {
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

    useEffect(()=>{
      if (user) {
        console.log("hello")
        axios
            .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${localStorage.getItem('access_dental')}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    Accept: 'application/json',
                    "Accept-Encoding":'identity',
                },
                params:{thropies:true}
            })
            .then(async(res) => {
              await dispatch(Active(res.data))
              alert("Telah Login")
              navs('/')
              
            })
            .catch((err) => console.log(err));
          }
  },[user])
     
  return (
    <div className='containers' style={{display:'flex',justifyContent:"center"}}>
        <Button onClick={() => Logins()}>Sign in with Google 🚀 </Button>
    </div>
  )
}

export default _Logins