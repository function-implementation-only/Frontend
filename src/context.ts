import { PostAPI, PostAPIInterface } from './data/postAPI'
import AccountAPI, { AccountAPIInterface } from './data/accountAPI'
import ChatAPI, { ChatAPIInterface } from './data/chatAPI'

export interface ContextInterface {
    postAPI: PostAPIInterface
    signUpAPI: AccountAPIInterface
    chatAPI: ChatAPIInterface
}

export class Context implements ContextInterface {
    postAPI

    signUpAPI

    chatAPI

    constructor() {
        this.postAPI = new PostAPI()
        this.signUpAPI = new AccountAPI()
        this.chatAPI = new ChatAPI()
    }
}
