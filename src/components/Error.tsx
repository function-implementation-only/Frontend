/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { AccountInfo } from 'types/account'

const Text = styled.p`
    margin: -12px 0 16px;
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
}

export const ErrorEmail: React.FC<Errors> = ({ errors }) => {
    switch (errors) {
        case 'required':
            return <Text>이메일은 필수 항목입니다.</Text>
        case 'pattern':
            return <Text>이메일 형식에 맞지 않습니다.</Text>
        default:
            return null
    }
}

export const ErrorPassword: React.FC<Errors> = ({ errors }) => {
    switch (errors) {
        case 'required':
            return <Text> 비밀번호는 필수 항목입니다. </Text>
        case 'minLength':
            return <Text> 6글자 이상 입력해 주세요. </Text>
        case 'maxLength':
            return <Text>12글자 이하로 입력해 주세요. </Text>
        case 'pattern':
            return (
                <Text style={{ fontSize: '14px' }}>
                    비밀번호 형식에 맞지 않습니다.
                </Text>
            )
        default:
            return null
    }
}

export const ErrorPasswordCheck: React.FC<Errors> = ({ errors }) => {
    switch (errors) {
        case 'required':
            return <Text>비밀번호 체크는 필수 항목입니다.</Text>
        case 'validate':
            return <Text>패스워드와 일치하지 않습니다.</Text>
        default:
            return null
    }
}

export const ErrorEmailAuth: React.FC<Errors> = ({ errors }) => {
    switch (errors) {
        case 'required':
            return <Text>인증번호 체크는 필수 항목입니다.</Text>
        case 'validate':
            return <Text>일치하지 않습니다.</Text>
        default:
            return null
    }
}
