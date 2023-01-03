import React, { useState } from 'react'
import styled from 'styled-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { AxiosResponse } from 'axios'

import {
    ErrorEmail,
    ErrorEmailAuth,
    ErrorPassword,
    ErrorPasswordCheck,
} from '../components/Error'
import { SignUpInfo } from '../../types/account'

const MainPageLayout = styled.div``

function SignUpPage() {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        trigger,
        formState: { errors, isSubmitting },
    } = useForm<SignUpInfo>()

    const { email, password } = watch()

    const [emailAuth, setEmailAuth] = useState()
    const [auth, setAuth] = useState(false)

    // 회원가입 API

    const singnUpMutation = useMutation(
        'signUpInfo',
        (data: SignUpInfo) => window.context.accountAPI.postSignUp(data),
        {
            onSuccess: () => {
                alert('회원가입이 완료되었습니다!')
            },
            onError: (err) => {
                alert(err)
            },
        }
    )

    // 이메일 인증 API

    const emailAuthMutation = useMutation(
        'emailInfo',
        () => window.context.accountAPI.postEmailAuth(email as string),
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

    const onSubmitEmailAuth = () => {
        emailAuthMutation.mutate()
    }

    const onSubmitSignUp: SubmitHandler<SignUpInfo> = (data) => {
        singnUpMutation.mutate(data)
        reset()
        // window.location.reload()
    }

    return (
        <MainPageLayout>
            <form onSubmit={handleSubmit(onSubmitSignUp)}>
                {/* input 관련 컴포넌트는 디자인 나오면 진행 예정 */}
                <input
                    type="text"
                    placeholder="이메일을 입력해 주세요."
                    {...register('email', {
                        required: true,
                        pattern: /\S+@\S+\.\S+/,
                    })}
                />
                <ErrorEmail errors={errors.email?.type} />
                <button type="button" onClick={onSubmitEmailAuth}>
                    이메일 인증하기
                </button>
                {auth && errors.emailAuth?.type === undefined ? (
                    <p style={{ fontSize: '14px' }}>인증이 완료되었습니다.</p>
                ) : (
                    <>
                        <input
                            type="text"
                            placeholder="인증번호를 입력해 주세요."
                            {...register('emailAuth', {
                                required: true,
                                validate: (value) => value === emailAuth,
                            })}
                        />
                        <ErrorEmailAuth errors={errors.emailAuth?.type} />
                        <button
                            type="button"
                            onClick={() => {
                                trigger('emailAuth')
                                setAuth(true)
                            }}
                        >
                            확인
                        </button>
                    </>
                )}
                <input
                    type="text"
                    placeholder="닉네임을 입력해 주세요."
                    {...register('nickname', { required: true })}
                />
                <input
                    type="password"
                    placeholder="영문, 숫자 조합 6~12자"
                    {...register('password', {
                        required: true,
                        maxLength: 12,
                        minLength: 6,
                        pattern: /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,12}$/,
                    })}
                />
                <ErrorPassword errors={errors.password?.type} />
                <input
                    type="password"
                    placeholder="비밀번호를 한번 더 입력해 주세요."
                    {...register('passwordCheck', {
                        required: true,
                        validate: (value) => value === password,
                    })}
                />
                <ErrorPasswordCheck errors={errors.passwordCheck?.type} />
                <button type="submit" disabled={isSubmitting}>
                    SignUp
                </button>
            </form>
        </MainPageLayout>
    )
}

export default SignUpPage
