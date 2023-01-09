/* eslint-disable @typescript-eslint/no-unused-vars */
// FIXME : ts 린트 잠시 피하는 용도. 나중에 수정 필요
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import useServiceManager from 'src/hooks/useServiceManager'
import useModal from '../../hooks/useModal'
import LoginModal from './account/Login'
import SignupModal from './account/Signup'
import Logo from '../../assets/images/Logo.svg'
import AccountModal from './account/AccountModal'

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

const ButtonBox = styled.div`
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: 16px;
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
    const { isShowing, handleShowing } = useModal()
    const [isLogin, setIsLogin] = useState(false)
    const [login, setLogin] = useState(false)
    const [signup, setSignup] = useState(false)

    const serviceManager = useServiceManager()

    const logoutMutation = useMutation(
        'logout',
        () => serviceManager.dataService.accountAPI.postLogOut(),
        {
            onSuccess: () => {
                localStorage.clear()
                setIsLogin(false)
                window.location.reload()
            },
            onError: (err) => {
                alert(err)
            },
        }
    )

    const handleLogout = () => {
        logoutMutation.mutate()
    }

    const handleLogin = () => {
        handleShowing()
        setLogin(true)
        setSignup(false)
    }

    const handleSignup = () => {
        handleShowing()
        setSignup(true)
        setLogin(false)
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
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
                <ButtonBox>
                    {isLogin ? (
                        <DefaultButton
                            default
                            type="button"
                            onClick={handleLogout}
                        >
                            로그아웃
                        </DefaultButton>
                    ) : (
                        <DefaultButton
                            default
                            type="button"
                            onClick={handleLogin}
                        >
                            로그인
                        </DefaultButton>
                    )}
                    <DefaultButton type="button" onClick={handleSignup}>
                        회원가입
                    </DefaultButton>
                </ButtonBox>
            </HeaderComponentRow>
            <AccountModal
                isShowing={isShowing}
                handleShowing={handleShowing}
                login={login}
                signup={signup}
                setLogin={setLogin}
                setSignup={setSignup}
            />
        </HeaderComponentLayout>
    )
}

export default HeaderComponent
