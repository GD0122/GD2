import React,{useEffect,useState} from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { useGoogleLogin,googleLogout } from '@react-oauth/google'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Active, Logout, SelUsers} from '../Redux/Reducer/_Users'


function Login_user() {
  const [user,setUser] = useState([])
  const profile = useSelector(SelUsers)
 

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
      
      axios
          .get(`/.netlify/exec2?access=${localStorage.getItem('access_token')}`, {
              headers: {
                  Authorization: `Bearer ${user.access_token}`,
                  Accept: 'application/json'
              }
          })
          .then(async(res) => {
            await dispatch(Active(res.data))
            
          })
          .catch((err) => console.log(err));
  }
  },[user])
  

  return (
    <div >

              <button onClick={() => Logins()}>Sign in with Google 🚀 </button>
       
       
    </div>
  )
}

export default Login_user