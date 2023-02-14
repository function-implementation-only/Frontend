export type Inputs = {
    title: string
    category: string
    duration: string
    place: string
    techList?: string[]
    // 아직 Spring 서버에서 배열로 받을 수 없어 하나의 값으로 처리
    startDate: Date | string
    collaborationTool: string[]
    postState: string
}

export type ImageObj = {
    id: number
    imgUrl: string
    imgKey: string
}

export type TechObj = {
    id: number
    tech: string
}

export interface PostObj {
    category: string
    duration: string
    place: string
    createdAt: string
    title: string
    postId: number
    techs: techObj[]
    frontReqNum: number
    backReqNum: number
    designReqNum: number
    pmReqNum: number
    mobileReqNum: number
    postState: string
    collaborationTool?: string[]
    likeCheck: null | boolean
    profileImg: null | string
    accountId: number
    viewCount: number
}
