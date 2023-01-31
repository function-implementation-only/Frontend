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
        this.postAPI = new PostAPI()
        this.accountAPI = new AccountAPI()
        this.parserAPI = new ParserAPI()
    }
}
