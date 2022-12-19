// import styled from 'styled-components'
import { useQuery } from 'react-query'

// import { useEffect } from 'react'

function Google() {
    const code = new URL(window.location.href).searchParams.get('code')

    useQuery(
        ['GoogleLogin', code],
        () => window.context.accountAPI.getGoogleLogin(code),
        {
            // options
            refetchOnWindowFocus: false,
            onSuccess: (res) => {
                if (res.data.status === 200) {
                    // localStorage.setItem('token', res.headers.access_token)
                    // localStorage.setItem(
                    //     'refreshToken',
                    //     res.headers.refresh_token
                    // )
                    alert(res)

                    localStorage.setItem('role', res.data.data.role)
                    localStorage.setItem(
                        'userAddressTag',
                        res.data.data.userAddressTag
                    )
                    localStorage.setItem('userId', res.data.data.userId)
                    localStorage.setItem('userImgUrl', res.data.data.userImgUrl)

                    window.location.replace('/mypage')
                }
            },
            onError: () => {
                alert('로그인 실패')
                window.location.replace('/')
            },
        }
    )

    return <p>{code}</p>
}

export default Google
