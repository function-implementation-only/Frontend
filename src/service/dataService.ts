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
    postAPI

    accountAPI

    parserAPI

    constructor() {
        const axiosInstance = axios.create({
            baseURL: import.meta.env.VITE_API_END_POINT,
        })

        this.postAPI = new PostAPI(axiosInstance)
        this.accountAPI = new AccountAPI(axiosInstance)
        this.parserAPI = new ParserAPI()
    }
}
