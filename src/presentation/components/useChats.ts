import axios from 'axios'
import { useQuery } from 'react-query'
import { Chat, User } from './launcher/Message'

export interface ChatWithUser extends Chat {
    user: User
}

export interface ChatsResponse {
    chats: ChatWithUser[]
    ok: boolean
}
export const fetchChats = async (id: string) => {
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
