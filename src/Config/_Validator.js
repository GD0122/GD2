

import _InterCon from '../api/_InterCon'
import {useNavigate} from 'react-router-dom'



   
  
const _getUser = async()=>{
        const Navigates = useNavigate()
        const data = await _InterCon.get('localhost:5500/account/user',{withCredentials:true})
        .then((res)=>{
            localStorage.setItem('users',JSON.stringify(res.data.user))
            return Navigates('/')
        }).catch((err)=>{
            return Navigates('/login')
        })
    }

 
   


export default _getUser