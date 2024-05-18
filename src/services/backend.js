import axios from "axios"

axios.defaults.baseURL = 'https://tuiter.fly.dev';

axios.interceptors.request.use(
    config => {
        config.headers['API-KEY'] = localStorage.getItem('apiKey');
        config.headers['Accept'] = 'application/json'
        //config.headers['Content-Type'] = 'application/json'
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

export default axios