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
    nickname: string
    field: string
    introduction: string
    availableTime: string
}
