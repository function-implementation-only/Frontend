import { useMutation } from 'react-query'
import useServiceManager from './useServiceManager'

function useEditPassword(
    handleShowing: () => void,
    email: string,
    changePassword: string
) {
    const serviceManager = useServiceManager()

    return useMutation(
        'editPassword',
        () =>
            serviceManager.dataService.accountAPI.editPassword(
                email,
                changePassword
            ),
        {
            onSuccess: (res) => {
                if (res.data.data === true) {
                    handleShowing()
                } else {
                    console.log('fail!!')
                }
            },
            onError: (err) => {
                alert(err)
            },
        }
    )
}

export default useEditPassword
