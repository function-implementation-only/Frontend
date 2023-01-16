import { useQuery } from 'react-query'
import useServiceManager from './useServiceManager'

const useChatById = (roomId = 1) => {
    const serviceManager = useServiceManager()

    const fetchFn = () => serviceManager.dataService.chatAPI.getChatById(roomId)

    return useQuery([`chat/${roomId}`], fetchFn)
}

export default useChatById
