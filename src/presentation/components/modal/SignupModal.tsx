/* eslint-disable no-alert */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
// import Button from '../../../stories/Button'

// import { Input } from '../../../stories/Input'
import Modal from '../../../stories/Modal'
import { AccountInfo } from '../../../types/inedx'

function SignupModal() {
    const {
        register,
        handleSubmit,

        formState: { isSubmitting },
    } = useForm<AccountInfo>()
    // const [idValue, setIdValue] = useState<string>('')
    // const [nickNameValue, setNickNameValue] = useState<string>('')
    // const [pwValue, setPwValue] = useState<string>('')
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(true)

    // const onChangeIdInput = (inputValue: string): void => {
    //     setIdValue(inputValue)
    // }
    // const onChangePwInput = (inputValue: string): void => {
    //     setPwValue(inputValue)
    // }
    // const onChangeNickNameInput = (inputValue: string): void => {
    //     setNickNameValue(inputValue)
    // }

    const handleClose = (): void => {
        setIsSignupModalOpen(false)
    }

    const mutation = useMutation(
        'signUpInfo',
        (data: AccountInfo) => window.context.signUpAPI.postSignUp(data),
        {
            onSuccess: () => {
                alert('done')
            },
            onError: (err) => {
                alert(err)
            },
        }
    )

    const onSubmit: SubmitHandler<AccountInfo> = (data) => {
        mutation.mutate(data)
    }

    return (
        <Modal isOpen={isSignupModalOpen} onClose={handleClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p>SignUpPage</p>
                {/* <Input
                    type="text"
                    label="id"
                    placeholder="이메일을 입력해 주세요."
                    size="large"
                    {...register('email')}
                />
                <Input
                    type="text"
                    label="nickname"
                    placeholder="닉네임을 입력해 주세요."
                    size="large"
                    {...register('nickname')}
                />
                <Input
                    type="password"
                    label="password"
                    placeholder="비밀번호를 입력해 주세요."
                    size="large"
                    {...register('password')}
                /> */}
                <input
                    type="text"
                    placeholder="이메일을 입력해 주세요."
                    {...register('email')}
                />
                <input
                    type="text"
                    placeholder="닉네임을 입력해 주세요."
                    {...register('nickname')}
                />
                <input
                    type="password"
                    placeholder="비밀번호를 입력해 주세요."
                    {...register('password')}
                />
                <button type="submit" disabled={isSubmitting}>
                    SignUp
                </button>
                {/* <Button
                    size="small"
                    label="SignUp"
                    type="submit"
                    disabled={isSubmitting}
                /> */}
            </form>
        </Modal>
    )
}

export default SignupModal
