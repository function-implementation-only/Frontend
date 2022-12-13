/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosResponse } from 'axios'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
// import Input from '../../../stories/Input'
// import Button from '../../../stories/Button'
import Modal from '../Modal'
import { saveTokenToCookie } from '../../../utils/cookie'
import { ErrorEmail, ErrorPassword } from '../Error'
import { AccountInfo } from '../../../types/account'

interface Props {
    isShowing: boolean
    handleShowing: () => void
}

const LoginModal: React.FC<Props> = ({ isShowing, handleShowing }) => {
    const {
        register,
        handleSubmit,

        formState: { errors, isSubmitting },
    } = useForm<AccountInfo>()

    const [idValue, setIdValue] = useState<string>('')
    const [pwValue, setPwValue] = useState<string>('')
    const onChangeIdInput = (inputValue: string): void => {
        setIdValue(inputValue)
    }
    const onChangePwInput = (inputValue: string): void => {
        setPwValue(inputValue)
    }
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const handleClose = (): void => {
        handleShowing()
    }

    const mutation = useMutation(
        'loginInfo',
        (data: AccountInfo) => window.context.accountAPI.postLogin(data),
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
        handleClose()
    }
    return (
        <Modal isOpen={isShowing} onClose={handleShowing}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* <Button size="small" label="Login" />
                <Input
                    type="text"
                    label="id"
                    placeholder="이메일을 입력해 주세요."
                    size="large"
                    onChangeInput={onChangeIdInput}
                    value={idValue}
                />
                <Input
                    type="password"
                    label="password"
                    placeholder="비밀번호를 입력해 주세요."
                    size="large"
                    onChangeInput={onChangePwInput}
                    value={pwValue}
                /> */}
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
