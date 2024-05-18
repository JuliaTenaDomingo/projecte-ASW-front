import axios from "axios"

axios.defaults.baseURL = 'https://tuiter.fly.dev';

axios.interceptors.request.use(
    config => {
        config.headers['API-KEY'] = `96e76c7a1a99a34386fab31b0e6d7f7d`
        config.headers['Accept'] = 'application/json'
        //config.headers['Content-Type'] = 'application/json'
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

export default axios