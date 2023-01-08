import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import useServiceManager from 'src/hooks/useServiceManager'

function Kakao() {
    const navigate = useNavigate()
    const code = new URL(window.location.href).searchParams.get('code')
    const serviceManager = useServiceManager()

    useQuery(
        ['kakaoLogin', code],
        () => serviceManager.dataService.accountAPI.getKakaoLogin(code),
        {
            // options
            refetchOnWindowFocus: false,
            onSuccess: (res) => {
                if (res.status === 200) {
                    localStorage.setItem('token', res.data.data.accessToken)
                    localStorage.setItem(
                        'refreshToken',
                        res.data.data.refreshToken
                    )
                    navigate('/')
                }
            },
            onError: () => {
                alert('로그인 실패')
                navigate('/')
            },
        }
    )

    return <p>리다이렉션 성공!!</p>
}

export default Kakao
