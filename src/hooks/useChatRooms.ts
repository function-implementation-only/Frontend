import { useQuery } from 'react-query'
import useServiceManager from './useServiceManager'

const useChatRooms = () => {
    const serviceManager = useServiceManager()

    return useQuery(['chat/roomList'], async () => {
        const { data } = await serviceManager.dataService.chatAPI.getChatRooms()

        if (data === null) {
            return {
                data: data.data || [],
                message: data.msg,
            }
        }

        if (data.success) {
            return {
                data: data.data,
                message: data.msg,
            }
        }

        return {
            data: [],
            error: data.msg,
        }
    })
}

export default useChatRooms
