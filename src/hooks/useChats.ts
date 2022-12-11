import { useQuery } from 'react-query'

function useChats({ id }: { id: string }) {
    const fetchFn = () => window.context.chatAPI.getChatMessageByChatRoomId(id)
    return useQuery(['chats', id], fetchFn, {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        cacheTime: 0,
    })
}

export default useChats
