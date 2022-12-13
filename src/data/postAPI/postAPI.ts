import { AxiosInstance, AxiosResponse } from 'axios'
import { APIResponse, PostResponse } from '../../types/response'

import setInterceptors from './interceptor'

export interface PostAPIInterface {
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
    private axiosInstance: AxiosInstance

    private static instance: PostAPI

    private constructor(axiosInstance: AxiosInstance) {
        this.axiosInstance = axiosInstance
    }

    public static getInstance(axiosInstance: AxiosInstance) {
        if (this.instance) {
            return this.instance
        }
        this.instance = new PostAPI(axiosInstance)
        return this.instance
    }

    /**
     * createPost
     * 공고 작성하기
     */
    public createPost(payload: FormData) {
        return setInterceptors(this.axiosInstance).post('/posts', payload)
    }

    /**
     * getAllPosts
     * 모든 공고 가져오기
     */
    public getAllPosts() {
        return this.axiosInstance.get('/posts/all')
    }

    /**
     * getOnePost
     * 공고 하나 가져오기
     */
    public getOnePost(id?: string) {
        return this.axiosInstance.get(`/posts/${id}`)
    }

    /**
     * updatePost
     * 공고 업데이트하기
     */
    public updatePost(payload: FormData, id?: string) {
        return setInterceptors(this.axiosInstance).put(`/posts/${id}`, payload)
    }

    /**
     * deletePost
     * 공고 지우기
     */
    public deletePost(id?: string) {
        return setInterceptors(this.axiosInstance).delete(`/posts/${id}`)
    }
}
