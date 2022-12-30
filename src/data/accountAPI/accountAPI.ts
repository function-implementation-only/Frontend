import { AxiosInstance, AxiosResponse } from 'axios'
import { AccountInfo, SignUpInfo } from '../../types/account'
import setInterceptors from './interceptor'

export interface AccountAPIInterface {
    postSignUp: (data: SignUpInfo) => Promise<AxiosResponse>
    postLogIn: (data: AccountInfo) => Promise<AxiosResponse>
    postLogOut: () => Promise<AxiosResponse>
    postEmailAuth: (email: string) => Promise<AxiosResponse>
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
        return setInterceptors(this.axiosInstance).post('/logout')
    }

    postEmailAuth(email: string) {
        return setInterceptors(this.axiosInstance).post(
            '/account/signup/email-check',
            { email }
        )
    }
}
