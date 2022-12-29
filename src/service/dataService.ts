import axios from 'axios'
import { ParserAPI } from 'data/parserAPI/parserAPI'
import { PostAPI, PostAPIInterface } from 'data/postAPI/postAPI'
import AccountAPI, { AccountAPIInterface } from 'data/accountAPI/accountAPI'

export interface DataServiceInterface {
    postAPI: PostAPIInterface
    accountAPI: AccountAPIInterface
    parserAPI: ParserAPI
}

export class DataService implements DataServiceInterface {
    private static instance: DataService

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

    public static getInstance() {
        if (this.instance) {
            return this.instance
        }
        this.instance = new DataService()
        return this.instance
    }
}
