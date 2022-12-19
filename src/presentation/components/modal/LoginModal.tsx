/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosResponse } from 'axios'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Route } from 'react-router-dom'
import Modal from '../Modal'
import { saveTokenToCookie } from '../../../utils/cookie'
import { ErrorEmail, ErrorPassword } from '../Error'
import { AccountInfo } from '../../../types/account'
import MainPage from '../../pages/MainPage'
import Google from '../Google'

interface Props {
    isShowing: boolean
    handleShowing: () => void
}

const LoginModal: React.FC<Props> = ({ isShowing, handleShowing }) => {
    const REST_API_KEY = '01e35a3aa741b0bc70fccca2071f9380'
    const REDIRECT_URI = 'https://joinus.p-e.kr:443/api'
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

    const GOOGLE_CLIENT_ID =
        '243126344450-5q4n445ld3guj9b8jm3bf94qrkgfd4rh.apps.googleusercontent.com'
    const GOOGLE_REDIRECT_URI = 'https://joinus.p-e.kr/api/google/test'
    const GOOGLE_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=profile%20email`
    const {
        register,
        handleSubmit,

        formState: { errors, isSubmitting },
    } = useForm<AccountInfo>()

    const mutation = useMutation(
        'loginInfo',
        (data: AccountInfo) => window.context.accountAPI.postLogIn(data),
        {
            onSuccess: (res: AxiosResponse) => {
                const token = res?.headers?.access_token
                if (token) {
                    saveTokenToCookie(token)
                    window.location.reload()
                }
            },
            onError: (err) => {
                // alert(err)
            },
        }
    )

    const onSubmit: SubmitHandler<AccountInfo> = (data) => {
        mutation.mutate(data)
        handleShowing()
    }
    return (
        <Modal isOpen={isShowing} onClose={handleShowing}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="이메일을 입력해 주세요."
                    {...register('email', {
                        required: true,
                        pattern: /\S+@\S+\.\S+/,
                    })}
                />
                <ErrorEmail errors={errors.email?.type} />
                <input
                    type="password"
                    placeholder="비밀번호를 입력해 주세요."
                    {...register('password', {
                        required: true,
                        maxLength: 12,
                        minLength: 6,
                    })}
                />
                <ErrorPassword errors={errors.password?.type} />
                <button type="submit" disabled={isSubmitting}>
                    Login
                </button>
                <h1>
                    <a href={KAKAO_AUTH_URL}>Kakao Login</a>
                </h1>
                <h1>
                    <a href={GOOGLE_URL}>Google Login</a>
                </h1>
            </form>
        </Modal>
    )
}

export default LoginModal
