import { AxiosInstance, AxiosResponse } from 'axios'
import { AccountInfo, SignUpInfo } from '../../types/account'
import setInterceptors from './interceptor'

export interface AccountAPIInterface {
    postSignUp: (data: SignUpInfo) => Promise<AxiosResponse>
    postLogIn: (data: AccountInfo) => Promise<AxiosResponse>
    postLogOut: () => Promise<AxiosResponse>
    postEmailAuth: (email: string) => Promise<AxiosResponse>
    getKakaoLogin: (code: string | null) => Promise<AxiosResponse>
    getGoogleLogin: (code: string | null) => Promise<AxiosResponse>
}

export default class AccountAPI implements AccountAPIInterface {
    axiosInstance: AxiosInstance

    constructor(axiosInstance: AxiosInstance) {
        this.axiosInstance = axiosInstance
    }

    postSignUp(data: SignUpInfo) {
        return setInterceptors(this.axiosInstance).post('/account/signup', data)
    }

    postLogIn(data: AccountInfo) {
        return setInterceptors(this.axiosInstance).post('/account/login', data)
    }

    postLogOut() {
        return setInterceptors(this.axiosInstance).post('/account/logout')
    }

    postEmailCheck(email: string) {
        return setInterceptors(this.axiosInstance).post('/account/email', {
            email,
        })
    }

    postEmailAuth(email: string) {
        return setInterceptors(this.axiosInstance).post(
            '/account/signup/email-check',
            { email }
        )
    }

    getKakaoLogin(code: string | null) {
        return setInterceptors(this.axiosInstance).get(
            `/socials/signup/kakao?code=${code}`
        )
    }

    getGoogleLogin(code: string | null) {
        return setInterceptors(this.axiosInstance).get(
            `/google/test?code=${code}`
        )
    }
}
