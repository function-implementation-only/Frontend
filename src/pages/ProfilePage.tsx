/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react'
import styled from 'styled-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import useServiceManager from 'src/hooks/useServiceManager'
import AccountButtonItem from 'components/AccountButton'
import useModal from 'hooks/useModal'
import EmailCheckModal from 'components/account/EmailCheckModal'
import { useNavigate } from 'react-router-dom'
import { FormControl, MenuItem, Select } from '@mui/material'
import useGetAccountInfo from 'hooks/useGetAccountInfo'
import { ErrorNickname } from '../components/Error'
import { DefaultAccountInfo } from '../types/account'

const SignUpPageLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    form {
        width: 638px;
    }
`

const ThemeItem = styled.span`
    display: flex;
    justify-content: center;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    color: #3e4145;
    margin: 36px 0;
`

const ItemBox = styled.div``

const InputItem = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 32px;
    #emailAuth {
        margin-left: 142px;
    }
`

const Label = styled.label`
    width: 142px;
    font-family: 'Pretendard';
    font-size: 14px;
    color: #5a5c5f;
    span {
        color: #ff3257;
    }
`

const Input = styled.input`
    width: 368px;
    height: 48px;
    margin-right: 8px;
    border: 1px solid #cbcbcb;
    border-radius: 10px;
    padding: 14px;
    font-family: 'Pretendard';
    font-size: 14px;
    line-height: 20px;
    &::placeholder {
        color: #b0b0b0;
    }
    &:disabled {
        background: #f8f9fa;
        color: #838485;
    }
`

const ErrorItem = styled.div``

const ButtonBox = styled.div`
    margin-left: 142px;
`

function ProfilePage() {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<DefaultAccountInfo>({ mode: 'onChange' })

    // const { email, password } = watch()
    const [auth, setAuth] = useState(false)
    const [emailCheck, setEmailCheck] = useState(false)
    const [sendingMail, setSendingMail] = useState(false)
    const [resendingMail, setResendingMail] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const { isShowing, handleShowing } = useModal()
    const [showingPW, setShowingPW] = useState(false)
    const [showingPWcheck, setShowingPWcheck] = useState(false)
    const [authCheck, setAuthCheck] = useState(false)
    const [imgFiles, setImgFiles] = useState<FileList | null>(null)

    const [amOrPm, setAmOrPm] = useState('am')
    const [time, setTime] = useState('1시')
    const timeArray = [
        '2시',
        '3시',
        '4시',
        '5시',
        '6시',
        '7시',
        '8시',
        '9시',
        '10시',
        '11시',
        '12시',
    ]

    const handleChange = (event: {
        target: { value: React.SetStateAction<string> }
    }) => {
        setAmOrPm(event.target.value)
    }

    const handleTime = (event: {
        target: { value: React.SetStateAction<string> }
    }) => {
        setTime(event.target.value)
    }

    const navigate = useNavigate()
    const serviceManager = useServiceManager()

    // 사용자 기본정보 수정 API

    const accountInfoMutation = useMutation(
        'editAccountInfo',
        (formData: FormData) =>
            serviceManager.dataService.accountAPI.editAccountInfo(formData),
        {
            onSuccess: () => {
                navigate('/')
            },
            onError: (err) => {
                alert(err)
            },
        }
    )

    // 사용자 기본정보 API

    const { data: accountData } = useGetAccountInfo()

    const onSubmit: SubmitHandler<DefaultAccountInfo> = (inputData) => {
        const formData = new FormData()

        formData.append(
            'userInfo',
            new Blob([JSON.stringify(inputData)], { type: 'application/json' })
            // Spring 서버를 위한 처리
        )
        if (imgFiles) {
            formData.append('profileImg', imgFiles[0])
        }
        console.log(inputData)

        accountInfoMutation.mutate(formData)
        reset()
    }

    return (
        <SignUpPageLayout>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ThemeItem>기본 정보 수정</ThemeItem>
                <InputItem>
                    <Label htmlFor="email">이메일</Label>
                    <Input
                        id="email"
                        type="text"
                        disabled
                        placeholder={accountData?.data.email}
                        {...register('email')}
                    />
                </InputItem>
                <ItemBox>
                    <InputItem>
                        <Label htmlFor="nickname">닉네임</Label>
                        <Input
                            id="nickname"
                            type="text"
                            placeholder={accountData?.data.nickname}
                            {...register('nickname', {
                                // required: true,
                                maxLength: 10,
                                minLength: 3,
                                pattern:
                                    /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{3,10}$/,
                            })}
                        />
                    </InputItem>
                    <ErrorItem>
                        <ErrorNickname
                            errors={errors.nickname?.type}
                            margin="-22px 0 18px 142px;"
                        />
                    </ErrorItem>
                    <InputItem>
                        <Label htmlFor="field">직무 및 직책</Label>
                        <Input
                            id="field"
                            type="text"
                            placeholder={accountData?.data.field}
                            {...register('field')}
                        />
                    </InputItem>
                    <InputItem>
                        <Label htmlFor="introduction">간단 소개</Label>
                        <Input
                            id="introduction"
                            type="text"
                            placeholder={accountData?.data.introduction}
                            {...register('introduction', {
                                // required: true,
                                maxLength: 10,
                                minLength: 3,
                            })}
                        />
                    </InputItem>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                            value={amOrPm}
                            onChange={handleChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="am">
                                <em>오전</em>
                            </MenuItem>
                            <MenuItem value="pm">오후</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                            value={time}
                            onChange={handleTime}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="1시">
                                <em>1시</em>
                            </MenuItem>
                            {timeArray.map((li, idx) => {
                                return (
                                    <MenuItem key={idx} value={li}>
                                        {li}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </ItemBox>
                <ButtonBox>
                    <AccountButtonItem
                        type="submit"
                        disabled={isSubmitting}
                        fontWeight={700}
                    >
                        수정 완료
                    </AccountButtonItem>
                </ButtonBox>
            </form>
            <EmailCheckModal
                isShowing={isShowing}
                handleShowing={handleShowing}
                resendingMail={resendingMail}
                auth={auth}
            />
        </SignUpPageLayout>
    )
}

export default ProfilePage
