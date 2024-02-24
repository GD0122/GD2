import React from 'react'
import { useGoogleLogin } from '@react-oauth/google'

const googleAuthContext= React.createContext

export const Test_context = ({children})=>{
    const googleAuth = useGoogleLogin({
        clientId:'681504572844-usas32cn2fm092v2u64dfu10d0v4os83.apps.googleusercontent.com'
    })

    return (
        <googleAuthContext.Provider value={googleAuth}>
            {children}
        </googleAuthContext.Provider>
    )
}
export const useGoogleAuth =()=>{
    React.useContext(googleAuthContext)
}