import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { ChatWithUser } from '../types/chat'
import setInterceptors from './interceptor'

export interface ChatsResponse {
    chats: ChatWithUser[]
    ok: boolean
}

export interface ChatAPIInterface {
    instance: AxiosInstance

    getChatMessageByChatRoomId: (id: string) => Promise<AxiosResponse>
}

// 가만보니 왜 싱글톤?..
class ChatAPI implements ChatAPIInterface {
    instance

    constructor() {
        this.instance = setInterceptors(axios.create())
    }

    /**
     * getChatMessageByChatRoomId
     * 채팅방의 채팅 내역을 가져옴
     */
    public getChatMessageByChatRoomId(id: string) {
        return this.instance.get<ChatsResponse>('/api/chat-room', {
            params: { id },
        })
    }
}

export default ChatAPI
