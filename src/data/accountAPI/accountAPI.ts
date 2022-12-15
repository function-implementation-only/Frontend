import axios, { AxiosResponse } from 'axios'
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
        this.instance = setInterceptors(
            axios.create({
                baseURL: import.meta.env.VITE_API_END_POINT,
            })
        )
    }

    public postSignUp(data: SignUpInfo) {
        return setInterceptors(this.instance).post('/account/signup', data)
    }

    public postLogIn(data: AccountInfo) {
        return this.instance.post('/account/login', data)
    }

    public postLogOut() {
        return setInterceptors(this.instance).post('/logout')
    }

    public postEmailAuth(email: string) {
        return setInterceptors(this.instance).post(
            '/account/signup/email-check',
            { email }
        )
    }
}
