import { useQuery } from 'react-query'
import useServiceManager from './useServiceManager'

const useChatRooms = () => {
    const serviceManager = useServiceManager()

    return useQuery(['rooms'], async () => {
        const { data } = await serviceManager.dataService.chatAPI.getChatRooms()

        return data
    })
}

export default useChatRooms
