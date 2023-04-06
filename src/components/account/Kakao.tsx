import Loading from 'components/Loading'
import { useQuery } from '@tanstack/react-query'
import useServiceManager from 'src/hooks/useServiceManager'

function Kakao() {
    const code = new URL(window.location.href).searchParams.get('code')
    const serviceManager = useServiceManager()

    useQuery(
        ['kakaoLogin', code],
        () => serviceManager.dataService.accountAPI.getKakaoLogin(code),
        {
            // options
            refetchOnWindowFocus: false,
            onSuccess: (res) => {
                const token = res?.data.data.accessToken
                const obj = {
                    value: token,
                    expire: Date.now() + 21600000,
                }
                const objString = JSON.stringify(obj)

                if (res.data.success === true) {
                    localStorage.setItem('token', objString)
                    localStorage.setItem(
                        'refreshToken',
                        res.data.data.refreshToken
                    )
                    window.location.replace('/')
                }
            },
            onError: () => {
                alert('로그인 실패')
                window.location.replace('/')
            },
        }
    )

    return <Loading />
}

export default Kakao
