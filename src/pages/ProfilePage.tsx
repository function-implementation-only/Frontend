/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import AccountButtonItem from 'components/AccountButton'
import useModal from 'hooks/useModal'
import { Avatar } from '@mui/material'
import useGetAccountInfo from 'hooks/useGetAccountInfo'
import ShowPWButton from 'components/ShowPWButton'
import PasswordChangeModal from 'components/account/PasswordChangeModal'
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined'
import usePostPasswordCheck from 'hooks/usePostPasswordCheck'
import useEditPassword from 'hooks/useEditPassword'
import useEditAccountInfo from 'hooks/useEditAccountInfo'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
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
        // width: 638px;
    }
    @media (max-width: 720px) {
        form {
        }
    }
`
const AvatarBox = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    margin: 36px 0;
    .avatar {
        width: 130px;
        height: 130px;
    }
    @media (max-width: 720px) {
        margin: 0 0 14px;
        .avatar {
            width: 94px;
            height: 94px;
        }
    }
`

const AvatarImage = styled.img`
    width: 130px;
    height: 130px;
    border-radius: 50%;
    @media (max-width: 720px) {
        width: 94px;
        height: 94px;
    }
`

const ThemeBox = styled.span`
    display: flex;
    justify-content: center;

    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    color: #3e4145;
    margin: 36px 0;
    @media (max-width: 720px) {
        font-size: 18px;
        margin: 24px 0;
    }
`

const ItemBox = styled.div`
    @media (max-width: 720px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`

const InputItem = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 38px;
    &:last-child {
        margin-bottom: 42px;
    }
    #passwordCheck {
        margin-left: 142px;
    }
    em {
        color: #212529;
    }
    @media (max-width: 720px) {
        #password,
        #passwordCheck {
            width: 258px;
            margin-left: 0;
        }
        flex-direction: column;
        align-items: start;
        margin-bottom: 35px;
    }
`

const Label = styled.label`
    width: 142px;

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

    font-size: 16px;
    line-height: 20px;
    &::placeholder {
        color: #b0b0b0;
    }
    &:disabled {
        background: #f8f9fa;
        color: #838485;
    }
    @media (max-width: 720px) {
        width: 343px;
        height: 46px;
        margin: 4px 0 0;
        font-size: 14px;
    }
`

const Button = styled.button`
    width: 120px;
    height: 48px;

    font-weight: 700;
    font-size: 16px;
    background-color: transparent;
    border: 1px solid #ff9c30;
    border-radius: 10px;
    color: #ff9c30;
    cursor: pointer;
    &:disabled {
        color: #cbcbcb;
        background: #f8f9fa;
        border: 1px solid #cbcbcb;
    }
    @media (max-width: 720px) {
        width: 77px;
        height: 46px;
        margin-left: 8px;
    }
`

const AddButton = styled.button`
    position: absolute;
    left: 54.5%;
    right: 2.31%;
    top: 72.31%;
    z-index: 10;
    width: 37px;
    height: 37px;
    cursor: pointer;
    background-color: #fff;
    border: 1px solid #ff9c30;
    border-radius: 50%;
    color: #ff9c30;
    svg {
        vertical-align: middle;
    }
    @media (max-width: 720px) {
        width: 26px;
        height: 26px;
        left: 54%;
        svg {
            position: absolute;
            font-size: 19px;
            top: 15%;
            left: 12%;
        }
    }
`

const ErrorItem = styled.div`
    @media (max-width: 720px) {
        p {
            margin-left: -166px;
        }
    }
`

const ButtonBox = styled.div`
    margin-left: 142px;
    @media (max-width: 720px) {
        display: flex;
        justify-content: center;
        margin: 0 0 24px;
    }
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
    const [imgFiles, setImgFiles] = useState(null)
    const [previewImage, setPreviewImage] = useState('')
    const imgRef = useRef<HTMLInputElement>(null)

    // 사용자 패스워드 확인 API
    const postPasswordCheck = usePostPasswordCheck(setPwCheck, email, password)

    // 사용자 패스워드 수정 API
    const editPassword = useEditPassword(handleShowing, email, changePassword)

    // 사용자 기본정보 수정 API
    const editAccountInfo = useEditAccountInfo()

    // 사용자 기본정보 API
    const { data: accountData } = useGetAccountInfo()

    const handlePwChange = () => {
        setPwChange(true)
    }

    const onSubmit: SubmitHandler<DefaultAccountInfo> = (inputData) => {
        const formData = new FormData()

        formData.append(
            'userInfo',
            new Blob([JSON.stringify(inputData)], { type: 'application/json' })
            // Spring 서버를 위한 처리
        )
        if (imgFiles) {
            formData.append('profileImg', imgFiles)
        }

        editAccountInfo.mutate(formData)
        reset()
    }

    const onSubmitPasswordCheck = () => {
        if (password !== undefined && errors.password === undefined) {
            postPasswordCheck.mutate()
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
            editPassword.mutate()
        }
    }

    const handleButtonClick = () => {
        imgRef.current.click()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = imgRef.current.files[0]
        // const file = e.target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewImage(reader.result as string)
            setImgFiles(e.target.files[0])
        }
    }

    useEffect(() => {
        setValue('email', accountData?.data.email)
        setValue('nickname', accountData?.data.nickname)
        setValue('field', accountData?.data.field)
        setValue('introduction', accountData?.data.introduction)
        setValue('availableTime', accountData?.data.availableTime)
        setPreviewImage(accountData?.data.imgUrl)
    }, [])

    return (
        <ProfilePageLayout>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ThemeBox>기본 정보 수정</ThemeBox>
                <AvatarBox>
                    <AddButton type="button" onClick={handleButtonClick}>
                        <PhotoCameraOutlinedIcon />
                    </AddButton>
                    <input
                        type="file"
                        style={{ display: 'none' }}
                        accept="image/jpeg, image/jpg, image/png"
                        ref={imgRef}
                        onChange={handleChange}
                    />
                    {previewImage || accountData?.data.imgUrl ? (
                        <AvatarImage
                            src={previewImage || accountData?.data.imgUrl}
                            alt="프로필 이미지"
                        />
                    ) : (
                        <Avatar className="avatar" src="/broken-image.jpg" />
                    )}
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
                        <div>
                            <Input
                                id="password"
                                disabled={pwChange || changedPw}
                                type={showingPW ? 'text' : 'password'}
                                placeholder="영문, 숫자 조합 6~12자"
                                {...register('password', {
                                    maxLength: 12,
                                    minLength: 6,
                                    pattern:
                                        /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,12}$/,
                                    onBlur: () => onSubmitPasswordCheck(),
                                    onChange: () => onSubmitPasswordCheck(),
                                })}
                            />
                            <ShowPWButton
                                showingPW={showingPW}
                                setShowingPW={setShowingPW}
                                mobileRight="90px"
                                mobileTop="48%"
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
                        </div>
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
                                    mobileRight="5px"
                                    mobileTop="47%"
                                />
                            </InputItem>
                            <ErrorItem>
                                <ErrorPassword
                                    errors={errors.changePassword?.type}
                                    margin="-22px 0 18px 142px;"
                                />
                            </ErrorItem>
                            <InputItem>
                                <div>
                                    <Input
                                        id="passwordCheck"
                                        type={
                                            showingPWcheck ? 'text' : 'password'
                                        }
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
                                        mobileRight="90px"
                                        mobileTop="34%"
                                    />
                                    <Button
                                        type="button"
                                        onClick={onSubmitPasswordChange}
                                        disabled={changedPw}
                                    >
                                        변경
                                    </Button>
                                </div>
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
                                maxLength: 18,
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
                    </InputItem>
                </ItemBox>
                <ButtonBox>
                    <AccountButtonItem
                        type="submit"
                        disabled={isSubmitting}
                        fontWeight={700}
                        mobileWidth={660}
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
