import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { SignUpInfo } from '../types/inedx'
import setInterceptors from './interceptor'

export interface SignUpAPIInterface {
    instance: AxiosInstance
    postSignUp: (data: SignUpInfo) => Promise<AxiosResponse>
}

export default class SignUpAPI implements SignUpAPIInterface {
    instance

    constructor() {
        this.instance = setInterceptors(axios.create())
    }

    public postSignUp(data: SignUpInfo) {
        return this.instance.post('/account/signup', data)
    }
}
