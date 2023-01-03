import { PostObj } from './post'

export interface APIResponse<T> {
    data: T
    error: null | Object
    success: boolean
}

export interface PostResponse {
    content: ContentResponse[]
    empty: boolean
    first: boolean
    last: boolean
    number: number
    numberOfElements: number
    pageable: PageableResponse
    size: number
    sort: SortResponse
    totalElements: number
    totalPages: number
}

export interface ContentResponse extends PostObj {
    likeCheck: null | boolean
    likesLength: number
    profileImg: null | Object
    // FIXME : profile Img는 어떻게 올 지 확인 필요
    nickname: string
}

export interface PageableResponse {
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
}

export interface SortResponse {
    empty: boolean
    unsorted: boolean
    sorted: boolean
}
