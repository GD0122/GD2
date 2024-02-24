const axios = require('axios')
require("dotenv").config()

exports.handler = async(event,context)=>{
    const salt = "HJSHdjajshjdhasyduyshJHJUSyui187suiU7s6d678"
   
    try {
       let response = await axios.get(`https://script.google.com/macros/s/${process.env.REACT_APP_KEY}/exec`,{
        Headers:{Accept:'application/json',"Accept-Encoding":"identity"},
        params:{trophies:true}
       })
       let datas = response.data
    //    const o = JSON.stringify(datas).split('');
    //    for(var i = 0, l = o.length; i < l; i++)
    //      if(o[i] == '{')
    //          o[i] = '}';
    //      else if(o[i] == '}')
    //          o[i] = '{';
    //     const data= encodeURI(salt + o.join(''));
      
      
       return{
        statusCode:200,
        body: JSON.stringify({datas})
       }
    } catch (error) {
        return{
            statusCode:500,
            body: JSON.stringify({error})
        }
    }
}