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
    img {
        margin-left: 20px;
    }
    span {
        width: 292px;
    }
`

const DividerBox = styled.div`
    display: flex;
    margin: 28px 0;
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

interface Props {
    isShowing: boolean
    handleShowing: () => void
}

const SignupModal: React.FC<Props> = ({ isShowing, handleShowing }) => {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${VITE_KAKAO_API_KEY}&redirect_uri=${VITE_KAKAO_REDIRECT_URI}&response_type=code`
    const GOOGLE_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${VITE_GOOGLE_CLIENT_ID}&redirect_uri=${VITE_GOOGLE_REDIRECT_URI}&response_type=code&scope=profile%20email`

    return (
        <Modal isOpen={isShowing} onClose={handleShowing}>
            <CloseButton
                src={closeBtnImg}
                onClick={() => {
                    handleShowing()
                }}
                alt="closeButton"
            />
            <Logo src={logoImg} alt="logo" />
            <ButtonBox>
                <a href="/signup">
                    <Button fontWeight={500} marginBottom={12}>
                        <img src={smalllogoImg} alt="signupLogo" />
                        <span>계정 만들기</span>
                    </Button>
                </a>
                <a href={KAKAO_AUTH_URL}>
                    <Button
                        background="#F7E317"
                        color="#3E201E"
                        fontWeight={500}
                        marginBottom={12}
                    >
                        <img src={kakaoImg} alt="kakaoLogo" />
                        <span>카카오 계정으로 시작하기</span>
                    </Button>
                </a>
                <a href={GOOGLE_URL}>
                    <Button
                        background="#F4F4F4"
                        color="#3E4145"
                        fontWeight={500}
                    >
                        <img src={googleImg} alt="kakaoLogo" />
                        <span>구글 계정으로 시작하기</span>
                    </Button>
                </a>
            </ButtonBox>
        </Modal>
    )
}

export default SignupModal
