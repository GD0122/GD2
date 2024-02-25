

const axios = require('axios')
require("dotenv").config()
const cryptoJS = require('crypto-js')
exports.handler = async(event,context)=>{
    let salt =  process.env.REACT_APP_SALT
    const tests = {data:{message:"hello",test:"test"}}
    try {
        const data = await axios.get(`https://script.google.com/macros/s/${process.env.REACT_APP_KEY}/exec`,{
            Headers:{Accept:'application/json',"Accept-Encoding":"identity"},
            params:{trophies:true}
        })
     
        const dataPals = data.data
        const datas = cryptoJS.AES.encrypt(
            JSON.stringify(dataPals),
            salt
          ).toString();
      
       return{
        statusCode:200,
        body: JSON.stringify({datas})
       }
    } catch (error) {
        return{
            statusCode:500,
            body: JSON.stringify({"message":"Sorry something Err"})
        }
    }
}
