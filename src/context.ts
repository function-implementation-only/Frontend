import { PostAPI } from './data/postAPI'
import AccountAPI, { AccountAPIInterface } from './data/accountAPI'
import PostAPIMock from './data/postAPIMock'

export interface ContextInterface {
    postAPI: any
    // FIX ME : 조건에 따라 다른 인터페이스 적용 방법 찾는 중
    signUpAPI: AccountAPIInterface
}

export class Context implements ContextInterface {
    postAPI

    signUpAPI

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
