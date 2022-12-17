import { AxiosInstance, AxiosResponse } from 'axios'
import setInterceptors from './interceptor'

export interface ChatAPIInterface {
    getChatCount: (id: string) => Promise<AxiosResponse>
    getChatRooms: () => Promise<AxiosResponse>
}

export default class ChatAPI implements ChatAPIInterface {
    private axiosInstance: AxiosInstance

    private static instance: ChatAPI

    private constructor(axiosInstance: AxiosInstance) {
        this.axiosInstance = axiosInstance
    }

    public static getInstance(axiosInstance: AxiosInstance) {
        if (this.instance) {
            return this.instance
        }
        this.instance = new ChatAPI(axiosInstance)
        return this.instance
    }

    public getChatCount(id?: string) {
        return setInterceptors(this.axiosInstance).post('/api/chat/count', {
            id,
        })
    }

    public getChatRooms() {
        return setInterceptors(this.axiosInstance).post('/api/chat/room/list')
    }
}
