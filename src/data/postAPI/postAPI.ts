import { AxiosInstance, AxiosResponse } from 'axios'
import {
    APIResponse,
    ContentResponse,
    PostResponse,
} from '../../types/response'

import setInterceptors from './interceptor'

export interface PostAPIInterface {
    createPost: (
        payload: FormData
    ) => Promise<AxiosResponse<APIResponse<PostResponse>>>
    getAllPost: () => Promise<AxiosResponse<APIResponse<PostResponse>>>
    getPostById: (
        id: string
    ) => Promise<AxiosResponse<APIResponse<ContentResponse>>>
    updatePost: (
        payload: FormData,
        id: string
    ) => Promise<AxiosResponse<APIResponse<PostResponse>>>
    // FIXME : 수정 API 백엔드 쪽에서 확인되면 수정해야함.
    deletePost: (id?: string) => Promise<AxiosResponse<APIResponse<string>>>
}

export class PostAPI implements PostAPIInterface {
    axiosInstance: AxiosInstance

    constructor(axiosInstance: AxiosInstance) {
        this.axiosInstance = axiosInstance
    }

    /**
     * createPost
     * 공고 작성하기
     */
    createPost(
        payload: FormData
    ): Promise<AxiosResponse<APIResponse<PostResponse>>> {
        return setInterceptors(this.axiosInstance).post('/posts', payload)
    }

    /**
     * getAllPost
     * 모든 공고 가져오기
     */
    getAllPost(): Promise<AxiosResponse<APIResponse<PostResponse>>> {
        return this.axiosInstance.get('/posts/all')
    }

    /**
     * getPostById
     * 공고 하나 가져오기
     */
    getPostById(
        id: string
    ): Promise<AxiosResponse<APIResponse<ContentResponse>>> {
        return this.axiosInstance.get(`/posts/${id}`)
    }

    /**
     * updatePost
     * 공고 업데이트하기
     */
    updatePost(
        payload: FormData,
        id: string
    ): Promise<AxiosResponse<APIResponse<PostResponse>>> {
        return setInterceptors(this.axiosInstance).patch(
            `/posts/${id}`,
            payload
        )
    }

    /**
     * deletePost
     * 공고 지우기
     */
    deletePost(id: string): Promise<AxiosResponse<APIResponse<string>>> {
        return setInterceptors(this.axiosInstance).delete(`/posts/${id}`)
    }
}
