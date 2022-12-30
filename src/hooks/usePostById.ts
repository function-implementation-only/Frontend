import { useQuery } from 'react-query'
import { ServiceManager } from 'src/manager/serviceManager'

function usePostById(id: string) {
    return useQuery('getPost', async () => {
        const { data } =
            await ServiceManager.getInstance().dataService.postAPI.getPostById(
                id
            )
        return data
    })
}

export default usePostById
