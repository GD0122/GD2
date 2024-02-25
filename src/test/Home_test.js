import axios from 'axios'
import React, { useEffect } from 'react'
import Data_test from '../api/Data_test'
import DataPasien from '../api/DataPasien'
import CryptoJS from "crypto-js";

function Home_test() {
   let salt = 'f844b09ff50c'
   async function getData(){
    let apiUrl = "/.netlify/functions/Exec_ones"
    // const testUrl = "http://localhost:5500/api/testers/tester"
    
      const data = await axios(apiUrl,{
        method: "GET",
        headers: { accept: "application/json" },
        
      })
        const datas = data.data.datas

        //decrypt data1
    //     console.log(datas)
    //     let o = decodeURI(datas);
    //     console.log(o.indexOf(salt))
    //     if(salt && o.indexOf(salt) !== 0)
  
    //     throw new Error('object cannot be decrypted');
    //     o = o.substring(salt.length).split('');
    //     for(var i = 0, l = o.length; i < l; i++)
    //         if(o[i] == '{')
    //             o[i] = '}';
    //         else if(o[i] == '}')
    //             o[i] = '{';
    //     const dataD = (JSON.parse(o.join('')))
    // console.log(dataD.data)


    //decrypt data2


    const bytes=  CryptoJS.AES.decrypt(datas, salt)
    const dataD = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    console.log("this de",dataD.data)
   }
  
        

   getData()
  // const tests = {data:{message:"hello",test:"test"}}
  // const encryptData = () => {
  //   const data = CryptoJS.AES.encrypt(
  //     JSON.stringify(tests),
  //     salt
  //   ).toString();

  //     console.log("this  en",data)
      
  //     const bytes=  CryptoJS.AES.decrypt(data, salt)
  //     const datas = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  //     console.log("this de",datas)
  // };
  // encryptData()

  return (
    <div style={{margin:'100px 10px 10px 10px',minWidth:'100%',minHeight:'100vh'}}>
        <div>
            <h1>Ini Home</h1>
        </div>
    </div>
  )
}

export default Home_test