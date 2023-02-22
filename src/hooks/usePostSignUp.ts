import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { SignUpInfo } from 'types/account'
import useServiceManager from './useServiceManager'

function usePostSignUp() {
    const serviceManager = useServiceManager()
    const navigate = useNavigate()

    return useMutation(
        ['signUpInfo'],
        (data: SignUpInfo) =>
            serviceManager.dataService.accountAPI.postSignUp(data),
        {
            onSuccess: () => {
                alert('회원가입이 완료되었습니다!')
                navigate('/')
            },
            onError: (err) => {
                alert(err)
            },
        }
    )
}

export default usePostSignUp
