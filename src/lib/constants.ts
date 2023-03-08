export type ConstantObj<T> = {
    title: string
    value: T
    type?: string
    source: string
}

type ParseConstantObj = {
    [key: string]: string
}

export const POST_TABS = [
    { title: '북마크', value: 'Bookmark' },
    { title: '작성 공고', value: 'Write' },
    { title: '지원 공고', value: 'Apply' },
]

export const TEXT = {
    PLACEHOLDER_CHOICE: '선택',
}

export const POST_TYPE = {
    FILTERED: 'filtered',
    NON_FILTERED: 'nonFiltered',
}

export const COLLABORATION_TOOL: ConstantObj<string>[] = [
    { title: 'FIGMA', value: 'FIGMA', source: 'COLLABORATION_TOOL' },
    { title: 'SLACK', value: 'SLACK', source: 'COLLABORATION_TOOL' },
    { title: 'GITHUB', value: 'GITHUB', source: 'COLLABORATION_TOOL' },
    { title: 'ZIRA', value: 'ZIRA', source: 'COLLABORATION_TOOL' },
    { title: 'DISCORD', value: 'DISCORD', source: 'COLLABORATION_TOOL' },
    { title: 'NOTION', value: 'NOTION', source: 'COLLABORATION_TOOL' },
    { title: 'ZEPLIN', value: 'ZEPLIN', source: 'COLLABORATION_TOOL' },
]

export const RECRUITMENT_PART: ConstantObj<string>[] = [
    { title: '프론트엔드', value: 'FrontEnd', source: 'RECRUITMENT_PART' },
    { title: '백엔드', value: 'BackEnd', source: 'RECRUITMENT_PART' },
    { title: '디자이너', value: 'Designer', source: 'RECRUITMENT_PART' },
    { title: 'PM', value: 'PM', source: 'RECRUITMENT_PART' },
    { title: '모바일', value: 'Mobile', source: 'RECRUITMENT_PART' },
]

export const TECH_PART: ConstantObj<string>[] = [
    { title: '프론트엔드', value: 'FrontEnd', source: 'TECH_PART' },
    { title: '백엔드', value: 'BackEnd', source: 'TECH_PART' },
    { title: '모바일', value: 'Mobile', source: 'TECH_PART' },
]

export const POST_DETAIL_INFORMATION: ConstantObj<string>[] = [
    {
        title: '모집 구분',
        type: 'tag',
        value: 'category',
        source: 'POST_DETAIL_INFORMATION',
    },
    {
        title: '사용 언어',
        type: 'tag',
        value: 'techs',
        source: 'POST_DETAIL_INFORMATION',
    },
    {
        title: '협업 프로그램',
        type: 'tag',
        value: 'collaborationTool',
        source: 'POST_DETAIL_INFORMATION',
    },
    {
        title: '진행 방식',
        type: 'tag',
        value: 'place',
        source: 'POST_DETAIL_INFORMATION',
    },
    {
        title: '예상 기간',
        type: 'tag',
        value: 'duration',
        source: 'POST_DETAIL_INFORMATION',
    },
]

export const POST_STATE: ConstantObj<string>[] = [
    { title: '모집중', value: 'ON', source: 'POST_STATE' },
    { title: '모집완료', value: 'OFF', source: 'POST_STATE' },
]

export const CATEGORY: ConstantObj<string>[] = [
    { title: '프로젝트', value: 'PROJECT', source: 'CATEGORY' },
    { title: '스터디', value: 'STUDY', source: 'CATEGORY' },
]

export const PARSE_CONSTANT: ParseConstantObj = {
    PROJECT: '프로젝트',
    STUDY: '스터디',
    ONLINE: '온라인',
    OFFLINE: '오프라인',
    0: '기간 미정',
    1: '1개월',
    2: '2개월',
    3: '3개월',
    4: '4개월',
    5: '5개월',
    6: '6개월 이상',
    ON: '모집중',
    OFF: '모집완료',
}

export const PLACE: ConstantObj<string>[] = [
    { title: '온라인', value: 'ONLINE', source: 'PLACE' },
    { title: '오프라인', value: 'OFFLINE', source: 'PLACE' },
]

export const TECHLIST: ConstantObj<string>[] = [
    {
        title: 'JAVASCRIPT',
        value: 'JAVASCRIPT',
        type: 'FrontEnd',
        source: 'TECHLIST',
    },
    {
        title: 'TYPESCRIPT',
        value: 'TYPESCRIPT',
        type: 'FrontEnd',
        source: 'TECHLIST',
    },
    { title: 'REACT', value: 'REACT', type: 'FrontEnd', source: 'TECHLIST' },
    { title: 'VUE', value: 'VUE', type: 'FrontEnd', source: 'TECHLIST' },
    { title: 'SVELTE', value: 'SVELTE', type: 'FrontEnd', source: 'TECHLIST' },
    { title: 'NEXTJS', value: 'NEXTJS', type: 'FrontEnd', source: 'TECHLIST' },
    { title: 'NODEJS', value: 'NODEJS', type: 'BackEnd', source: 'TECHLIST' },
    { title: 'SPRING', value: 'SPRING', type: 'BackEnd', source: 'TECHLIST' },
    { title: 'JAVA', value: 'JAVA', type: 'BackEnd', source: 'TECHLIST' },
    { title: 'NESTJS', value: 'NESTJS', type: 'BackEnd', source: 'TECHLIST' },
    { title: 'EXPRESS', value: 'EXPRESS', type: 'BackEnd', source: 'TECHLIST' },
    { title: 'GO', value: 'GO', type: 'BackEnd', source: 'TECHLIST' },
    { title: 'PYTHON', value: 'PYTHON', type: 'BackEnd', source: 'TECHLIST' },
    { title: 'DJANGO', value: 'DJANGO', type: 'BackEnd', source: 'TECHLIST' },
    { title: 'MYSQL', value: 'MYSQL', type: 'BackEnd', source: 'TECHLIST' },
    { title: 'MONGODB', value: 'MONGODB', type: 'BackEnd', source: 'TECHLIST' },
    { title: 'PHP', value: 'PHP', type: 'BackEnd', source: 'TECHLIST' },
    { title: 'GRAPHQL', value: 'GRAPHQL', type: 'BackEnd', source: 'TECHLIST' },
    {
        title: 'FIREBASE',
        value: 'FIREBASE',
        type: 'BackEnd',
        source: 'TECHLIST',
    },
    { title: 'KOTLIN', value: 'KOTLIN', type: 'Mobile', source: 'TECHLIST' },
    { title: 'SWIFT', value: 'SWIFT', type: 'Mobile', source: 'TECHLIST' },
    {
        title: 'REACTNATIVE',
        value: 'REACTNATIVE',
        type: 'Mobile',
        source: 'TECHLIST',
    },
    { title: 'FLUTTER', value: 'FLUTTER', type: 'Mobile', source: 'TECHLIST' },
    { title: 'UNITY', value: 'UNITY', type: 'Mobile', source: 'TECHLIST' },
]

export const DURATION: ConstantObj<number>[] = [
    { title: '기간 미정', value: 0, source: 'DURATION' },
    { title: '1개월', value: 1, source: 'DURATION' },
    { title: '2개월', value: 2, source: 'DURATION' },
    { title: '3개월', value: 3, source: 'DURATION' },
    { title: '4개월', value: 4, source: 'DURATION' },
    { title: '5개월', value: 5, source: 'DURATION' },
    { title: '6개월 이상', value: 6, source: 'DURATION' },
]

export const PEOPLENUM: ConstantObj<number>[] = [
    { title: '1명', value: 1, source: 'PEOPLENUM' },
    { title: '2명', value: 2, source: 'PEOPLENUM' },
    { title: '3명', value: 3, source: 'PEOPLENUM' },
    { title: '4명', value: 4, source: 'PEOPLENUM' },
    { title: '5명', value: 5, source: 'PEOPLENUM' },
    { title: '6명', value: 6, source: 'PEOPLENUM' },
    { title: '7명', value: 7, source: 'PEOPLENUM' },
    { title: '8명', value: 8, source: 'PEOPLENUM' },
    { title: '9명', value: 9, source: 'PEOPLENUM' },
    { title: '10명', value: 10, source: 'PEOPLENUM' },
]

export const RESPONSE_TYPE = {
    POST: {
        GET: 'getPost',
        GET_ALL: 'getAllPost',
        GET_UPDATE: 'getPostForUpdate',
    },
}
// 상수 정의
