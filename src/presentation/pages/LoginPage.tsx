import React, { useState } from 'react'
import { Input } from '../../stories/Input'

function LoginPage() {
    const [idValue, setIdValue] = useState<string>('')
    const [pwValue, setPwValue] = useState<string>('')
    const onChangeIdInput = (inputValue: string): void => {
        setIdValue(inputValue)
    }
    const onChangePwInput = (inputValue: string): void => {
        setPwValue(inputValue)
    }
    return (
        <div>
            <p>LoginPage</p>
            <Input
                type="text"
                label="id"
                placeholder="아이디를 입력해 주세요."
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
        </div>
    )
}

export default LoginPage
