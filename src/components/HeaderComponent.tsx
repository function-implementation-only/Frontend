/* eslint-disable @typescript-eslint/no-unused-vars */
// FIXME : ts 린트 잠시 피하는 용도. 나중에 수정 필요
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import useServiceManager from 'src/hooks/useServiceManager'
import useModal from 'hooks/useModal'
import Logo from 'img/Logo.svg'
import AccountModal from './account/AccountModal'
import DefaultButton from './common/DefaultButton'

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
const DefaultButtonReversed = styled(DefaultButton)`
    border: 1px solid var(--primary-color);
    background-color: white;
    color: var(--primary-color);
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
                        <DefaultButton type="button" onClick={handleLogout}>
                            로그아웃
                        </DefaultButton>
                    ) : (
                        <DefaultButton type="button" onClick={handleLogin}>
                            로그인
                        </DefaultButton>
                    )}
                    <DefaultButtonReversed type="button" onClick={handleSignup}>
                        회원가입
                    </DefaultButtonReversed>
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
