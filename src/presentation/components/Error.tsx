/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AccountInfo } from '../../types/account'

interface Errors {
    errors: string | undefined
}

export const ErrorEmail: React.FC<Errors> = ({ errors }) => {
    switch (errors) {
        case 'required':
            return <p style={{ fontSize: '14px' }}>이메일은 필수 항목입니다.</p>
        case 'pattern':
            return (
                <p style={{ fontSize: '14px' }}>이메일 형식에 맞지 않습니다.</p>
            )
        default:
            return null
    }
}

export const ErrorPassword: React.FC<Errors> = ({ errors }) => {
    switch (errors) {
        case 'required':
            return (
                <p style={{ fontSize: '14px' }}> 비밀번호는 필수 항목입니다.</p>
            )
        case 'minLength':
            return (
                <p style={{ fontSize: '14px' }}> 6글자 이상 입력해 주세요.</p>
            )
        case 'maxLength':
            return (
                <p style={{ fontSize: '14px' }}>12글자 이하로 입력해 주세요.</p>
            )
        default:
            return null
    }
}

export const ErrorPasswordCheck: React.FC<Errors> = ({ errors }) => {
    switch (errors) {
        case 'required':
            return (
                <p style={{ fontSize: '14px' }}>
                    비밀번호 체크는 필수 항목입니다.
                </p>
            )
        case 'validate':
            return (
                <p style={{ fontSize: '14px' }}>
                    패스워드와 일치하지 않습니다.
                </p>
            )
        default:
            return null
    }
}

export const ErrorEmailAuth: React.FC<Errors> = ({ errors }) => {
    switch (errors) {
        case 'required':
            return (
                <p style={{ fontSize: '14px' }}>
                    인증번호 체크는 필수 항목입니다.
                </p>
            )
        case 'validate':
            return <p style={{ fontSize: '14px' }}>일치하지 않습니다.</p>
        default:
            return null
    }
}
