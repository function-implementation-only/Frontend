import { PostAPI, PostAPIInterface } from './data/postAPI'
import SignUpAPI from './data/signUpApi'

export interface ContextInterface {
    postAPI: PostAPIInterface
}

export class Context implements ContextInterface {
    postAPI

    signUpAPI

    constructor() {
        this.postAPI = new PostAPI()
        this.signUpAPI = new SignUpAPI()
    }
}
