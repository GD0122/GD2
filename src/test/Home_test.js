import axios from 'axios'
import React, { useEffect } from 'react'
import Data_test from '../api/Data_test'
import DataPasien from '../api/DataPasien'

function Home_test() {
   let salt = 'f844b09ff50c'
   async function getData(){
    // let apiUrl = "/.netlify/functions/getData"
    const testUrl = "http://localhost:5500/api/testers/tester"
    try {
      const data = await axios(testUrl,{
        method: "GET",
        headers: { accept: "application/json" },
        
      })
        const datas = data.data.datas
        console.log(datas)
        let o = decodeURI(datas);
        console.log(o.indexOf(salt))
        if(salt && o.indexOf(salt) !== 0)
  
        throw new Error('object cannot be decrypted');
    o = o.substring(salt.length).split('');
    for(var i = 0, l = o.length; i < l; i++)
        if(o[i] == '{')
            o[i] = '}';
        else if(o[i] == '}')
            o[i] = '{';
    const dataD = (JSON.parse(o.join('')))
    console.log(dataD.data)
        
// const getData =async() =>{
//   const data = await axios.get("http://localhost:5500/api/testers/tester",{
 
//   }).catch((err)=>{
//    console.log(err.data)
//   })
//   const datas = data.data.data
//   console.log(datas)
//  let o = decodeURI(datas);
//  console.log(decodeURI(datas))
//    if(salt && o.indexOf(salt))
//        throw new Error('object cannot be decrypted');
//    o = o.substring(salt.length).split('');
//    for(var i = 0, l = o.length; i < l; i++)
//        if(o[i] == '{')
//            o[i] = '}';
//        else if(o[i] == '}')
//            o[i] = '{';
//    const test = JSON.parse(o.join(''));
//    console.log("this",test.message)
  
// } 
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