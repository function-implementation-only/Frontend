import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API_HOST}`,
    params: {
        language: 'ko-KR',
    },
})

export default axiosInstance
