export interface AccountInfo {
    email: string
    nickname?: string
    password: string
}

declare global {
    interface Window {
        context: any
    }
}
