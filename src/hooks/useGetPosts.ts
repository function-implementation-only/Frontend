/* eslint-disable consistent-return */
import { RESPONSE_TYPE } from 'lib/constants'
import { ContentResponse } from 'types/response'
import useLogger from './useLogger'
import useServiceManager from './useServiceManager'

async function useGetPosts(pageNum: any): Promise<ContentResponse[]> {
    const logger = useLogger('useGetPosts')
    const serviceManager = useServiceManager()
    logger.log('useGetPosts()')

    try {
        const { data } = await serviceManager.dataService.postAPI.getPosts(
            pageNum
        )
        const dataParsed = serviceManager.dataService.parserAPI.parse(
            RESPONSE_TYPE.POST.GET_ALL,
            data.data.content
        )
        console.log(dataParsed)
        return dataParsed
    } catch (error) {
        alert(error)
    }
}

export default useGetPosts
