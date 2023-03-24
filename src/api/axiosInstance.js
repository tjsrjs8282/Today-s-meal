import Axios from 'axios'

export const axiosInstance = Axios.create({
  timeout: 5000,
})

//요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    //요청 보내기 전에 수행 로직

    return config
  },
  (err) => {
    //요청 에러 시 수행 로직
    return Promise.reject(err)
  }
)

//응답 인터셉터
axiosInstance.interceptors.response.use(
  (config) => {
    //응답에 대한 로직
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

export const productInstance = Axios.create({
  baseURL: import.meta.env.VITE_PRODUCTS,
  timeout: 5000,
})

export const fatsecretInstance = axiosInstance
fatsecretInstance.defaults.baseURL = '/fat/'
fatsecretInstance.defaults.headers = {
  Authorization: 'Bearer ' + import.meta.env.VITE_FATSECRET_TOKEN,
}

export const weatherInstance = Axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  timeout: 5000,
})
