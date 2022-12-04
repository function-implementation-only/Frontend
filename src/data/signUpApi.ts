import axiosInstance from './index'

export default function signUpApi(
    email: string,
    nickname: string,
    password: string
) {
    axiosInstance.post('/account/signup', {
        email,
        nickname,
        password,
    })
}
