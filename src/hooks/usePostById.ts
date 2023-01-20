import { RESPONSE_TYPE } from 'lib/constants'
import { useQuery } from 'react-query'
import useLogger from './useLogger'
import useServiceManager from './useServiceManager'

function usePostById(id: string) {
    const serviceManager = useServiceManager()

    return useQuery('getPost', async () => {
        const { data } = await serviceManager.dataService.postAPI.getPostById(
            id
        )
        const dataParsed = await serviceManager.dataService.parserAPI.parse(
            RESPONSE_TYPE.POST.GET,
            data.data
        )
        // axios get 요청을 통해 html을 가져오는 파싱 작업이 이루어지기 때문에 await 키워드 필요
        data.data.content = dataParsed

        const logger = useLogger('usePostById')
        logger.log(data.data)

        return data
    })
}

export default usePostById
