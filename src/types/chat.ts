import { Key } from 'react'

export type ChatWithUser = {
    id: Key
    user: {
        id: number
        name: string
        email: string
        emailVerified: Date
        image: string
    }
    message: string
}
