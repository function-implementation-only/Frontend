import { AxiosInstance } from 'axios'
import { AccountInfo, SignUpInfo } from '../../types/account'
import setInterceptors from '../interceptor'

export interface AccountAPIInterface {
    postSignUp: (data: SignUpInfo) => Promise<SignUpInfo>
    postLogIn: (data: AccountInfo) => Promise<any>
    postLogOut: () => Promise<any>
    postEmailAuth: (email: string) => Promise<any>
    getKakaoLogin: (code: string | null) => Promise<any>
    getGoogleLogin: (code: string | null) => Promise<any>
}

export default class AccountAPI implements AccountAPIInterface {
    axiosInstance: AxiosInstance

    constructor(axiosInstance: AxiosInstance) {
        this.axiosInstance = axiosInstance
    }

    postSignUp(data: SignUpInfo) {
        return setInterceptors.post<SignUpInfo>('/account/signup', data)
    }

    postLogIn(data: AccountInfo) {
        return setInterceptors.post('/account/login', data)
    }

    postLogOut() {
        return setInterceptors.post('/account/logout')
    }

    postEmailCheck(email: string) {
        return setInterceptors.post('/account/email', {
            email,
        })
    }

    postEmailAuth(email: string) {
        return setInterceptors.post('/account/signup/email-check', { email })
    }

    getKakaoLogin(code: string | null) {
        return setInterceptors.get(`/socials/signup/kakao?code=${code}`)
    }

    getGoogleLogin(code: string | null) {
        return setInterceptors.get(`/google/test?code=${code}`)
    }
}
