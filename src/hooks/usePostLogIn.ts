import { AxiosResponse } from 'axios'
import { useMutation } from 'react-query'
import { AccountInfo } from 'types/account'
import useServiceManager from './useServiceManager'

function usePostLogIn() {
    const serviceManager = useServiceManager()

    return useMutation(
        'loginInfo',
        (data: AccountInfo) =>
            serviceManager.dataService.accountAPI.postLogIn(data),
        {
            onSuccess: (res: AxiosResponse) => {
                const token = res?.headers?.access_token
                if (token) {
                    localStorage.setItem('token', token)
                    window.location.reload()
                }
            },
            onError: (err) => {
                alert(err)
            },
        }
    )
}

export default usePostLogIn
