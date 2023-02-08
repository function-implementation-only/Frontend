/* eslint-disable consistent-return */
import { RESPONSE_TYPE } from 'lib/constants'
import useServiceManager from './useServiceManager'

async function useGetPostForUpdate(paramId: string) {
    const serviceManager = useServiceManager()
    try {
        const { data } = await serviceManager.dataService.postAPI.getPostById(
            paramId
        )
        const dataParsed = await serviceManager.dataService.parserAPI.parse(
            RESPONSE_TYPE.POST.GET_UPDATE,
            data.data
        )
        return dataParsed
    } catch (error) {
        console.error(error)
    }
}

export default useGetPostForUpdate
