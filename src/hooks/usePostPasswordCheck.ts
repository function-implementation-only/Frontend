import { Dispatch, SetStateAction } from 'react'
import { useMutation } from '@tanstack/react-query'
import useServiceManager from './useServiceManager'

function usePostPasswordCheck(
    setPwCheck: Dispatch<SetStateAction<boolean>>,
    email: string,
    password: string
) {
    const serviceManager = useServiceManager()

    return useMutation(
        ['editAccountInfo'],
        () =>
            serviceManager.dataService.accountAPI.postPasswordCheck(
                email,
                password
            ),
        {
            onSuccess: (res) => {
                if (res.data.data === true) {
                    setPwCheck(true)
                } else {
                    setPwCheck(false)
                }
            },
            onError: (err) => {
                alert(err)
            },
        }
    )
}

export default usePostPasswordCheck
