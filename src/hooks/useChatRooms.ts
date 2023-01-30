import { useQuery } from 'react-query'
import { ChatRoomsRespone } from 'types/response'
import useServiceManager from './useServiceManager'

const useChatRooms = () => {
    const serviceManager = useServiceManager()

    return useQuery(['chat/roomList'], async () => {
        const { data } =
            (await serviceManager.dataService.chatAPI.getChatRooms()) as unknown as {
                data: {
                    data: ChatRoomsRespone[]
                }
            }

        return data?.data || []
    })
}

export default useChatRooms
