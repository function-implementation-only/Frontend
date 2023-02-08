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
                const token = res?.data.data.accessToken
                const accountId = res?.data.data.accountId
                if (token && accountId) {
                    localStorage.setItem('token', token)
                    localStorage.setItem('accountId', accountId)
                    window.location.reload()
                }
            },
            onError: (err: any) => {
                if (err.response.data.status === 400) {
                    alert(err.response.data.message)
                } else if (err.response.data.status === 500) {
                    alert('아이디 및 비밀번호가 일치하지 않습니다.')
                }
            },
        }
    )
}

export default usePostLogIn
