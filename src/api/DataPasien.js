import axios from 'axios'

// export default axios.create ({
//     baseURL:`${process.env.REACT_APP_DATAPAS}`,
// })
export default axios.create ({
    baseURL:`/.netlify/function/exec3`,
    headers:{
        Accept:'appication/json'
    }
})

