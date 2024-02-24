import axios from 'axios'
import React, { useEffect } from 'react'
import Data_test from '../api/Data_test'
import DataPasien from '../api/DataPasien'

function Home_test() {
    const getData = async()=>{
      const test = await axios.get(`https://script.google.com/macros/s/AKfycbyFPW2ZJ0CEy_61VP0yQP3BUok8AaE8BYktRvYOGd387fidVOPtyQS108PtjZflZkdd/exec`,{
        method:'Get',
        headers:{
           Accept: "application/json", "Accept-Encoding": "identity",
  
        },
        body:{
          "key":"test123"
        },
        params:{trophies:true}
      })
      console.log(test.data)
    }
    function clearConsole() { 
      if(window.console || window.console.firebug) {
         console.clear();
      }
  }

    getData()
    clearConsole()
  return (
    <div style={{margin:'100px 10px 10px 10px',minWidth:'100%',minHeight:'100vh'}}>
        <div>
            <h1>Ini Home</h1>
        </div>
    </div>
  )
}

export default Home_test