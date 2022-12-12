import axios, { AxiosInstance, AxiosResponse } from 'axios'

import setInterceptors from './interceptor'

export interface PostAPIInterface {
    instance: AxiosInstance
    createPost: (payload: FormData) => Promise<AxiosResponse>
    getAllPosts: () => Promise<AxiosResponse>
    getOnePost: (id: string | undefined) => Promise<AxiosResponse>
    updatePost: (
        id: string | undefined,
        payload: FormData
    ) => Promise<AxiosResponse>
    deletePost: (id: string | undefined) => Promise<AxiosResponse>
}

export class PostAPI implements PostAPIInterface {
    instance

    constructor() {
        this.instance = setInterceptors(
            axios.create({
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
        )
    }

    /**
     * createPost
     * 공고 작성하기
     */
    public createPost(payload: FormData) {
        return this.instance.post('/posts', payload)
    }

    /**
     * getAllPosts
     * 모든 공고 가져오기
     */
    public getAllPosts() {
        return this.instance.get('/posts/all')
    }

    /**
     * getOnePost
     * 공고 하나 가져오기
     */
    public getOnePost(id: string | undefined) {
        return this.instance.get(`/posts/${id}`)
    }

    /**
     * updatePost
     * 공고 업데이트하기
     */
    public updatePost(id: string | undefined, payload: FormData) {
        return this.instance.put(`/posts/${id}`, payload)
    }

    /**
     * deletePost
     * 공고 지우기
     */
    public deletePost(id: string | undefined) {
        return this.instance.delete(`/posts/${id}`)
    }
}
