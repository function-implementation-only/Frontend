import { useQuery } from '@tanstack/react-query'
import useServiceManager from './useServiceManager'

function useGetAccountInfo() {
    const serviceManager = useServiceManager()
    const objString = localStorage.getItem('token')
    const obj = JSON.parse(objString)
    const token = obj?.value

    if (Date.now() > obj?.expire) {
        localStorage.clear()
        window.location.reload()
    }

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
