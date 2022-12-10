import React, { useState } from 'react'
import Input from '../../../stories/Input'
import Button from '../../../stories/Button'
import Modal from '../../../stories/Modal'

function LoginModal() {
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
        setIsLoginModalOpen(false)
    }

    const mutation = useMutation(
        'loginInfo',
        (data: AccountInfo) => window.context.accountAPI.postLogIn(data),
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
        <Modal isOpen={isLoginModalOpen} onClose={handleClose}>
            <Button size="small" label="Login" onClickButton={handleLogin} />
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
            />
        </Modal>
    )
}

export default LoginModal
