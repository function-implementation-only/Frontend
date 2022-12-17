import { AxiosInstance, AxiosResponse } from 'axios'
import setInterceptors from './interceptor'

export interface ChatAPIInterface {
    getChatCount: (id: string) => Promise<AxiosResponse>
    getChatRooms: () => Promise<AxiosResponse>
}

export default class ChatAPI implements ChatAPIInterface {
    axiosInstance: AxiosInstance

    constructor(axiosInstance: AxiosInstance) {
        this.axiosInstance = axiosInstance
    }

    getChatCount(id?: string) {
        return setInterceptors(this.axiosInstance).post('/api/chat/count', {
            id,
        })
    }

    async getChatRooms() {
        const result = await setInterceptors(this.axiosInstance).post(
            '/api/chat/room/list'
        )
        return result.data
    }
}
