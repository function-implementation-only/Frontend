import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { SignUpInfo } from '../types/inedx'
import setInterceptors from './interceptor'

export interface AccountAPIInterface {
    instance: AxiosInstance
    postSignUp: (data: SignUpInfo) => Promise<AxiosResponse>
}

export default class AccountAPI implements AccountAPIInterface {
    instance

    constructor() {
        this.instance = setInterceptors(axios.create())
    }

    public postSignUp(data: SignUpInfo) {
        return this.instance.post('/account/signup', data)
    }
}
