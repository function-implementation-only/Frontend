import { AxiosResponse } from 'axios'
import { CATEGORY, ConstantObj, PLACE, TECHLIST } from 'lib/constants'
import { Tag } from 'src/store/features/tag/tagSlice'
import {
    APIResponse,
    ContentResponse,
    PostResponse,
} from '../../types/response'

import setInterceptors from '../interceptor'

export interface PostAPIInterface {
    queryStringArray: string[]
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
    getPostsByCategories: (
        categories: Tag[]
    ) => Promise<AxiosResponse<APIResponse<PostResponse>>>
    checkIsFilterAll: (
        constantsArray: ConstantObj<string>[],
        filterArray: string[]
    ) => boolean
    makeQueryString: (
        filterArray: string[],
        paramName: string,
        constantsArray: ConstantObj<string>[]
    ) => void
}

export class PostAPI implements PostAPIInterface {
    queryStringArray: string[]

    constructor() {
        this.queryStringArray = []
    }

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
    getAllPost(): Promise<AxiosResponse<APIResponse<PostResponse>>> {
        const POST_SIZE = 50
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

    /**
     * getPostsByCategories
     * 카테고리별 공고 가져오기
     */
    getPostsByCategories(
        tags: Tag[]
    ): Promise<AxiosResponse<APIResponse<PostResponse>>> {
        this.queryStringArray = []
        const techList: string[] = []
        const category: string[] = []
        const place: string[] = []

        tags.forEach((item) => {
            switch (item.source) {
                case 'COLLABORATION_TOOL':
                case 'TECHLIST':
                    techList.push(item.value)
                    break
                case 'CATEGORY':
                    category.push(item.value)
                    break
                case 'PLACE':
                    place.push(item.value)
                    break
                default:
            }
        })

        this.makeQueryString(techList, 'techList', TECHLIST)
        this.makeQueryString(category, 'category', CATEGORY)
        this.makeQueryString(place, 'place', PLACE)

        return setInterceptors.get(
            `posts/v7/all?${this.queryStringArray.join('&')}`
        )
    }

    /**
     * checkIsFilterAll
     * 전체 필터인지 확인하는 메서드
     */
    checkIsFilterAll(
        constantsArray: ConstantObj<string>[],
        filterArray: string[]
    ) {
        if (constantsArray.length === filterArray.length) return true
        return false
    }

    /**
     * makeQueryString
     * 항목별로 쿼리스트링 만드는 메서드
     */
    makeQueryString(
        filterArray: string[],
        paramName: string,
        constantsArray: ConstantObj<string>[]
    ) {
        if (filterArray.length !== 0) {
            if (this.checkIsFilterAll(constantsArray, filterArray)) return
            this.queryStringArray.push(`${paramName}=${filterArray.join(',')}`)
        }
    }
}
