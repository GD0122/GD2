import React,{useEffect,useState} from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { useGoogleLogin,googleLogout } from '@react-oauth/google'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Active, Logout, SelUsers} from '../Redux/Reducer/_Users'
import CryptoJS from "crypto-js";

function Login_user() {
  const [user,setUser] = useState([])
  const profile = useSelector(SelUsers)
  let salt = 'f844b09ff50c'

  const dispatch = useDispatch()


  const Logins = useGoogleLogin({
    onSuccess:(codeResponse) => {
      setUser(codeResponse)
      localStorage.setItem('access_dental',codeResponse.access_token)
    },
    onError:(err)=> console.log(err)
  })

  
  const logOut = () => {
    googleLogout();
    dispatch(Logout())
    localStorage.removeItem('access_dental')
};


  useEffect(()=>{
 
    if (user) {
      axios.get(`http://localhost:5500/api/testers/tes?data=${localStorage.getItem('access_dental')}`,{
      headers:{Accept:'application/json'}
    }
    ).then(async(res)=>{
      console.log("that",res.data.outPars)
      const outPars = res.data.outPars
      const bytes=  CryptoJS.AES.decrypt(outPars, salt)
      const dataD = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
      await dispatch(Active(dataD))
    }).catch((err) => console.log(err));
  }
  },[user])
  

  return (
    <div >

              <button onClick={() => Logins()}>Sign in with Google 🚀 </button>
       
       
    </div>
  )
}

export default Login_user