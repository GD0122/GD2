import React from 'react'
import {toast,Bounce} from 'react-toastify'
function Message({...props}) {
  return props.type === 'succes'? 
   toast.success(props.message,{
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
   })
   :
   toast.error(props.message,{
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
   })


}

export default Message