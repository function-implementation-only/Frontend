import { PostAPI, PostAPIInterface } from './data/postAPI'
import AccountAPI, { AccountAPIInterface } from './data/accountAPI'
import PostAPIMock from './data/postAPIMock'

export interface ContextInterface {
    postAPI: PostAPIInterface
    signUpAPI: AccountAPIInterface
}

export class Context implements ContextInterface {
    postAPI

    constructor() {
        if (import.meta.env.DEV) {
            // 개발 모드일 경우 목데이터를 활용한 api로 교체
            this.postAPI = new PostAPIMock()
        } else {
            this.postAPI = new PostAPI()
        }
        this.signUpAPI = new AccountAPI()
    }
}
