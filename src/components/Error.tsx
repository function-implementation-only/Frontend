/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import styled from 'styled-components'

const Text = styled.p<{ margin?: string }>`
    margin:${({ margin }) => margin || ' -12px 0 16px;'}
    // font-family: 'Pretendard';
    font-size: 12px;
    color: #f03738;
    &::before {
        display: inline;
        content: '⚠ ';
    }
`

interface Errors {
    errors: string | undefined
    margin?: string
}

export const ErrorEmail: React.FC<Errors> = ({ errors, margin }) => {
    switch (errors) {
        case 'required':
            return <Text margin={margin}>이메일은 필수 항목입니다.</Text>
        case 'pattern':
            return <Text margin={margin}>이메일 형식에 맞지 않습니다.</Text>
        default:
            return null
    }
}

export const ErrorPassword: React.FC<Errors> = ({ errors, margin }) => {
    switch (errors) {
        case 'required':
            return <Text margin={margin}> 비밀번호는 필수 항목입니다. </Text>
        case 'minLength':
            return <Text margin={margin}> 6글자 이상 입력해 주세요. </Text>
        case 'maxLength':
            return <Text margin={margin}>12글자 이하로 입력해 주세요. </Text>
        case 'pattern':
            return <Text margin={margin}>비밀번호 형식에 맞지 않습니다.</Text>
        default:
            return null
    }
}

export const ErrorPasswordCheck: React.FC<Errors> = ({ errors, margin }) => {
    switch (errors) {
        case 'required':
            return <Text margin={margin}>비밀번호 체크는 필수 항목입니다.</Text>
        case 'validate':
            return <Text margin={margin}>패스워드와 일치하지 않습니다.</Text>
        default:
            return null
    }
}

export const ErrorEmailAuth: React.FC<Errors> = ({ errors, margin }) => {
    switch (errors) {
        case 'required':
            return <Text margin={margin}>인증번호 체크는 필수 항목입니다.</Text>
        case 'validate':
            return <Text margin={margin}>일치하지 않습니다.</Text>
        default:
            return null
    }
}

export const ErrorNickname: React.FC<Errors> = ({ errors, margin }) => {
    switch (errors) {
        case 'required':
            return <Text margin={margin}>닉네임은 필수 항목입니다.</Text>
        case 'pattern':
            return (
                <Text margin={margin}>
                    영문, 숫자 조합 3~10자 이내로 입력해 주세요.
                </Text>
            )
        default:
            return null
    }
}
