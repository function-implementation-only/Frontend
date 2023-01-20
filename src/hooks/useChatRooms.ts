import { useQuery } from 'react-query'
import useServiceManager from './useServiceManager'

const useChatRooms = () => {
    const serviceManager = useServiceManager()

    return useQuery(['chat/roomList'], async () => {
        const { data } = await serviceManager.dataService.chatAPI.getChatRooms()

        return {
            data: data.data || [],
            message: data.msg,
        }
    })
}

export default useChatRooms
