import { RESPONSE_TYPE } from 'lib/constants'
import { useQuery } from 'react-query'
import useServiceManager from './useServiceManager'

function usePostById(id: string) {
    const serviceManager = useServiceManager()

    return useQuery('getPost', async () => {
        const { data } = await serviceManager.dataService.postAPI.getPostById(
            id
        )
        const dataParsed = serviceManager.dataService.parserAPI.parse(
            RESPONSE_TYPE.POST.GET,
            data.data
        )
        data.data.content = dataParsed
        return data
    })
}

export default usePostById
