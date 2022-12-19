import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
// import { useMutation } from 'react-query'
import useModal from '../../hooks/useModal'
import LoginModal from './modal/LoginModal'
import SignupModal from './modal/SignupModal'
import Logo from '../../assets/images/Logo.svg'
import { deleteCookie, getTokenFromCookie } from '../../utils/cookie'

const HeaderComponentLayout = styled.div`
    z-index: 999;
    background-color: white;
    position: sticky;
    top: 0;
`

const HeaderComponentRow = styled.div`
    width: 1440px;
    height: 80px;
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
`

const LogoBox = styled.div``

const ButtonBox = styled.div`
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: 10px;
`

const Button = styled.button<{ default?: boolean }>`
    width: 100px;
    height: 45px;
    border-radius: 100px;
    border: none;
    cursor: pointer;
    background-color: ${(props) =>
        props.default ? 'white' : ' var(--primary-color)'};
    color: ${(props) => (props.default ? 'var(--primary-color)' : 'white')};
    border: ${(props) =>
        props.default ? 'solid 1px var(--primary-color)' : 'none'};
`

function HeaderComponent() {
    const { isShowing: isLoginModalOpen, handleShowing: handleLogin } =
        useModal()
    const { isShowing: isSignupModalOpen, handleShowing: handleSignUp } =
        useModal()
    const [isLogin, setIsLogin] = useState(false)

    // 로그아웃 api 문제로인한 주석처리

    // const logoutMutation = useMutation(
    //     'logout',
    //     () => window.context.accountAPI.postLogOut(),
    //     {
    //         onSuccess: () => {
    //             deleteCookie(token)
    //             setIsLogin(false)
    //             window.location.reload()
    //         },
    //         onError: (err) => {
    //             alert(err)
    //         },
    //     }
    // )

    const handleLogout = () => {
        // logoutMutation.mutate()
        deleteCookie('token')
        setIsLogin(false)
        window.location.reload()
    }

    useEffect(() => {
        const token = getTokenFromCookie()
        if (token) {
            setIsLogin(true)
        }
    }, [])
    return (
        <HeaderComponentLayout>
            <HeaderComponentRow>
                <LogoBox>
                    <Link to="/">
                        <img src={Logo} alt="logoImg" />
                    </Link>
                </LogoBox>
                <ButtonBox>
                    {isLogin ? (
                        <Button default type="button" onClick={handleLogout}>
                            로그아웃
                        </Button>
                    ) : (
                        <Button default type="button" onClick={handleLogin}>
                            로그인
                        </Button>
                    )}
                    <Button type="button" onClick={handleSignUp}>
                        회원가입
                    </Button>
                </ButtonBox>
            </HeaderComponentRow>
            <LoginModal
                isShowing={isLoginModalOpen}
                handleShowing={handleLogin}
            />
            <SignupModal
                isShowing={isSignupModalOpen}
                handleShowing={handleSignUp}
            />
        </HeaderComponentLayout>
    )
}

export default HeaderComponent
