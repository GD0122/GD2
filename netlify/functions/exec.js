const axios = require('axios')
require("dotenv").config()
const cryptoJS = require('crypto-js')
exports.handler = async(event,context)=>{
    let salt = process.env.REACT_APP_SALT
 
    try {
        const getUser = await axios.get(`https://script.google.com/macros/s/AKfycbzx8p9Khpp1vNrMACkFyirl31m-SOqlPTMa0cF8o4IMUS06wPPF9898rrADCBdzdjUOYg/exec`,
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

        const getUser1 = await axios.get(`https://script.google.com/macros/s/AKfycbyqRxKDbIHkp1dRUxRKSmJ67j-_L3OPfEGFeIBZV4ZO3MfB0g44GgnAH2Rw8ER7DpvlcA/exec`,
        {Headers:{Accept:"aplication/json"}})
        .then((res)=>{
          return res.data
         })
      
      const dataPals1 = getUser1
      const outPars2 = cryptoJS.AES.encrypt(
          JSON.stringify(dataPals1),
          salt
        ).toString();


        const getUser2 = await axios.get(`https://script.google.com/macros/s/AKfycbyDTTQ3-VlDnAM8uJpGNOhWqfaz03PCptpR2LE_-enSxhP4xD5OKw6TsvRpLFPuW-Oe0Q/exec`,
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