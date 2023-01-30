export interface AccountInfo {
    email: string
    password: string
}

export interface SignUpInfo extends AccountInfo {
    nickname?: string
    passwordCheck: string
    emailAuth: string
}

export interface DefaultAccountInfo {
    email: string
    password: string
    changePassword: string
    passwordCheck: string
    nickname: string
    field: string
    imgUrl: string
    introduction: string
    availableTime: string
}
