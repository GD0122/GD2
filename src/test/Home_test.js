import axios from 'axios'
import React, { useEffect } from 'react'
import Data_test from '../api/Data_test'
import DataPasien from '../api/DataPasien'

function Home_test() {
   async function getData(){
    let apiUrl = "/.netlify/functions/getData"
    try {
      const data = await fetch(apiUrl,{
        method:"GET",
      
      })
      const decodedData = Buffer.from(data, 'base64').toString('utf-8');
      console.log("hello",decodedData)
    } catch (error) {
      console.log("hellos",error)
    }
   }
   getData()
  return (
    <div style={{margin:'100px 10px 10px 10px',minWidth:'100%',minHeight:'100vh'}}>
        <div>
            <h1>Ini Home</h1>
        </div>
    </div>
  )
}

export default Home_test