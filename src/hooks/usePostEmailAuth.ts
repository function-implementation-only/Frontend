import { AxiosResponse } from 'axios'
import { Dispatch, SetStateAction } from 'react'
import { useMutation } from '@tanstack/react-query'
import useServiceManager from './useServiceManager'

function usePostEmailAuth(
    setEmailAuth: Dispatch<SetStateAction<string>>,
    email: string
) {
    const serviceManager = useServiceManager()

    return useMutation(
        ['emailInfo'],
        () =>
            serviceManager.dataService.accountAPI.postEmailAuth(
                email as string
            ),
        {
            onSuccess: (res: AxiosResponse) => {
                setEmailAuth(res.data)
                console.log(res.data)
            },
            onError: (err) => {
                alert(err)
            },
        }
    )
}

export default usePostEmailAuth
