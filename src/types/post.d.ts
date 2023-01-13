export type Inputs = {
    title: string
    contents: string
    category: string
    duration: string
    peopleNum: number
    place: string
    techList?: string[]
    // 아직 Spring 서버에서 배열로 받을 수 없어 하나의 값으로 처리
    startDate: Date | string
    cooperationProgram: string[]
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
    contents: string
    duration: string
    peopleNum: number
    place: string
    startDate: string
    title: string
    postId: number
    imageList: imageObj[]
    techs: techObj[]
}
