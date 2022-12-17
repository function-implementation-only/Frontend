import { useQuery } from 'react-query'

const useUnReadCount = (id: string) => {
    const fetchFn = () => window.context.chatAPI.getChatCount(id)
    return useQuery(id ? ['count', id] : ['count'], fetchFn)
}

export default useUnReadCount
