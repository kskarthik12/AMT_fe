import axios from 'axios'

const AxiosService = axios.create({
    baseURL:"https://kskarthik.azurewebsites.net",
    headers:{
        "Content-Type":"application/json"
    }
})

AxiosService.interceptors.request.use(config=>{
    const token = sessionStorage.getItem('token')
    if(config.authenticate && token)
    {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default AxiosService
