import { PostAPI, PostAPIInterface } from './data/postAPI'

export interface ContextInterface {
    postAPI: PostAPIInterface
}

export class Context implements ContextInterface {
    postAPI

    constructor() {
        this.postAPI = new PostAPI()
    }
}

export default Context
