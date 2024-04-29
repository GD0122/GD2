import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Axios } from "axios";
import _InterCon from "../api/_InterCon";
import axios from 'axios'


export const UserContext = createContext()

export const UserContextProvider = ({children})=>{

    const [user,setUser] = useState([])



    const _usersLogin = new Promise((resolve,reject)=>{

    })
    const _userLogin = async({uname,pass})=>{
        return new Promise(async(resolve,reject)=>{
            try {
              const data=  await axios.post('http://localhost:5500/account/login',
                  {
                    username:uname,
                    password:pass
                  },
                  {withCredentials:true})
                  .catch((err)=>{throw err})
                  .then((res)=>{
                   setUser(res.data.user)
                   resolve(res.data.message)
                  })
            } catch (error) {
                if(error.code === 'ERR_NETWORK'){
                    reject('terlalu banyak permintaan, cobalah beberapa saat lagi,')
                }
                reject(error.response?.data?.message)
            }
        })


        // try {
        //   const logins = await axios.post('http://localhost:5500/account/login',
        //   {
        //     username:uname,
        //     password:pass
        //   },
        //   {withCredentials:true})
        //   .catch((err)=>{throw err})
        //   .then((res)=>{
        //    setUser(res.data.user)
        //    const message='berhasil'
        //    return res.data.message
        //   })
        // } catch (error) {
        //     console.log(error)
        // }
    }

    const _userLogout = async()=>{
        return new Promise(async(resolve,reject)=>{

            const logout = await axios.delete('http://localhost:5500/account/logout',{withCredentials:true})
            .catch((err)=>{
                if(err.response.status === 401){
                    setUser([])
                    reject(err)
                }
                reject(err.code)
                
            })
            .then((res)=>{
                resolve(res?.data)
            })
        })
           
        
    }

 
    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                _userLogin,
                _userLogout,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useAuth = ()=>{
    return useContext(UserContext)
}

