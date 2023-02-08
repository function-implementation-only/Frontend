import React, { Dispatch, SetStateAction, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { googleURL, kakaoURL } from 'src/utils/url'
import { AccountInfo } from 'types/account'
import ShowPWButton from 'components/ShowPWButton'
import usePostLogIn from 'hooks/usePostLogIn'
import { ErrorEmail, ErrorPassword } from '../Error'
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
    @media (max-width: 720px) {
        min-height: 0px;
    }
`

const InputBox = styled.div`
    margin-top: 133px;
    @media (max-width: 720px) {
        margin-top: 36px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
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
    @media (max-width: 720px) {
        width: calc((600 / 720) * 100vw);
        height: 46px;
        margin: 16px 0 35px 0;
        padding: 14px;
    }
`

const ButtonBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
    @media (max-width: 720px) {
        width: calc((280 / 720) * 100vw);
    }
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
    const [showingPW, setShowingPW] = useState(false)
    const KAKAO_AUTH_URL = kakaoURL(VITE_KAKAO_API_KEY, VITE_KAKAO_REDIRECT_URI)
    const GOOGLE_URL = googleURL(
        VITE_GOOGLE_CLIENT_ID,
        VITE_GOOGLE_REDIRECT_URI
    )
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<AccountInfo>()

    // 로그인 API
    const postLogIn = usePostLogIn()

    const handleSignup = () => {
        setLogin(false)
        setSignup(true)
    }

    const onSubmit: SubmitHandler<AccountInfo> = (data) => {
        postLogIn.mutate(data)
        handleShowing()
    }
    return (
        <LoginLayout>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputBox>
                    <InputItem>
                        <Label htmlFor="email">이메일</Label>
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
                                pattern: /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,12}$/,
                            })}
                        />
                        <ShowPWButton
                            showingPW={showingPW}
                            setShowingPW={setShowingPW}
                            top="36%"
                            right="7px"
                        />
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
                        img="assets/images/kakaoLogo.svg"
                        url={KAKAO_AUTH_URL}
                    >
                        카카오 계정으로 시작하기
                    </Button>
                    <Button
                        type="button"
                        background="#F4F4F4"
                        color="#3E4145"
                        fontWeight={500}
                        img="assets/images/googleLogo.svg"
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
