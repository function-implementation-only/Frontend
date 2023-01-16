import { AxiosInstance, AxiosResponse } from 'axios'
import setInterceptors from '../interceptor'

export interface ChatAPIInterface {
    getChatRooms: () => Promise<AxiosResponse>
    getChatById: (roomId: number) => Promise<AxiosResponse>
}

export default class ChatAPI implements ChatAPIInterface {
    axiosInstance: AxiosInstance

    constructor(axiosInstance: AxiosInstance) {
        this.axiosInstance = axiosInstance
    }

    getChatRooms() {
        return setInterceptors(this.axiosInstance).get('/chat/roomList')
    }

    getChatById(roomId: number) {
        return setInterceptors(this.axiosInstance).get(`/chat/${roomId}`)
    }
}
