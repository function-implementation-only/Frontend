import { useQuery } from 'react-query'
import useServiceManager from './useServiceManager'

const useUnReadCount = (id: string) => {
    const serviceManager = useServiceManager()

    const fetchFn = () => serviceManager.dataService.chatAPI.getChatCount(id)
    return useQuery(id ? ['count', id] : ['count'], fetchFn)
}

export default useUnReadCount
