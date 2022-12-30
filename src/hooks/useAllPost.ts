import { useQuery } from 'react-query'
import { RESPONSE_TYPE } from 'src/lib/constants'
import { ServiceManager } from 'src/manager/serviceManager'

function useAllPost() {
    return useQuery('getAllPost', async () => {
        const { data } =
            await ServiceManager.getInstance().dataService.postAPI.getAllPost()
        const dataParsed =
            ServiceManager.getInstance().dataService.parserAPI.parse(
                RESPONSE_TYPE.POST.GET_ALL,
                data.data
            )
        data.data = dataParsed
        return data
    })
}

export default useAllPost
