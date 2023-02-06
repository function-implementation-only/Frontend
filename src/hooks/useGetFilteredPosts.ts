/* eslint-disable consistent-return */
import { RESPONSE_TYPE } from 'lib/constants'
import { Tag } from 'src/store/features/tag/tagSlice'
import { ContentResponse } from 'types/response'
import useLogger from './useLogger'
import useServiceManager from './useServiceManager'

async function useGetFilteredPosts(
    pageNum: number,
    tags: Tag[]
): Promise<ContentResponse[]> {
    const logger = useLogger('useGetFilteredPosts')
    const serviceManager = useServiceManager()
    logger.log('useGetFilteredPosts()')

    try {
        const { data } =
            await serviceManager.dataService.postAPI.getFilteredPosts(
                pageNum,
                tags
            )
        const dataParsed = serviceManager.dataService.parserAPI.parse(
            RESPONSE_TYPE.POST.GET_ALL,
            data.data.content
        )
        return dataParsed
    } catch (error) {
        alert(error)
    }
}

export default useGetFilteredPosts
