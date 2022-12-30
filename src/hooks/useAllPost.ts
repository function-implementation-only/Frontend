import { useQuery } from 'react-query'
import { RESPONSE_TYPE } from 'src/lib/constants'
import useServiceManager from './useServiceManager'

function useAllPost() {
    const serviceManager = useServiceManager()

    return useQuery('getAllPost', async () => {
        const { data } = await serviceManager.dataService.postAPI.getAllPost()
        const dataParsed = serviceManager.dataService.parserAPI.parse(
            RESPONSE_TYPE.POST.GET_ALL,
            data.data
        )
        data.data = dataParsed
        return data
    })
}

export default useAllPost
