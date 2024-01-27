import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Page404() {
    const Nav = useNavigate()
    useEffect(()=>{
        setInterval(()=>{
            Nav('/')
        },5000)
    },[])
  return (
    <div>
        <div  style={{zIndex:'3000', minHeight:'1000px',width:'100%',display:'flex',margin:'0px',alignItems:'center',justifyContent:'center'}}>
            <h1>Page Belum Tersedia</h1>
        </div>
    </div>
  )
}

export default Page404