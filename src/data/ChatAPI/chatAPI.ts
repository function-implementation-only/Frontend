import { AxiosResponse } from 'axios'
import { ChatRoomsRespone } from 'types/response'
import setInterceptors from '../interceptor'

type GatChatRoomsType = Promise<AxiosResponse<ChatRoomsRespone[]>>
export interface ChatAPIInterface {
    getChatRooms: () => GatChatRoomsType
    getChatById: (roomId: number) => Promise<any>
}

export default class ChatAPI implements ChatAPIInterface {
    getChatRooms(): GatChatRoomsType {
        return setInterceptors.get('/chat/roomList')
    }

    getChatById(roomId: number) {
        return setInterceptors.get(`/chat/${roomId}`)
    }
}
