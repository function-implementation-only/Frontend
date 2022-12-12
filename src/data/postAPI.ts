import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { APIResponse, PostResponse } from '../types/response'

import setInterceptors from './interceptor'

export interface PostAPIInterface {
    instance: AxiosInstance
    createPost: (
        payload: FormData
    ) => Promise<AxiosResponse<APIResponse<PostResponse>>>
    getAllPosts: () => Promise<AxiosResponse<APIResponse<PostResponse[]>>>
    getOnePost: (
        id?: string
    ) => Promise<AxiosResponse<APIResponse<PostResponse>>>
    updatePost: (
        payload: FormData,
        id?: string
    ) => Promise<AxiosResponse<APIResponse<PostResponse>>>
    // FIX ME : 수정 API 백엔드 쪽에서 확인되면 수정해야함.
    deletePost: (id?: string) => Promise<AxiosResponse<APIResponse<string>>>
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
    public getOnePost(id?: string) {
        return this.instance.get(`/posts/${id}`)
    }

    /**
     * updatePost
     * 공고 업데이트하기
     */
    public updatePost(payload: FormData, id?: string) {
        return this.instance.put(`/posts/${id}`, payload)
    }

    /**
     * deletePost
     * 공고 지우기
     */
    public deletePost(id?: string) {
        return this.instance.delete(`/posts/${id}`)
    }
}
