import axios from 'axios'
import { PostAPI, PostAPIInterface } from './data/postAPI/postAPI'
import AccountAPI, { AccountAPIInterface } from './data/accountAPI/accountAPI'

export interface ContextInterface {
    postAPI: PostAPIInterface
    accountAPI: AccountAPIInterface
}

export class Context implements ContextInterface {
    postAPI

    accountAPI

    constructor() {
        const axiosInstance = axios.create({
            baseURL: import.meta.env.VITE_API_END_POINT,
        })

        this.postAPI = PostAPI.getInstance(axiosInstance)
        this.accountAPI = new AccountAPI()
    }
}
