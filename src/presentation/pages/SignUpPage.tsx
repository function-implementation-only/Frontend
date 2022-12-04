import React, { useState } from 'react'
import { Input } from '../../stories/Input'

function SignUpPage() {
    const [idValue, setIdValue] = useState<string>('')
    const [nickNameValue, setNickNameValue] = useState<string>('')
    const [pwValue, setPwValue] = useState<string>('')
    const onChangeIdInput = (inputValue: string): void => {
        setIdValue(inputValue)
    }
    const onChangePwInput = (inputValue: string): void => {
        setPwValue(inputValue)
    }
    const onChangeNickNameInput = (inputValue: string): void => {
        setNickNameValue(inputValue)
    }
    return (
        <div>
            <p>SignUpPage</p>
            <Input
                type="text"
                label="id"
                placeholder="이메일을 입력해 주세요."
                size="large"
                onChangeInput={onChangeIdInput}
                value={idValue}
            />
            <Input
                type="text"
                label="nickname"
                placeholder="닉네임을 입력해 주세요."
                size="large"
                onChangeInput={onChangeNickNameInput}
                value={nickNameValue}
            />
            <Input
                type="password"
                label="password"
                placeholder="비밀번호를 입력해 주세요."
                size="large"
                onChangeInput={onChangePwInput}
                value={pwValue}
            />
        </div>
    )
}

export default SignUpPage
