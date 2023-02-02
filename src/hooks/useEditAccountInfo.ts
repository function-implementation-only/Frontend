import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import useServiceManager from './useServiceManager'

function useEditAccountInfo() {
    const serviceManager = useServiceManager()
    const navigate = useNavigate()

    return useMutation(
        'editAccountInfo',
        (formData: FormData) =>
            serviceManager.dataService.accountAPI.editAccountInfo(formData),
        {
            onSuccess: () => {
                navigate('/')
                window.location.reload()
            },
            onError: (err) => {
                alert(err)
            },
        }
    )
}

export default useEditAccountInfo
