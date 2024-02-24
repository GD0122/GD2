const axios = require('axios')
require("dotenv").config()

exports.handler = async(event,context)=>{
    console.log("hello")
    try {
       let response = await axios.get(`https://script.google.com/macros/s/${process.env.REACT_APP_KEY}/exec`,{
        Headers:{Accept:'application/json',"Accept-Encoding":"identity"},
        params:{trophies:true}
       })
      

       let data = response.data
       let encode =  Buffer.from(data).toString('base64')
       return{
        statusCode:200,
        body: JSON.stringify({encode})
       }
    } catch (error) {
        return{
            statusCode:500,
            body: JSON.stringify({error})
        }
    }
}