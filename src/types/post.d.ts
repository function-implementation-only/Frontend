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
    startDate: Date
    title: string
    postId: number
    imageList: imageObj[]
    techs: techObj[]
}
