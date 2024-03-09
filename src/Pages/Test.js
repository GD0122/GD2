import React from 'react'
import { Bounce, ToastContainer } from 'react-toastify'

function Test() {
  return (
    <div>
        <ToastContainer
position="top-left"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    </div>
  )
}

export default Test