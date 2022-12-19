function Kakao() {
    // const code = new URL(window.location.href).searchParams.get('code')

    // useQuery(
    //     ['kakaoLogin', code],
    //     () => window.context.accountAPI.getKakaoLogin(code),
    //     {
    //         // options
    //         refetchOnWindowFocus: false,
    //         onSuccess: (res) => {
    //             if (res.data.status === 200) {
    //                 // localStorage.setItem('token', res.headers.access_token)
    //                 // localStorage.setItem(
    //                 //     'refreshToken',
    //                 //     res.headers.refresh_token
    //                 // )

    //                 localStorage.setItem('role', res.data.data.role)
    //                 localStorage.setItem(
    //                     'userAddressTag',
    //                     res.data.data.userAddressTag
    //                 )
    //                 localStorage.setItem('userId', res.data.data.userId)
    //                 localStorage.setItem('userImgUrl', res.data.data.userImgUrl)

    //                 window.location.replace('/mypage')
    //             }
    //         },
    //         onError: (err) => {
    //             alert('로그인 실패')
    //             console.log(err)
    //             window.location.replace('/')
    //         },
    //     }
    // )

    // try {
    //     const aaa = window.context.accountAPI.getKakaoLogin(code)

    //     console.log(aaa)
    // } catch (error) {
    //     console.log(error)
    // }

    return <p>로그인 성공!!</p>
}

export default Kakao
