const axios = require('axios')
require("dotenv").config()
const cryptoJS = require('crypto-js')
exports.handler = async(event,context)=>{
    let salt = 'f844b09ff50c'
    const {access} = event.quryStringParameters
    try {
        const data = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access}`,{
            Headers:{Accept:'application/json',"Accept-Encoding":"identity"},
            params:{trophies:true}
        })
     
        const dataPals = data.data
        const datas = cryptoJS.AES.encrypt(
            JSON.stringify(dataPals),
            salt
          ).toString();
        console.log(datas)
        // return res.status(200).json({datas})
     
//  const tests = data.data
//         const o = JSON.stringify(tests).split('');
//         for(var i = 0, l = o.length; i < l; i++)
//             if(o[i] == '{')
//                 o[i] = '}';
//             else if(o[i] == '}')
//                 o[i] = '{';
//         const datas= encodeURI(salt + o.join(''));
      
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