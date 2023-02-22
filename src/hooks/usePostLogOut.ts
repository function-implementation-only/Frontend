import { Dispatch, SetStateAction } from 'react'
import { useMutation } from '@tanstack/react-query'
import useServiceManager from './useServiceManager'

function usePostLogOut(setIsLogin: Dispatch<SetStateAction<boolean>>) {
    const serviceManager = useServiceManager()

    return useMutation(
        ['logout'],
        () => serviceManager.dataService.accountAPI.postLogOut(),
        {
            onSuccess: () => {
                localStorage.clear()
                setIsLogin(false)
                window.location.reload()
            },
            onError: (err) => {
                alert(err)
            },
        }
    )
}

export default usePostLogOut
