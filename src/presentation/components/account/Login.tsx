/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosResponse } from 'axios'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import useServiceManager from 'src/hooks/useServiceManager'
import styled from 'styled-components'
import { ErrorEmail, ErrorPassword } from '../Error'
import { AccountInfo } from '../../../types/account'
import kakaoImg from '../../../assets/images/kakaoLogo.svg'
import googleImg from '../../../assets/images/googleLogo.svg'
import showPwImg from '../../../assets/images/showPW.svg'
import hidePwImg from '../../../assets/images/hidePW.svg'
import Button from '../AccountButton'

const {
    VITE_KAKAO_API_KEY,
    VITE_KAKAO_REDIRECT_URI,
    VITE_GOOGLE_CLIENT_ID,
    VITE_GOOGLE_REDIRECT_URI,
} = import.meta.env

const LoginLayout = styled.div`
    position: relative;
    min-height: 684px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const InputBox = styled.div`
    margin-top: 133px;
`

const InputItem = styled.div`
    display: flex;
    flex-direction: column;
    &:last-child {
        position: relative;
    }
`

const Label = styled.label`
    font-family: 'Pretendard';
    font-size: 14px;
    color: #5a5c5f;
`

const Input = styled.input`
    width: 368px;
    height: 48px;
    margin: 4px 0 16px 0;
    border: 1px solid #cbcbcb;
    border-radius: 10px;
    padding: 14px;
    font-family: 'Pretendard';
    font-size: 14px;
    line-height: 20px;
    &::placeholder {
        color: #b0b0b0;
    }
`

const ShowPwButton = styled.button`
    position: absolute;
    top: 36%;
    right: 7px;
    width: auto;
    border: none;
    background-color: transparent;
    :hover {
        cursor: pointer;
    }
    img {
        vertical-align: middle;
    }
`

const ButtonBox = styled.div`
    a {
        text-decoration: none;
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

const SignUpBox = styled.div`
    margin: 100px 0 29px;
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

const Login: React.FC<Props> = ({ handleShowing, setLogin, setSignup }) => {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${VITE_KAKAO_API_KEY}&redirect_uri=${VITE_KAKAO_REDIRECT_URI}&response_type=code`
    const GOOGLE_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${VITE_GOOGLE_CLIENT_ID}&redirect_uri=${VITE_GOOGLE_REDIRECT_URI}&response_type=code&scope=profile%20email`

    const [showingPW, setShowingPW] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<AccountInfo>()

    const serviceManager = useServiceManager()
    const mutation = useMutation(
        'loginInfo',
        (data: AccountInfo) =>
            serviceManager.dataService.accountAPI.postLogIn(data),
        {
            onSuccess: (res: AxiosResponse) => {
                const token = res?.headers?.access_token
                if (token) {
                    localStorage.setItem('token', token)
                    window.location.reload()
                }
            },
            onError: (err) => {
                alert(err)
            },
        }
    )

    const onSubmit: SubmitHandler<AccountInfo> = (data) => {
        mutation.mutate(data)
        handleShowing()
    }

    const handleSignup = () => {
        setLogin(false)
        setSignup(true)
    }
    return (
        <LoginLayout>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputBox>
                    <InputItem>
                        <Label htmlFor="email">아이디</Label>
                        <Input
                            id="email"
                            type="text"
                            placeholder="이메일을 입력해 주세요."
                            {...register('email', {
                                required: true,
                                pattern: /\S+@\S+\.\S+/,
                            })}
                        />
                        <ErrorEmail errors={errors.email?.type} />
                    </InputItem>
                    <InputItem>
                        <Label htmlFor="password">비밀번호</Label>
                        <Input
                            id="password"
                            type={showingPW ? 'text' : 'password'}
                            placeholder="영문, 숫자 조합 6~12자"
                            {...register('password', {
                                required: true,
                                maxLength: 12,
                                minLength: 6,
                                pattern:
                                    /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,12}$/,
                            })}
                        />
                        <ShowPwButton
                            type="button"
                            onClick={() => {
                                setShowingPW(!showingPW)
                            }}
                        >
                            {showingPW ? (
                                <img src={hidePwImg} alt="hidePW" />
                            ) : (
                                <img src={showPwImg} alt="showPW" />
                            )}
                        </ShowPwButton>
                        <ErrorPassword errors={errors.password?.type} />
                    </InputItem>
                </InputBox>
                <ButtonBox>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        fontWeight={700}
                    >
                        아이디로 로그인
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
                <SignUpBox>
                    <span>조이너스가 처음이신가요?</span>
                    <button type="button" onClick={handleSignup}>
                        간편가입하기
                    </button>
                </SignUpBox>
            </form>
        </LoginLayout>
    )
}

export default Login
