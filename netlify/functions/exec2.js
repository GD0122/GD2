const axios = require('axios')
require("dotenv").config()
const cryptoJS = require('crypto-js')
exports.handler = async(event,context)=>{
    let salt = process.env.REACT_APP_SALT
    const {peop} = event.queryStringParameters;
    try {
       
        const getUser = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${peop}`,{
            Headers:{Authorization: `Bearer ${peop}`,
                Accept:'application/json',"Accept-Encoding":"identity",
            
           },
            params:{trophies:true}
        }).then((res)=>{
      
            return res.data
        })
        const dataPals = getUser
        const outPars = cryptoJS.AES.encrypt(
            JSON.stringify(dataPals),
            salt
          ).toString();
   
      
       return{
        statusCode:200,
        body: JSON.stringify({outPars})
       }
    } catch (error) {
        return{
            statusCode:500,
            body: JSON.stringify({"message":"Sorry something Err"})
        }
    }
}