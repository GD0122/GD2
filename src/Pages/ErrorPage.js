import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "../component/datapasien.css"

function ErrorPage() {

    const Nav = useNavigate()
    useEffect(()=>{
        setInterval(()=>{
            Nav('/')
        },5000)
    })
  return (
    <div className='containers'>
        <div >
            <h1>Maaf Permintaan anda tidak bisa diteruskan</h1>
        </div>
    </div>
  )
}

export default ErrorPage