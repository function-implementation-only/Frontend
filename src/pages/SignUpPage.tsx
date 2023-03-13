import React, { useState } from 'react'
import styled from 'styled-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import AccountButtonItem from 'components/AccountButton'
import useModal from 'hooks/useModal'
import EmailCheckModal from 'components/account/EmailCheckModal'
import ShowPWButton from 'components/ShowPWButton'
import usePostSignUp from 'hooks/usePostSignUp'
import usePostEmailCheck from 'hooks/usePostEmailCheck'
import usePostEmailAuth from 'hooks/usePostEmailAuth'
import {
    ErrorEmail,
    ErrorEmailAuth,
    ErrorEmailCheck,
    ErrorNickname,
    ErrorPassword,
    ErrorPasswordCheck,
} from '../components/Error'
import { SignUpInfo } from '../types/account'

const SignUpPageLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    form {
        width: 638px;
    }
    @media (max-width: 720px) {
        form {
            width: 100vw;
            margin-bottom: 40px;
            margin-left: 18px;
        }
    }
`

const ThemeItem = styled.span`
    display: flex;
    justify-content: center;

    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    color: #3e4145;
    margin: 100px 0 60px;
    @media (max-width: 720px) {
        font-size: 18px;
        margin: 36px 0;
        justify-content: start;
    }
`

const ItemBox = styled.div``

const InputItem = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 32px;
    #emailAuth {
        margin-left: 142px;
    }
    @media (max-width: 720px) {
        #email,
        #emailAuth {
            margin: 0 6px 0 0;
            width: calc((480 / 720) * 100vw);
        }
        #email {
            margin-top: 8px;
        }
        flex-direction: column;
        align-items: start;
    }
`

const Label = styled.label`
    width: 142px;

    font-size: 14px;
    color: #5a5c5f;
    span {
        color: #ff3257;
    }
`

const Input = styled.input`
    width: 368px;
    height: 48px;
    margin-right: 8px;
    border: 1px solid #cbcbcb;
    border-radius: 10px;
    padding: 14px;

    font-size: 14px;
    line-height: 20px;
    &::placeholder {
        color: #b0b0b0;
    }
    &:disabled {
        background: #f8f9fa;
        color: #838485;
    }
    @media (max-width: 720px) {
        width: calc((680 / 720) * 100vw);
        height: 46px;
        margin-top: 8px;
        padding: 14px;
    }
`

const ErrorItem = styled.div``

const ButtonBox = styled.div`
    margin-left: 142px;
    @media (max-width: 720px) {
        margin-left: 0px;
    }
`

const Button = styled.button`
    width: 120px;
    height: 48px;

    font-weight: 700;
    font-size: 16px;
    background-color: transparent;
    border: 1px solid #ff9c30;
    border-radius: 10px;
    color: #ff9c30;
    cursor: pointer;
    &:disabled {
        color: #cbcbcb;
        background: #f8f9fa;
        border: 1px solid #cbcbcb;
    }
    @media (max-width: 720px) {
        width: 100px;
        font-size: 14px;
    }
`

function SignUpPage() {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        trigger,
        formState: { errors, isSubmitting },
    } = useForm<SignUpInfo>({ mode: 'onChange' })

    const { email, password } = watch()
    const [emailAuth, setEmailAuth] = useState(null)
    const [auth, setAuth] = useState(false)
    const [emailCheck, setEmailCheck] = useState(false)
    const [sendingMail, setSendingMail] = useState(false)
    const [resendingMail, setResendingMail] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const { isShowing, handleShowing } = useModal()
    const [showingPW, setShowingPW] = useState(false)
    const [showingPWcheck, setShowingPWcheck] = useState(false)
    const [authCheck, setAuthCheck] = useState(false)

    // 회원가입 API
    const postSignUp = usePostSignUp()

    // 이메일 중복확인 API
    const postEmailCheck = usePostEmailCheck(
        setEmailCheck,
        setEmailError,
        email
    )

    // 이메일 인증 API
    const postEmailAuth = usePostEmailAuth(setEmailAuth, email)

    const onSubmitEmailCheck = () => {
        if (email !== undefined && errors.email === undefined) {
            postEmailCheck.mutate()
        }
    }

    const onSubmitEmailAuth = () => {
        setSendingMail(true)
        handleShowing()
        postEmailAuth.mutate()
    }

    const onResubmitEmailAuth = () => {
        handleShowing()
        postEmailAuth.mutate()
        setResendingMail(true)
        setAuthCheck(false)
        setAuth(false)
    }

    const onSubmitEmailAuthCheck = () => {
        trigger('emailAuth')
        if (errors.emailAuth === undefined) {
            handleShowing()
            setAuth(true)
        }
    }

    const handleAuthCheck = () => {
        setAuthCheck(true)
    }

    const onSubmitSignUp: SubmitHandler<SignUpInfo> = (data) => {
        postSignUp.mutate(data)
        reset()
    }

    return (
        <SignUpPageLayout>
            <form onSubmit={handleSubmit(onSubmitSignUp)}>
                <ThemeItem>회원가입</ThemeItem>
                <ItemBox>
                    <InputItem>
                        <Label htmlFor="email">
                            이메일 <span>*</span>
                        </Label>
                        <div>
                            <Input
                                id="email"
                                type="text"
                                disabled={!!auth}
                                placeholder="이메일을 입력해 주세요."
                                {...register('email', {
                                    required: true,
                                    pattern: /\S+@\S+\.\S+/,
                                    onBlur: () => onSubmitEmailCheck(),
                                })}
                            />
                            {!sendingMail ? (
                                <Button
                                    type="button"
                                    onClick={onSubmitEmailAuth}
                                    disabled={!emailCheck}
                                >
                                    인증번호 받기
                                </Button>
                            ) : (
                                <Button
                                    type="button"
                                    onClick={onResubmitEmailAuth}
                                    disabled={!!auth}
                                >
                                    재전송
                                </Button>
                            )}
                        </div>
                    </InputItem>
                    <ErrorItem>
                        <ErrorEmail
                            errors={errors.email?.type}
                            margin="-22px 0 18px 142px;"
                        />
                        <ErrorEmailCheck
                            emailError={emailError}
                            margin="-22px 0 18px 142px;"
                        />
                    </ErrorItem>
                    {sendingMail && (
                        <>
                            <InputItem>
                                <div>
                                    <Input
                                        id="emailAuth"
                                        type="text"
                                        placeholder="인증번호를 입력해 주세요."
                                        disabled={
                                            auth &&
                                            errors.emailAuth?.type === undefined
                                        }
                                        {...register('emailAuth', {
                                            required: true,
                                            validate: (value) =>
                                                value === emailAuth,
                                            onChange: () => handleAuthCheck(),
                                        })}
                                    />
                                    {auth &&
                                    errors.emailAuth?.type === undefined ? (
                                        <Button type="button" disabled>
                                            인증완료
                                        </Button>
                                    ) : (
                                        <Button
                                            type="button"
                                            onClick={() => {
                                                onSubmitEmailAuthCheck()
                                            }}
                                            disabled={
                                                errors.emailAuth?.type !==
                                                    undefined || !authCheck
                                            }
                                        >
                                            인증하기
                                        </Button>
                                    )}
                                </div>
                            </InputItem>
                            <ErrorItem>
                                <ErrorEmailAuth
                                    errors={errors.emailAuth?.type}
                                    margin="-22px 0 18px 142px;"
                                />
                            </ErrorItem>
                        </>
                    )}
                    <InputItem>
                        <Label htmlFor="password">
                            비밀번호 <span>*</span>
                        </Label>
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
                            mobileTop="50%"
                        />
                    </InputItem>
                    <ErrorItem>
                        <ErrorPassword
                            errors={errors.password?.type}
                            margin="-22px 0 18px 142px;"
                        />
                    </ErrorItem>
                    <InputItem>
                        <Label htmlFor="passwordCheck">
                            비밀번호 확인 <span>*</span>
                        </Label>
                        <Input
                            id="passwordCheck"
                            type={showingPWcheck ? 'text' : 'password'}
                            placeholder="비밀번호를 한번 더 입력해 주세요."
                            {...register('passwordCheck', {
                                required: true,
                                validate: (value) => value === password,
                            })}
                        />
                        <ShowPWButton
                            showingPW={showingPWcheck}
                            setShowingPW={setShowingPWcheck}
                            mobileTop="50%"
                        />
                    </InputItem>
                    <ErrorItem>
                        <ErrorPasswordCheck
                            errors={errors.passwordCheck?.type}
                            margin="-22px 0 18px 142px;"
                        />
                    </ErrorItem>
                    <InputItem>
                        <Label htmlFor="nickname">
                            닉네임 <span>*</span>
                        </Label>
                        <Input
                            id="nickname"
                            type="text"
                            placeholder="영문, 숫자 조합 3~10자"
                            {...register('nickname', {
                                required: true,
                                maxLength: 10,
                                minLength: 3,
                                pattern:
                                    /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{3,10}$/,
                            })}
                        />
                    </InputItem>
                    <ErrorItem>
                        <ErrorNickname
                            errors={errors.nickname?.type}
                            margin="-22px 0 18px 142px;"
                        />
                    </ErrorItem>
                </ItemBox>
                <ButtonBox>
                    <AccountButtonItem
                        type="submit"
                        disabled={isSubmitting}
                        fontWeight={700}
                        mobileWidth={680}
                    >
                        가입하기
                    </AccountButtonItem>
                </ButtonBox>
            </form>
            <EmailCheckModal
                isShowing={isShowing}
                handleShowing={handleShowing}
                resendingMail={resendingMail}
                auth={auth}
            />
        </SignUpPageLayout>
    )
}

export default SignUpPage
