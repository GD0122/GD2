import axios from 'axios'
import React from 'react'

exports.handler= async(event,context)=> {
    try {
        const {key}=event.queryStringParameters
        const res = await axios.get('https://script.google.com/macros/s/AKfycbzjfpC91xiZqIR3Jo8wFPKUfDRoFKNxiO5CmkPWhdw2M-GqnWvs91OHHb3bDrrdqGh2/exec',{
            headers: { Accept: "application/json", "Accept-Encoding": "identity" },
            params: { trophies: true },
        })
        const data = res.data
        return{
            statusCode:200,
            body: JSON.stringify({data})
        }
    } catch (error) {
        return{
            statusCode:500,
            body: JSON.stringify({error})
        }
    }

}
