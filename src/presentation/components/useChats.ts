import axios from 'axios'
import { useQuery } from 'react-query'
import { ChatWithUser } from '../../types/chat'

interface ChatsResponse {
    chats: ChatWithUser[]
    ok: boolean
}

const fetchChats = async (id: string) => {
    const { data } = await axios.get<ChatsResponse>('/api/chat', {
        params: { id },
    })
    return data.chats
}

const useChats = (id: string) => {
    const fetchFn = () => fetchChats(id)
    return useQuery(['chats', id], fetchFn, {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        cacheTime: 0,
    })
}

export default useChats
