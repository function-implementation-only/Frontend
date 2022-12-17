import { useQuery } from 'react-query'

const useChatRooms = () => {
    const fetchFn = () => window.context.chatAPI.getChatRooms()
    return useQuery(['chatRooms'], fetchFn)
}

export default useChatRooms
