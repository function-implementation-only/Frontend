import { AxiosResponse } from 'axios'
import {
    APIResponse,
    ContentResponse,
    PostResponse,
} from '../../types/response'

import setInterceptors from '../interceptor'

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
    /**
     * createPost
     * 공고 작성하기
     */
    createPost(
        payload: FormData
    ): Promise<AxiosResponse<APIResponse<PostResponse>>> {
        setInterceptors.defaults.headers.post['Content-Type'] =
            'multipart/form-data'

        return setInterceptors.post('/posts/v2', payload)
    }

    /**
     * getAllPost
     * 모든 공고 가져오기
     */
    getAllPost(): any {
        const POST_SIZE = 12
        return setInterceptors.get(`posts/v7/all?page=0&size=${POST_SIZE}`)
    }

    /**
     * getPostById
     * 공고 하나 가져오기
     */
    getPostById(
        id: string
    ): Promise<AxiosResponse<APIResponse<ContentResponse>>> {
        return setInterceptors.get(`/posts/${id}`)
    }

    /**
     * updatePost
     * 공고 업데이트하기
     */
    updatePost(
        payload: FormData,
        id: string
    ): Promise<AxiosResponse<APIResponse<PostResponse>>> {
        setInterceptors.defaults.headers.post['Content-Type'] =
            'multipart/form-data'

        return setInterceptors.patch(`/posts/${id}`, payload)
    }

    /**
     * deletePost
     * 공고 지우기
     */
    deletePost(id: string): Promise<AxiosResponse<APIResponse<string>>> {
        return setInterceptors.delete(`/posts/${id}`)
    }
}
