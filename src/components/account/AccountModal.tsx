/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import Login from 'components/account/Login'
import Signup from 'components/account/Signup'
import closeBtnImg from 'img/CloseBtn.svg'
import logoImg from 'img/Logo.svg'
import Modal from '../Modal'

const LoginLayout = styled.div`
    position: relative;
    min-height: 684px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const CloseButton = styled.img`
    position: absolute;
    width: 14px;
    height: 14px;
    top: 29px;
    right: -25px;
    :hover {
        cursor: pointer;
    }
`

const Logo = styled.img`
    position: absolute;
    width: 142px;
    height: 28px;
    top: 71px;
    left: 0;
    right: 0;
    margin: auto;
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
                <CloseButton
                    src={closeBtnImg}
                    onClick={() => {
                        handleShowing()
                    }}
                    alt="closeButton"
                />
                <Logo src={logoImg} alt="logo" />
                {login && (
                    <Login
                        handleShowing={handleShowing}
                        setLogin={setLogin}
                        setSignup={setSignup}
                    />
                )}
                {signup && <Signup setLogin={setLogin} setSignup={setSignup} />}
            </LoginLayout>
        </Modal>
    )
}

export default AccountModal
