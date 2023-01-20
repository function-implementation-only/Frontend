/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import useServiceManager from 'src/hooks/useServiceManager'
import AccountButtonItem from 'components/AccountButton'
import useModal from 'hooks/useModal'
import { useNavigate } from 'react-router-dom'
import { Avatar, FormControl, MenuItem, Select } from '@mui/material'
import useGetAccountInfo from 'hooks/useGetAccountInfo'
import ShowPWButton from 'components/ShowPWButton'
import PasswordChangeModal from 'components/account/PasswordChangeModal'
import {
    ErrorNickname,
    ErrorPassword,
    ErrorPasswordCheck,
} from '../components/Error'
import { DefaultAccountInfo } from '../types/account'

const ProfilePageLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    form {
        width: 638px;
    }
`
const AvatarBox = styled.div`
    display: flex;
    justify-content: center;
    margin: 36px 0;
`

const ThemeBox = styled.span`
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
    margin-bottom: 38px;
    &:last-child {
        margin-bottom: 42px;
    }
    #emailAuth {
        margin-left: 142px;
    }
    #passwordCheck {
        margin-left: 142px;
    }
    em {
        color: #212529;
    }
`

const Label = styled.label`
    width: 142px;
    font-family: 'Pretendard';
    font-size: 16px;
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
    font-size: 16px;
    line-height: 20px;
    &::placeholder {
        color: #b0b0b0;
    }
    &:disabled {
        background: #f8f9fa;
        color: #838485;
    }
`

const Button = styled.button`
    width: 120px;
    height: 48px;
    font-family: 'Pretendard';
    font-weight: 700;
    font-size: 16px;
    background-color: transparent;
    border: 1px solid #ff9c30;
    border-radius: 10px;
    color: #ff9c30;
    &:disabled {
        color: #cbcbcb;
        background: #f8f9fa;
        border: 1px solid #cbcbcb;
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
        trigger,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<DefaultAccountInfo>({ mode: 'onChange' })

    const { email, password, changePassword, passwordCheck } = watch()
    const [pwCheck, setPwCheck] = useState(false)
    const [pwChange, setPwChange] = useState(false)
    const [changedPw, setChangedPw] = useState(false)
    const { isShowing, handleShowing } = useModal()
    const [showingPW, setShowingPW] = useState(false)
    const [showingPwChange, setShowingPwChange] = useState(false)
    const [showingPWcheck, setShowingPWcheck] = useState(false)
    const [authCheck, setAuthCheck] = useState(false)
    const [imgFiles, setImgFiles] = useState<FileList | null>(null)

    const [amPmStart, setAmPmStart] = useState('')
    const [amPmEnd, setAmPmEnd] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
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

    const handleAmPmStart = (event: {
        target: { value: React.SetStateAction<string> }
    }) => {
        setAmPmStart(event.target.value)
    }

    const handleAmPmEnd = (event: {
        target: { value: React.SetStateAction<string> }
    }) => {
        setAmPmEnd(event.target.value)
    }

    const handleStartTime = (event: {
        target: { value: React.SetStateAction<string> }
    }) => {
        setStartTime(event.target.value)
    }

    const handleEndTime = (event: {
        target: { value: React.SetStateAction<string> }
    }) => {
        setEndTime(event.target.value)
    }

    const handlePwChange = () => {
        setPwChange(true)
    }

    const navigate = useNavigate()
    const serviceManager = useServiceManager()

    // 사용자 패스워드 확인 API

    const passwordCheckMutation = useMutation(
        'editAccountInfo',
        () =>
            serviceManager.dataService.accountAPI.postPasswordCheck(
                email,
                password
            ),
        {
            onSuccess: (res) => {
                if (res.data.data === true) {
                    setPwCheck(true)
                    console.log('success')
                } else {
                    setPwCheck(false)
                    console.log('fail')
                }
            },
            onError: (err) => {
                alert(err)
            },
        }
    )

    // 사용자 패스워드 수정 API

    const passwordChangekMutation = useMutation(
        'editPassword',
        () =>
            serviceManager.dataService.accountAPI.editPassword(
                email,
                changePassword
            ),
        {
            onSuccess: (res) => {
                if (res.data.data === true) {
                    console.log('success!!')
                    handleShowing()
                } else {
                    console.log('fail!!')
                }
            },
            onError: (err) => {
                alert(err)
            },
        }
    )

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

    const onSubmitPasswordCheck = () => {
        if (password !== undefined && errors.password === undefined) {
            passwordCheckMutation.mutate()
        }
    }

    const onSubmitPasswordChange = () => {
        trigger('passwordCheck')
        trigger('changePassword')
        if (
            changePassword !== undefined &&
            passwordCheck !== undefined &&
            errors.passwordCheck === undefined &&
            errors.changePassword === undefined
        ) {
            passwordChangekMutation.mutate()
        }
    }

    useEffect(() => {
        setValue('email', accountData?.data.email)
        setValue('nickname', accountData?.data.nickname)
        setValue('field', accountData?.data.field)
        setValue('introduction', accountData?.data.introduction)
        setValue('availableTime', accountData?.data.availableTime)
    }, [])

    return (
        <ProfilePageLayout>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ThemeBox>기본 정보 수정</ThemeBox>
                <AvatarBox>
                    <Avatar
                        src="/broken-image.jpg"
                        sx={{ width: 130, height: 130 }}
                    />
                </AvatarBox>
                <ItemBox>
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
                    <InputItem>
                        <Label htmlFor="password">비밀번호</Label>
                        <Input
                            id="password"
                            disabled={pwChange || changedPw}
                            type={showingPW ? 'text' : 'password'}
                            placeholder="영문, 숫자 조합 6~12자"
                            {...register('password', {
                                maxLength: 12,
                                minLength: 6,
                                pattern: /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,12}$/,
                                onBlur: () => onSubmitPasswordCheck(),
                                onChange: () => onSubmitPasswordCheck(),
                            })}
                        />
                        <ShowPWButton
                            showingPW={showingPW}
                            setShowingPW={setShowingPW}
                        />
                        {!pwChange ? (
                            <Button
                                type="button"
                                onClick={handlePwChange}
                                disabled={!pwCheck || changedPw}
                            >
                                변경
                            </Button>
                        ) : (
                            <Button
                                type="button"
                                onClick={() => setPwChange(false)}
                                disabled={changedPw}
                            >
                                취소
                            </Button>
                        )}
                    </InputItem>
                    <ErrorItem>
                        <ErrorPassword
                            errors={errors.password?.type}
                            margin="-22px 0 18px 142px;"
                        />
                    </ErrorItem>
                    {pwChange && (
                        <>
                            <InputItem>
                                <Label htmlFor="changePassword">
                                    비밀번호 변경
                                </Label>
                                <Input
                                    id="changePassword"
                                    type={showingPwChange ? 'text' : 'password'}
                                    placeholder="영문, 숫자 조합 6~12자"
                                    disabled={changedPw}
                                    {...register('changePassword', {
                                        required: true,
                                        maxLength: 12,
                                        minLength: 6,
                                        pattern:
                                            /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,12}$/,
                                    })}
                                />
                                <ShowPWButton
                                    showingPW={showingPwChange}
                                    setShowingPW={setShowingPwChange}
                                />
                            </InputItem>
                            <ErrorItem>
                                <ErrorPassword
                                    errors={errors.changePassword?.type}
                                    margin="-22px 0 18px 142px;"
                                />
                            </ErrorItem>
                            <InputItem>
                                <Input
                                    id="passwordCheck"
                                    type={showingPWcheck ? 'text' : 'password'}
                                    disabled={changedPw}
                                    placeholder="비밀번호를 한번 더 입력해 주세요."
                                    {...register('passwordCheck', {
                                        required: true,
                                        validate: (value) =>
                                            value === changePassword,
                                    })}
                                />
                                <ShowPWButton
                                    showingPW={showingPWcheck}
                                    setShowingPW={setShowingPWcheck}
                                />
                                <Button
                                    type="button"
                                    onClick={onSubmitPasswordChange}
                                    disabled={changedPw}
                                >
                                    변경
                                </Button>
                            </InputItem>
                            <ErrorItem>
                                <ErrorPasswordCheck
                                    errors={errors.passwordCheck?.type}
                                    margin="-22px 0 18px 142px;"
                                />
                            </ErrorItem>
                        </>
                    )}

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
                    <InputItem>
                        <Label htmlFor="availableTime">연락 가능 시간대</Label>
                        <Input
                            id="availableTime"
                            type="text"
                            placeholder={accountData?.data.availableTime}
                            {...register('availableTime')}
                        />
                        {/* 시간을 하나로 묶어서 제출하는데 이슈 */}
                        {/* <FormControl sx={{ mr: '4px', width: 115 }}>
                            <Select
                                value={amPmStart}
                                onChange={handleAmPmStart}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                style={{ height: 48 }}
                            >
                                <MenuItem value="오전">
                                    <em>오전</em>
                                </MenuItem>
                                <MenuItem value="오후">오후</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ mr: '8px', width: 115 }}>
                            <Select
                                value={startTime}
                                onChange={handleStartTime}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                style={{ height: 48 }}
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
                        <em>~</em>
                        <FormControl sx={{ ml: '8px', width: 115 }}>
                            <Select
                                value={amPmEnd}
                                onChange={handleAmPmEnd}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                style={{ height: 48 }}
                            >
                                <MenuItem value="오전">
                                    <em>오전</em>
                                </MenuItem>
                                <MenuItem value="오후">오후</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ ml: '4px', width: 115 }}>
                            <Select
                                value={endTime}
                                onChange={handleEndTime}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                style={{ height: 48 }}
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
                        </FormControl> */}
                    </InputItem>
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
            <PasswordChangeModal
                isShowing={isShowing}
                handleShowing={handleShowing}
                setChangedPw={setChangedPw}
            />
        </ProfilePageLayout>
    )
}

export default ProfilePage
