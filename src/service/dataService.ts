import { ParserAPI } from 'data/parserAPI/parserAPI'
import { PostAPI, PostAPIInterface } from 'data/postAPI/postAPI'
import AccountAPI, { AccountAPIInterface } from 'data/accountAPI/accountAPI'
import ChatAPI, { ChatAPIInterface } from 'data/ChatAPI/chatAPI'

export interface DataServiceInterface {
    postAPI: PostAPIInterface
    accountAPI: AccountAPIInterface
    parserAPI: ParserAPI
    chatAPI: ChatAPIInterface
}

export class DataService implements DataServiceInterface {
    postAPI

    accountAPI

    parserAPI

    chatAPI

    constructor() {
        this.postAPI = new PostAPI()
        this.accountAPI = new AccountAPI()
        this.parserAPI = new ParserAPI()
        this.chatAPI = new ChatAPI()
    }
}
