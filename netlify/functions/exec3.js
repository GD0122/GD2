const axios = require('axios')
require("dotenv").config()
const cryptoJS = require('crypto-js')
exports.handler = async(event,context)=>{
    let salt = process.env.REACT_APP_SALT
 
    try {
        const getUser = await axios.get(`https://script.google.com/macros/s/${process.env.REACT_APP_DATAPAS}/exec`)
        .then((res)=>{
            return res.data
        })
        
        const dataPals = getUser
        const outPars = cryptoJS.AES.encrypt(
            JSON.stringify(dataPals),
            salt
          ).toString();
        return res.status(200).json({outPars})
    } catch (error) {
        return{
            statusCode:500,
            body: JSON.stringify({"message":"Sorry something Err"})
        }
    }
}