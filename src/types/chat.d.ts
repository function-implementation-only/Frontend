export type ChatRoom = {
    id: string
    createAt: Date
    exitDate: Date
}

export type User = {
    id: string
    name: string | null
    email: string | null
    image: string | null
}

export type Chat = {
    id: string
    message: string
    createAt: Date
    updateAt: Date
    userId: string
    chatRoomId: string | null
}

export interface ChatRoomWithUser extends ChatRoom {
    users: User[]
    chats: Chat[]
}
