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
    contentUrl: string
    [key: string]
    likesLength: number
    nickname: string
    backendNum: number
    frontendNum: number
    designNum: number
    pmNum: number
    mobileNum: number
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

export interface ChatRoomsRespone extends APIResponse {
    count: number
    createdAt: Date
    modifiedAt: Date
    name: string
    roomId: number
}
