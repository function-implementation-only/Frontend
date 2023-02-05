export type ChatRoom = {
    created_at: string
    from_user_id: number
    id: number
    title: string
    to_user_id: number
    updated_at: string
}

export type ChatList = {
    id: number
    message: string
    sendDate: string
    sender: string
}[]

// TODO: 수정해야함
export type User = {
    id: string
    name: string | null
    email: string | null
    image: string | null
}

// TODO: 수정해야함
export type Chat = {
    id: string
    message: string
    createAt: Date
    updateAt: Date
    userId: string
    chatRoomId: string | null
}

// TODO: 수정해야함
export interface ChatRoomWithUser extends ChatRoom {
    // users: User[]
    // chats: Chat[]
}
