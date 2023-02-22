import { useQuery } from '@tanstack/react-query'
import useServiceManager from './useServiceManager'

function useGetAccountInfo() {
    const serviceManager = useServiceManager()
    const token = localStorage.getItem('token')

    return useQuery(
        ['accountInfo'],
        async () => {
            const { data } =
                await serviceManager.dataService.accountAPI.getAccountInfo()
            return data
        },
        { enabled: !!token }
    )
}

export default useGetAccountInfo
