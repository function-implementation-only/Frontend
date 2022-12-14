import { AxiosInstance, AxiosResponse } from 'axios'
import { AccountInfo, SignUpInfo } from '../../types/account'
import setInterceptors from './interceptor'

export interface AccountAPIInterface {
    postSignUp: (data: SignUpInfo) => Promise<AxiosResponse>
    postLogIn: (data: AccountInfo) => Promise<AxiosResponse>
    postEmailAuth: (email: string) => Promise<AxiosResponse>
    postLogOut: () => Promise<AxiosResponse>
}

export default class AccountAPI implements AccountAPIInterface {
    instance

    constructor() {
        this.instance = setInterceptors(axios.create())
    }

    public postSignUp(data: SignUpInfo) {
        return setInterceptors(this.axiosInstance).post('/account/signup', data)
    }

    public postLogin(data: AccountInfo) {
        return this.instance.post('/account/login', data)
    }

    public postLogOut() {
        return setInterceptors(this.axiosInstance).post('/logout')
    }

    public postEmailAuth(email: string) {
        return setInterceptors(this.axiosInstance).post(
            '/account/signup/email-check',
            { email }
        )
    }
}
