const axios = require('axios')
require("dotenv").config()
const cryptoJS = require('crypto-js')
const { Provider } = require('react-redux')
exports.handler = async(event,context)=>{
    let salt = process.env.REACT_APP_SALT
    const dt = process.env.REACT_APP_DT1
    const dt2 = process.env.REACT_APP_DT2
    const dt3 = process.env.REACT_APP_DT3
        try {
        const getUser = await axios.get(`https://script.google.com/macros/s/${dt}/exec`,
            {Headers:{Accept:"aplication/json"}}
        )
        .then((res)=>{
            
            return res.data
        })
        
        const dataPals = getUser
        const outPars1 = cryptoJS.AES.encrypt(
            JSON.stringify(dataPals),
            salt
          ).toString();

        const getUser1 = await axios.get(`https://script.google.com/macros/s/${dt2}/exec`,
        {Headers:{Accept:"aplication/json"}})
        .then((res)=>{
          return res.data
         })
      
      const dataPals1 = getUser1
      const outPars2 = cryptoJS.AES.encrypt(
          JSON.stringify(dataPals1),
          salt
        ).toString();


        const getUser2 = await axios.get(`https://script.google.com/macros/s/${dt3}/exec`,
        {Headers:{Accept:"aplication/json"}})
        .then((res)=>{
          return res.data
         })
      
      const dataPals2 = getUser2
      const outPars3 = cryptoJS.AES.encrypt(
          JSON.stringify(dataPals2),
          salt
        ).toString();

 
       
       
        return{
            statusCode:200,
            body:JSON.stringify({out1:outPars1,out2:outPars2,out3:outPars3})
        }
    } catch (error) {
        return{
            statusCode:500,
            body: JSON.stringify({message:"Sorry something Err"})
        }
    }
}