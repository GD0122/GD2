import axios from 'axios'

export default axios.create ({
    baseURL:`/.netlify/functions/exec3`,
    headers:{
        Accept:'appication/json'
    }
})