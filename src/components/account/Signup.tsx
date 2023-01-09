/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { googleURL, kakaoURL } from 'src/utils/url'
import kakaoImg from 'img/kakaoLogo.svg'
import googleImg from 'img/googleLogo.svg'
import smalllogoImg from 'img/signupLogo.svg'
import Button from '../AccountButton'

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

const ButtonBox = styled.div`
    margin-top: 207px;
    a {
        text-decoration: none;
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
    button {
        color: #ff9c30;
        text-decoration: underline;
        border: none;
        background: transparent;
        cursor: pointer;
    }
`

interface Props {
    handleShowing: () => void
    setLogin: Dispatch<SetStateAction<boolean>>
    setSignup: Dispatch<SetStateAction<boolean>>
}

const Signup: React.FC<Props> = ({ handleShowing, setLogin, setSignup }) => {
    const KAKAO_AUTH_URL = kakaoURL(VITE_KAKAO_API_KEY, VITE_KAKAO_REDIRECT_URI)
    const GOOGLE_URL = googleURL(
        VITE_GOOGLE_CLIENT_ID,
        VITE_GOOGLE_REDIRECT_URI
    )

    const handleLogin = () => {
        setLogin(true)
        setSignup(false)
    }

    return (
        <SignupLayout>
            <ButtonBox>
                <Button
                    type="button"
                    fontWeight={700}
                    color="#fff"
                    marginBottom={12}
                    img={smalllogoImg}
                    url="/signup"
                >
                    계정 만들기
                </Button>
                <DividerBox>
                    <DividerItem />
                    <DividerText>or</DividerText>
                    <DividerItem />
                </DividerBox>
                <Button
                    type="button"
                    background="#F7E317"
                    color="#3E201E"
                    fontWeight={500}
                    marginBottom={12}
                    img={kakaoImg}
                    url={KAKAO_AUTH_URL}
                >
                    카카오 계정으로 시작하기
                </Button>
                <Button
                    type="button"
                    background="#F4F4F4"
                    color="#3E4145"
                    fontWeight={500}
                    img={googleImg}
                    url={GOOGLE_URL}
                >
                    구글 계정으로 시작하기
                </Button>
            </ButtonBox>
            <LoginBox>
                <span>이미 조이너스에 가입하셨나요?</span>
                <button type="button" onClick={handleLogin}>
                    로그인하기
                </button>
            </LoginBox>
        </SignupLayout>
    )
}

export default Signup
