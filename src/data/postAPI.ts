import axios, { AxiosInstance, AxiosResponse } from 'axios'

import setInterceptors from './interceptor'

export interface PostAPIInterface {
    instance: AxiosInstance
    writePost: (payload: FormData) => Promise<AxiosResponse>
    getAllPosts: () => Promise<AxiosResponse>
}

export class PostAPI implements PostAPIInterface {
    instance

    constructor() {
        this.instance = setInterceptors(axios.create())
    }

    /**
     * writePost
     * 공고 작성하기
     */
    public writePost(payload: FormData) {
        return this.instance.post('/posts', payload)
    }

    /**
     * getAllPosts
     * 모든 공고 가져오기
     */
    public getAllPosts() {
        return this.instance.get('/all/posts')
    }
}
