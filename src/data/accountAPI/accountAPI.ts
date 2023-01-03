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
    private axiosInstance: AxiosInstance

    private static instance: AccountAPI

    private constructor(axiosInstance: AxiosInstance) {
        this.axiosInstance = axiosInstance
    }

    public static getInstance(axiosInstance: AxiosInstance) {
        if (this.instance) {
            return this.instance
        }
        this.instance = new AccountAPI(axiosInstance)
        return this.instance
    }

    public postSignUp(data: SignUpInfo) {
        return setInterceptors(this.axiosInstance).post('/account/signup', data)
    }

    public postLogIn(data: AccountInfo) {
        return setInterceptors(this.axiosInstance).post('/account/login', data)
    }

    public postLogOut() {
        return setInterceptors(this.axiosInstance).post('/account/logout')
    }

    public postEmailAuth(email: string) {
        return setInterceptors(this.axiosInstance).post(
            '/account/signup/email-check',
            { email }
        )
    }

    public getKakaoLogin(code: string | null) {
        return setInterceptors(this.axiosInstance).get(
            `/socials/signup/kakao?code=${code}`
        )
    }

    public getGoogleLogin(code: string | null) {
        return setInterceptors(this.axiosInstance).get(
            `/google/test?code=${code}`
        )
    }
}
