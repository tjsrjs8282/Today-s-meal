import Axios from 'axios'

const axiosInstance = Axios.create({
  baseURL: import.meta.env.VITE_PRODUCTS,
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
  (response) => {
    //응답에 대한 로직
    const res = response.data
    return res
  },
  (err) => {
    return Promise.reject(err)
  }
)
export default axiosInstance
