import { PostAPI, PostAPIInterface } from './data/postAPI'
import AccountAPI, { AccountAPIInterface } from './data/accountAPI'

export interface ContextInterface {
    postAPI: PostAPIInterface
    signUpAPI: AccountAPIInterface
}

export class Context implements ContextInterface {
    postAPI

    signUpAPI

    constructor() {
        this.postAPI = new PostAPI()
        this.signUpAPI = new AccountAPI()
    }
}
