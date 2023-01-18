import { useQuery } from 'react-query'
import useServiceManager from './useServiceManager'

function useGetAccountInfo() {
    const serviceManager = useServiceManager()

    return useQuery('accountInfo', async () => {
        const { data } =
            await serviceManager.dataService.accountAPI.getAccountInfo()
        return data
    })
}

export default useGetAccountInfo
