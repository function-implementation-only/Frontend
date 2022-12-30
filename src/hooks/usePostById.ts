import { useQuery } from 'react-query'
import useServiceManager from './useServiceManager'

function usePostById(id: string) {
    const serviceManager = useServiceManager()

    return useQuery('getPost', async () => {
        const { data } = await serviceManager.dataService.postAPI.getPostById(
            id
        )
        return data
    })
}

export default usePostById
