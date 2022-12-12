type ImageObj = {
    id: number
    imgUrl: string
    imgKey: string
}

type TechObj = {
    id: number
    tech: string
}

export type PostObj = {
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
