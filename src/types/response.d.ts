import { PostObj } from './post'

export interface APIResponse<T> {
    data: T
    error: null | Object
    success: boolean
}

export interface PostResponse extends PostObj {
    likeCheck: null | boolean
    likesLength: number
    profileImg: null | Object
    // FIX ME : profile Img는 어떻게 올 지 확인 필요
    nickname: string
}
