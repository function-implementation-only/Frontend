/* eslint-disable @typescript-eslint/no-unused-vars */
// FIXME : ts 린트 잠시 피하는 용도. 나중에 수정 필요
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

const LogoBox = styled.div`
    cursor: pointer;
`

const ModalButtonBox = styled.div`
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: 10px;
`

export const DefaultButton = styled.button<{ default?: boolean }>`
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

const ModalButton = styled(DefaultButton)``

function HeaderComponent() {
    const { isShowing: isLoginModalOpen, handleShowing: handleLogin } =
        useModal()
    const { isShowing: isSignupModalOpen, handleShowing: handleSignUp } =
        useModal()
    const [isLogin, setIsLogin] = useState(false)

    // 로그아웃 api 문제로인한 주석처리

    // const logoutMutation = useMutation(
    //     'logout',
    //     () => window.context.dataService.accountAPI.postLogOut(),
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
                    <a href="/">
                        <img src={Logo} alt="logoImg" />
                    </a>
                </LogoBox>
                <ModalButtonBox>
                    <ModalButton default type="button" onClick={handleLogin}>
                        로그인
                    </ModalButton>
                    <ModalButton type="button" onClick={handleSignUp}>
                        회원가입
                    </ModalButton>
                </ModalButtonBox>
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
