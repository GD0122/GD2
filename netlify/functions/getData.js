const axios = require('axios')
require("dotenv").config()

exports.handler = async(event,context)=>{
    let salt = 'f844b09ff50c'
    const tests = {data:{message:"hello",test:"test"}}
    try {
        const data = await axios.get(`https://script.google.com/macros/s/${process.env.REACT_APP_KEY}/exec`,{
            Headers:{Accept:'application/json',"Accept-Encoding":"identity"},
            params:{trophies:true}
        })
     
        const tests = data.data
        const o = JSON.stringify(tests).split('');
        for(var i = 0, l = o.length; i < l; i++)
            if(o[i] == '{')
                o[i] = '}';
            else if(o[i] == '}')
                o[i] = '{';
        const datas= encodeURI(salt + o.join(''));
     

      
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