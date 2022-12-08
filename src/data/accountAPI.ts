import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { AccountInfo } from '../types/inedx'
import setInterceptors from './interceptor'

export interface AccountAPIInterface {
    instance: AxiosInstance
    postSignUp: (data: AccountInfo) => Promise<AxiosResponse>
    postLogin: (data: AccountInfo) => Promise<AxiosResponse>
}

export default class AccountAPI implements AccountAPIInterface {
    instance

    constructor() {
        this.instance = setInterceptors(axios.create())
    }

    public postSignUp(data: AccountInfo) {
        return this.instance.post('/account/signup', data)
    }

    public postLogin(data: AccountInfo) {
        return this.instance.post('/account/login', data)
    }
}
