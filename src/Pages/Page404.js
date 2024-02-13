import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../component/datapasien.css'

function Page404() {
    const Nav = useNavigate()
    useEffect(()=>{
        setInterval(()=>{
            Nav('/')
        },5000)
    },[])
  return (
    <div className='containers'>
        <div  >
            <h1>Page Belum Tersedia</h1>
        </div>
    </div>
  )
}

export default Page404