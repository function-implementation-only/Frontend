import axios from 'axios'
import { PostAPI, PostAPIInterface } from './data/postAPI/postAPI'
import AccountAPI, { AccountAPIInterface } from './data/accountAPI/accountAPI'
import { ParserAPI } from './data/parserAPI/parserAPI'

export interface ContextInterface {
    postAPI: PostAPIInterface
    accountAPI: AccountAPIInterface
    parserAPI: ParserAPI
}

export class Context implements ContextInterface {
    postAPI

    accountAPI

    parserAPI

    constructor() {
        const axiosInstance = axios.create({
            baseURL: import.meta.env.VITE_API_END_POINT,
        })

        this.postAPI = PostAPI.getInstance(axiosInstance)
        this.accountAPI = AccountAPI.getInstance(axiosInstance)
        this.parserAPI = ParserAPI.getInstance()
    }
}
