import { useQuery } from 'react-query'
import useServiceManager from './useServiceManager'

const useChatRooms = () => {
    const serviceManager = useServiceManager()

    const fetchFn = () => serviceManager.dataService.chatAPI.getChatRooms()

    return useQuery(['chat/roomList'], fetchFn)
}

export default useChatRooms
