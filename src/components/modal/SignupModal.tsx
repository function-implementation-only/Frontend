/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { AxiosResponse } from 'axios'
import styled from 'styled-components'
import Modal from '../Modal'
import closeBtnImg from '../../../assets/images/CloseBtn.svg'
import kakaoImg from '../../../assets/images/kakaoLogo.svg'
import googleImg from '../../../assets/images/googleLogo.svg'
import logoImg from '../../../assets/images/Logo.svg'
import smalllogoImg from '../../../assets/images/signupLogo.svg'

const {
    VITE_KAKAO_API_KEY,
    VITE_KAKAO_REDIRECT_URI,
    VITE_GOOGLE_CLIENT_ID,
    VITE_GOOGLE_REDIRECT_URI,
} = import.meta.env

const SignupLayout = styled.div`
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

const ButtonBox = styled.div`
    margin-top: 207px;
    a {
        text-decoration: none;
    }
`

const Button = styled.button<{
    background?: string
    color?: string
    fontWeight: number
    marginBottom?: number
}>`
    width: 368px;
    height: 48px;
    background-color: ${(props) => props.background || '#ff9c30'};
    border: none;
    border-radius: 10px;
    font-family: 'Pretendard';
    font-weight: ${(props) => props.fontWeight};
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.color || '#fff'};
    margin-bottom: ${(props) => props.marginBottom}px;

    a {
        width: 292px;
        color: ${(props) => props.color || '#fff'};
    }
    :hover {
        cursor: pointer;
    }
`

const DividerBox = styled.div`
    display: flex;
    margin: 40px 0;
`

const DividerItem = styled.hr`
    width: 167.5px;
    border: 0.6px solid #f0f0f0;
`

const DividerText = styled.span`
    font-family: 'Pretendard';
    font-size: 14px;
    color: #838485;
`

const LoginBox = styled.div`
    margin: 153px 0 48px;
    text-align: center;
    font-family: 'Pretendard';
    font-size: 14px;
    span {
        margin-right: 8px;
        color: #838485;
    }
    a {
        color: #ff9c30;
    }
`

interface Props {
    isShowing: boolean
    handleShowing: () => void
}

const SignupModal: React.FC<Props> = ({ isShowing, handleShowing }) => {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${VITE_KAKAO_API_KEY}&redirect_uri=${VITE_KAKAO_REDIRECT_URI}&response_type=code`
    const GOOGLE_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${VITE_GOOGLE_CLIENT_ID}&redirect_uri=${VITE_GOOGLE_REDIRECT_URI}&response_type=code&scope=profile%20email`

    return (
        <Modal isOpen={isShowing} onClose={handleShowing}>
            <SignupLayout>
                <CloseButton
                    src={closeBtnImg}
                    onClick={() => {
                        handleShowing()
                    }}
                    alt="closeButton"
                />
                <Logo src={logoImg} alt="logo" />
                <ButtonBox>
                    <Button fontWeight={700} marginBottom={12}>
                        <img src={smalllogoImg} alt="signupLogo" />
                        <a href="/signup">계정 만들기 </a>
                    </Button>
                    <DividerBox>
                        <DividerItem />
                        <DividerText>or</DividerText>
                        <DividerItem />
                    </DividerBox>
                    <Button
                        background="#F7E317"
                        color="#3E201E"
                        fontWeight={500}
                        marginBottom={12}
                    >
                        <img src={kakaoImg} alt="kakaoLogo" />
                        <a href={KAKAO_AUTH_URL}>카카오 계정으로 시작하기 </a>
                    </Button>
                    <Button
                        background="#F4F4F4"
                        color="#3E4145"
                        fontWeight={500}
                    >
                        <img src={googleImg} alt="kakaoLogo" />
                        <a href={GOOGLE_URL}>구글 계정으로 시작하기 </a>
                    </Button>
                </ButtonBox>
                <LoginBox>
                    <span>조이너스가 처음이신가요?</span>
                    <a href="/">로그인하기</a>
                </LoginBox>
            </SignupLayout>
        </Modal>
    )
}

export default SignupModal
