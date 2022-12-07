import axios from 'axios'
import { SignUpInfo } from '../types/inedx'
import setInterceptors from './interceptor'

export default class SignUpAPI {
    constructor() {
        this.instance = setInterceptors(axios.create())
    }

    private instance

    public postSignUp(data: SignUpInfo) {
        return this.instance.post('/account/signup', data)
    }
}
