import { AxiosInstance, AxiosResponse } from 'axios'
import { AccountInfo, SignUpInfo } from '../../types/account'
import setInterceptors from '../interceptor'

export interface AccountAPIInterface {
    postSignUp: (data: SignUpInfo) => Promise<SignUpInfo>
    postLogIn: (data: AccountInfo) => Promise<AxiosResponse>
    postLogOut: () => Promise<AxiosResponse>
    postEmailCheck: (email: string) => Promise<AxiosResponse>
    postPasswordCheck: (
        email: string,
        password: string
    ) => Promise<AxiosResponse>
    postEmailAuth: (email: string) => Promise<AxiosResponse>
    getKakaoLogin: (code: string | null) => Promise<AxiosResponse>
    getGoogleLogin: (code: string | null) => Promise<AxiosResponse>
    getAccountInfo: () => Promise<AxiosResponse>
    editAccountInfo: (payload: FormData) => Promise<AxiosResponse>
    editPassword: (email: string, password: string) => Promise<AxiosResponse>
}

export default class AccountAPI implements AccountAPIInterface {
    axiosInstance: AxiosInstance

    constructor(axiosInstance: AxiosInstance) {
        this.axiosInstance = axiosInstance
    }

    postSignUp(data: SignUpInfo) {
        return setInterceptors.post<SignUpInfo>('/account/signup', data)
    }

    postLogIn(data: AccountInfo): Promise<AxiosResponse> {
        return setInterceptors.post('/account/login', data)
    }

    postLogOut(): Promise<AxiosResponse> {
        return setInterceptors.post('/account/logout')
    }

    postEmailCheck(email: string): Promise<AxiosResponse> {
        return setInterceptors.post('/account/email', {
            email,
        })
    }

    postPasswordCheck(email: string, password: string): Promise<AxiosResponse> {
        return setInterceptors.post('/account/password/check', {
            email,
            password,
        })
    }

    postEmailAuth(email: string): Promise<AxiosResponse> {
        return setInterceptors.post('/account/signup/email-check', { email })
    }

    getKakaoLogin(code: string | null): Promise<AxiosResponse> {
        return setInterceptors.get(`/socials/signup/kakao?code=${code}`)
    }

    getGoogleLogin(code: string | null): Promise<AxiosResponse> {
        return setInterceptors.get(`/google/test?code=${code}`)
    }

    getAccountInfo(): Promise<AxiosResponse> {
        return setInterceptors.get('account/info')
    }

    editAccountInfo(payload: FormData): Promise<AxiosResponse> {
        return setInterceptors.patch('account', payload)
    }

    editPassword(email: string, password: string): Promise<AxiosResponse> {
        return setInterceptors.patch('account/password/change', {
            email,
            password,
        })
    }
}
