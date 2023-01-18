import React, { useState } from 'react'
import styled from 'styled-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { AxiosResponse } from 'axios'
import useServiceManager from 'src/hooks/useServiceManager'
import AccountButtonItem from 'components/AccountButton'
import useModal from 'hooks/useModal'
import EmailCheckModal from 'components/account/EmailCheckModal'
import { useNavigate } from 'react-router-dom'
import ShowPWButton from 'components/ShowPWButton'
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
`

const ThemeItem = styled.span`
    display: flex;
    justify-content: center;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    color: #3e4145;
    margin: 100px 0 60px;
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
`

const Label = styled.label`
    width: 142px;
    font-family: 'Pretendard';
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
    font-family: 'Pretendard';
    font-size: 14px;
    line-height: 20px;
    &::placeholder {
        color: #b0b0b0;
    }
    &:disabled {
        background: #f8f9fa;
        color: #838485;
    }
`

const ErrorItem = styled.div``

const ButtonBox = styled.div`
    margin-left: 142px;
`

const Button = styled.button`
    width: 120px;
    height: 48px;
    font-family: 'Pretendard';
    font-weight: 700;
    font-size: 16px;
    background-color: transparent;
    border: 1px solid #ff9c30;
    border-radius: 10px;
    color: #ff9c30;
    &:disabled {
        color: #cbcbcb;
        background: #f8f9fa;
        border: 1px solid #cbcbcb;
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
    const [emailAuth, setEmailAuth] = useState()
    const [auth, setAuth] = useState(false)
    const [emailCheck, setEmailCheck] = useState(false)
    const [sendingMail, setSendingMail] = useState(false)
    const [resendingMail, setResendingMail] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const { isShowing, handleShowing } = useModal()
    const [showingPW, setShowingPW] = useState(false)
    const [showingPWcheck, setShowingPWcheck] = useState(false)
    const [authCheck, setAuthCheck] = useState(false)

    const navigate = useNavigate()
    const serviceManager = useServiceManager()

    // 회원가입 API

    const singnUpMutation = useMutation(
        'signUpInfo',
        (data: SignUpInfo) =>
            serviceManager.dataService.accountAPI.postSignUp(data),
        {
            onSuccess: () => {
                alert('회원가입이 완료되었습니다!')
                navigate('/')
            },
            onError: (err) => {
                alert(err)
            },
        }
    )

    // 이메일 중복확인 API

    const emailCheckMutation = useMutation(
        'emailCheck',
        () =>
            serviceManager.dataService.accountAPI.postEmailCheck(
                email as string
            ),
        {
            onSuccess: (res: AxiosResponse) => {
                if (res.data.data === true) {
                    setEmailCheck(true)
                    setEmailError(false)
                } else {
                    setEmailError(true)
                }
            },
            onError: (err) => {
                alert(err)
            },
        }
    )

    // 이메일 인증 API

    const emailAuthMutation = useMutation(
        'emailInfo',
        () =>
            serviceManager.dataService.accountAPI.postEmailAuth(
                email as string
            ),
        {
            onSuccess: (res: AxiosResponse) => {
                setEmailAuth(res.data)
                console.log(res.data)
            },
            onError: (err) => {
                alert(err)
            },
        }
    )

    const onSubmitEmailCheck = () => {
        if (email !== undefined && errors.email === undefined) {
            emailCheckMutation.mutate()
        }
    }

    const onSubmitEmailAuth = () => {
        setSendingMail(true)
        handleShowing()
        emailAuthMutation.mutate()
    }

    const onResubmitEmailAuth = () => {
        handleShowing()
        emailAuthMutation.mutate()
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
        singnUpMutation.mutate(data)
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
