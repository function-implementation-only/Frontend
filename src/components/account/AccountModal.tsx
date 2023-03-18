/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import Login from 'components/account/Login'
import Signup from 'components/account/Signup'
import CloseIcon from '@mui/icons-material/Close'
import Modal from '../Modal'

const LoginLayout = styled.div`
    position: relative;
    min-height: 684px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    svg {
        position: absolute;
        font-size: 24px;
        top: 26px;
        right: -44px;
        color: #212529;
        :hover {
            cursor: pointer;
        }
    }
    @media (max-width: 720px) {
        padding-top: 40px;
        padding-bottom: 40px;
        overflow: scroll;
        svg {
            top: 45px;
            right: 6px;
            font-size: 28px;
        }
    }
`

const Logo = styled.img`
    position: absolute;
    width: 142px;
    height: 28px;
    top: 102px;
    left: 0;
    right: 0;
    margin: auto;
    @media (max-width: 720px) {
        display: none;
    }
`

const Title = styled.p<{ marginTop?: string }>`
    display: none;
    @media (max-width: 720px) {
        display: inline-block;
        font-size: 18px;
        font-weight: 700;
        color: #333;
        margin-top: ${(props) => props.marginTop ?? '32px'};
    }
`

interface Props {
    isShowing: boolean
    handleShowing: () => void
    login: boolean
    signup: boolean
    setLogin: Dispatch<SetStateAction<boolean>>
    setSignup: Dispatch<SetStateAction<boolean>>
}

const AccountModal: React.FC<Props> = ({
    isShowing,
    handleShowing,
    login,
    signup,
    setLogin,
    setSignup,
}) => {
    return (
        <Modal isOpen={isShowing} onClose={handleShowing}>
            <LoginLayout>
                <CloseIcon
                    onClick={() => {
                        handleShowing()
                    }}
                />
                <Logo src="/assets/images/Logo.svg" alt="logo" />
                {login && (
                    <>
                        <Title>로그인</Title>
                        <Login
                            handleShowing={handleShowing}
                            setLogin={setLogin}
                            setSignup={setSignup}
                        />
                    </>
                )}
                {signup && (
                    <>
                        <Title marginTop="50px">회원가입</Title>
                        <Signup setLogin={setLogin} setSignup={setSignup} />
                    </>
                )}
            </LoginLayout>
        </Modal>
    )
}

export default AccountModal
