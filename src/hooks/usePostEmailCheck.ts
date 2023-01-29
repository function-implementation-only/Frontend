import { AxiosResponse } from 'axios'
import { Dispatch, SetStateAction } from 'react'
import { useMutation } from 'react-query'
import useServiceManager from './useServiceManager'

function usePostEmailCheck(
    setEmailCheck: Dispatch<SetStateAction<boolean>>,
    setEmailError: Dispatch<SetStateAction<boolean>>,
    email: string
) {
    const serviceManager = useServiceManager()

    return useMutation(
        'emailCheck',
        () =>
            serviceManager.dataService.accountAPI.postEmailCheck(
                email as string
            ),
        {
            onSuccess: (res: AxiosResponse) => {
                if (res.data.data === true) {
                    setEmailCheck(true)
                    setEmailError(false)
                } else {
                    setEmailError(true)
                }
            },
            onError: (err) => {
                alert(err)
            },
        }
    )
}

export default usePostEmailCheck
