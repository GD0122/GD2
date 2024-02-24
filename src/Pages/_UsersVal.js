import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Active, SelUsers } from '../Redux/Reducer/_Users'
function _UsersVal({children}) {

    
   const dispatch = useDispatch()
   const Navs = useNavigate()
  
   const getUsers = async()=>{
    const getUser = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${localStorage.getItem('access_dental')}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_dental')}`,
            Accept: 'application/json',
            "Accept-Encoding":'identity'
        },
        params:{tropies:true}
    }).then((res)=>{
     
        dispatch(Active(res.data))
        return res
    })
    .catch((err)=>{   
        return Navs('/login')
    })

    if([getUser].length !==0) return <children/>
    return Navs('/login')
   }

useEffect(()=>{
    getUsers()    
},[])
return children

 
  
   
     


 
 
  
}

export default _UsersVal