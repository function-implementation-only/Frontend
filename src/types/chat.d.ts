export type ChatRoom = {
    chatList: []
    joinUserId: number
    joinUserImg: string | null
    joinUserNickname: string
    postId: number
    postUserId: number
    postUserImg: string | null
    postUserNickname: string
    roomId: number
    title: string
}

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
    users: User[]
    chats: Chat[]
}
