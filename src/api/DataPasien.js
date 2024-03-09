import axios from 'axios'

// export default axios.create ({
//     baseURL:`${process.env.REACT_APP_DATAPAS}`,
// })
export default axios.create ({
    baseURL:`/.netlify/functions/exec`,
    headers:{
        Accept:'appication/json'
    }
})

