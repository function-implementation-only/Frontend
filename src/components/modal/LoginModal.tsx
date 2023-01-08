/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosResponse } from 'axios'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import useServiceManager from 'src/hooks/useServiceManager'
import { saveTokenToCookie } from 'utils/cookie'
import { AccountInfo } from 'types/account'
import Modal from '../Modal'
import { ErrorEmail, ErrorPassword } from '../Error'

interface Props {
    isShowing: boolean
    handleShowing: () => void
}

const LoginModal: React.FC<Props> = ({ isShowing, handleShowing }) => {
    const serviceManager = useServiceManager()
    const {
        register,
        handleSubmit,

        formState: { errors, isSubmitting },
    } = useForm<AccountInfo>()

    const mutation = useMutation(
        'loginInfo',
        (data: AccountInfo) =>
            serviceManager.dataService.accountAPI.postLogIn(data),
        {
            onSuccess: (res: AxiosResponse) => {
                const token = res?.headers?.access_token
                if (token) {
                    saveTokenToCookie(token)
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
            </form>
        </Modal>
    )
}

export default LoginModal
