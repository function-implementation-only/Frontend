export interface SignUpInfo {
    email: string
    nickname: string
    password: string
}

declare global {
    interface Window {
        context: any
    }
}
