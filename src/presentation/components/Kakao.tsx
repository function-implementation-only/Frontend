import { useQuery } from 'react-query'

function Kakao() {
    const code = new URL(window.location.href).searchParams.get('code')

    useQuery(
        ['kakaoLogin', code],
        () => window.context.accountAPI.getKakaoLogin(code),
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
                    window.location.replace('/')
                }
            },
            onError: () => {
                alert('로그인 실패')
                window.location.replace('/')
            },
        }
    )

    return <p>리다이렉션 성공!!</p>
}

export default Kakao
