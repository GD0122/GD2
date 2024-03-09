const axios = require('axios')
require("dotenv").config()
const cryptoJS = require('crypto-js')
exports.handler = async(event,context)=>{
    let salt = process.env.REACT_APP_SALT
    const dt = process.env.REACT_APP_DT4
    const dt1 = process.env.REACT_APP_DT5
    try {
        const getUser = await axios.get(`https://script.google.com/macros/s/${dt}/exec`,
            {Headers:{Accept:"aplication/json"}}
        )
        .then((res)=>{
            
            return res.data
        })
        
        const dataPals = getUser
        const outPars = cryptoJS.AES.encrypt(
            JSON.stringify(dataPals),
            salt
          ).toString();

          const getUser1 = await axios.get(`https://script.google.com/macros/s/${dt1}/exec`,
          {Headers:{Accept:"aplication/json"}}
      )
      .then((res)=>{
          
          return res.data
      })
      
      const dataPals1 = getUser1
      const outPars1 = cryptoJS.AES.encrypt(
          JSON.stringify(dataPals1),
          salt
        ).toString();
       
        return{
            statusCode:200,
            body:JSON.stringify({out1:outPars,out2:outPars1})
        }
    } catch (error) {
        return{
            statusCode:500,
            body: JSON.stringify({message:"Sorry something Err"})
        }
    }
}