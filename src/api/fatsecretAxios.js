import Axios from 'axios'

const fatsecretInstance = Axios.create({
  baseURL: import.meta.env.VITE_FATSECRET,
  headers: { Authorization: 'Bearer ' + import.meta.env.VITE_FATSECRET_TOKEN },
  timeout: 5000,
  params: {
    mathod: 'food.get.v2',
    food_id: 1000,
    format: 'json',
  },
})

//요청 인터셉터
fatsecretInstance.interceptors.request.use(
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
fatsecretInstance.interceptors.response.use(
  (config) => {
    //응답에 대한 로직
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
export default fatsecretInstance
