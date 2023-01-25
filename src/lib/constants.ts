export type ConstantObj = {
    title: string
    value: string | number
    type?: string
}

type ParseConstantObj = {
    [key: string]: string
}

export const COLLABORATION_TOOL: ConstantObj[] = [
    { title: 'FIGMA', value: 'FIGMA' },
    { title: 'SLACK', value: 'SLACK' },
    { title: 'GITHUB', value: 'GITHUB' },
    { title: 'ZIRA', value: 'ZIRA' },
    { title: 'DISCORD', value: 'DISCORD' },
    { title: 'NOTION', value: 'FIGMA' },
    { title: 'ZEPLIN', value: 'ZEPLIN' },
]

export const RECRUITMENT_PART: ConstantObj[] = [
    { title: '프론트엔드', value: 'FrontEnd' },
    { title: '백엔드', value: 'BackEnd' },
    { title: '디자인', value: 'Design' },
]

export const TECH_PART: ConstantObj[] = [
    { title: '프론트엔드', value: 'FrontEnd' },
    { title: '백엔드', value: 'BackEnd' },
    { title: '모바일', value: 'Mobile' },
]

export const POST_DETAIL_INFORMATION: ConstantObj[] = [
    { title: '모집 구분', type: 'tag', value: 'category' },
    { title: '사용 언어', type: 'tag', value: 'techs' },
    { title: '협업 프로그램', type: 'tag', value: 'techs' },
    { title: '진행 방식', type: 'tag', value: 'place' },
    { title: '예상 기간', type: 'tag', value: 'duration' },
    { title: '모집 인원', type: 'table', value: 'peopleNum' },
]

export const POST_STATE: ConstantObj[] = [
    { title: '모집중', value: 'ON' },
    { title: '모집완료', value: 'OFF' },
]

export const CATEGORY: ConstantObj[] = [
    { title: '프로젝트', value: 'PROJECT' },
    { title: '스터디', value: 'STUDY' },
]

export const PARSE_CONSTANT: ParseConstantObj = {
    PROJECT: '프로젝트',
    STUDY: '스터디',
    ONLINE: '온라인',
    OFFLINE: '오프라인',
    UNDEFINED: '기간 미정',
    ONE: '1개월',
    TWO: '2개월',
    THREE: '3개월',
    FOUR: '4개월',
    FIVE: '5개월',
    SIX: '6개월 이상',
}

export const PLACE: ConstantObj[] = [
    { title: '온라인', value: 'ONLINE' },
    { title: '오프라인', value: 'OFFLINE' },
]

export const TECHLIST: ConstantObj[] = [
    { title: 'JAVASCRIPT', value: 'JAVASCRIPT', type: 'FrontEnd' },
    { title: 'TYPESCRIPT', value: 'TYPESCRIPT', type: 'FrontEnd' },
    { title: 'REACT', value: 'REACT', type: 'FrontEnd' },
    { title: 'VUE', value: 'VUE', type: 'FrontEnd' },
    { title: 'SVELTE', value: 'SVELTE', type: 'FrontEnd' },
    { title: 'NEXTJS', value: 'NEXTJS', type: 'FrontEnd' },
    { title: 'NODEJS', value: 'NODEJS', type: 'BackEnd' },
    { title: 'SPRING', value: 'SPRING', type: 'BackEnd' },
    { title: 'JAVA', value: 'JAVA', type: 'BackEnd' },
    { title: 'NESTJS', value: 'NESTJS', type: 'BackEnd' },
    { title: 'EXPRESS', value: 'EXPRESS', type: 'BackEnd' },
    { title: 'GO', value: 'GO', type: 'BackEnd' },
    { title: 'PYTHON', value: 'PYTHON', type: 'BackEnd' },
    { title: 'DJANGO', value: 'DJANGO', type: 'BackEnd' },
    { title: 'MYSQL', value: 'MYSQL', type: 'BackEnd' },
    { title: 'MONGODB', value: 'MONGODB', type: 'BackEnd' },
    { title: 'PHP', value: 'PHP', type: 'BackEnd' },
    { title: 'GRAPHQL', value: 'GRAPHQL', type: 'BackEnd' },
    { title: 'FIREBASE', value: 'FIREBASE', type: 'BackEnd' },
    { title: 'KOTLIN', value: 'KOTLIN', type: 'Mobile' },
    { title: 'SWIFT', value: 'SWIFT', type: 'Mobile' },
    { title: 'REACTNATIVE', value: 'REACTNATIVE', type: 'Mobile' },
    { title: 'FLUTTER', value: 'FLUTTER', type: 'Mobile' },
    { title: 'UNITY', value: 'UNITY', type: 'Mobile' },
]

export const DURATION: ConstantObj[] = [
    { title: '기간 미정', value: 'UNDEFINED' },
    { title: '1개월', value: 'ONE' },
    { title: '2개월', value: 'TWO' },
    { title: '3개월', value: 'THREE' },
    { title: '4개월', value: 'FOUR' },
    { title: '5개월', value: 'FIVE' },
    { title: '6개월 이상', value: 'SIX' },
]

export const PEOPLENUM: ConstantObj[] = [
    { title: '1명', value: 1 },
    { title: '2명', value: 2 },
    { title: '3명', value: 3 },
    { title: '4명', value: 4 },
    { title: '5명', value: 5 },
    { title: '6명', value: 6 },
    { title: '7명', value: 7 },
    { title: '8명', value: 8 },
    { title: '9명', value: 9 },
    { title: '10명', value: 10 },
]

export const RESPONSE_TYPE = {
    POST: {
        GET: 'getPost',
        GET_ALL: 'getAllPost',
    },
}
// 상수 정의
