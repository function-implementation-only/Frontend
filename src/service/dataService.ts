import { ParserAPI, ParserAPIInterface } from 'data/parserAPI/parserAPI'
import { PostAPI, PostAPIInterface } from 'data/postAPI/postAPI'
import AccountAPI, { AccountAPIInterface } from 'data/accountAPI/accountAPI'
import { LikesAPI, LikesAPIInterface } from 'data/likesAPI/likesAPI'

export interface DataServiceInterface {
    postAPI: PostAPIInterface
    accountAPI: AccountAPIInterface
    parserAPI: ParserAPIInterface
    likesAPI: LikesAPIInterface
}

export class DataService implements DataServiceInterface {
    postAPI

    accountAPI

    parserAPI

    likesAPI

    constructor() {
        this.postAPI = new PostAPI()
        this.accountAPI = new AccountAPI()
        this.parserAPI = new ParserAPI()
        this.likesAPI = new LikesAPI()
    }
}
