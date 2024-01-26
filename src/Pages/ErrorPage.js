import React, { useEffect } from 'react'

function ErrorPage() {
    useEffect(()=>{
        setInterval(()=>{
            Nav('/')
        },5000)
    })
  return (
    <div>
        <div style={{minHeight:'1000px',display:'flex',alignItems:'center'}}>
            <h1>Maaf Permintaan anda tidak bisa diteruskan</h1>
        </div>
    </div>
  )
}

export default ErrorPage