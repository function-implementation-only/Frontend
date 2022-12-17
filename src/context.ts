import axios from 'axios'
import { PostAPI, PostAPIInterface } from './data/postAPI/postAPI'
import AccountAPI, { AccountAPIInterface } from './data/accountAPI/accountAPI'
import ChatAPI, { ChatAPIInterface } from './data/ChatAPI/chatAPI'

export interface ContextInterface {
    postAPI: PostAPIInterface
    accountAPI: AccountAPIInterface
    chatAPI: ChatAPIInterface
}

export class Context implements ContextInterface {
    postAPI

    accountAPI

    chatAPI

    constructor() {
        const axiosInstance = axios.create({
            baseURL: import.meta.env.VITE_API_END_POINT,
        })

        this.postAPI = PostAPI.getInstance(axiosInstance)
        this.accountAPI = AccountAPI.getInstance(axiosInstance)
        this.chatAPI = ChatAPI.getInstance(axiosInstance)
    }
}
