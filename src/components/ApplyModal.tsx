/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Children, Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { ApplyObj } from 'types/apply'
import useServiceManager from 'hooks/useServiceManager'
import { ContentResponse } from 'types/response'
import { FormControl, FormLabel, MenuItem, Select } from '@mui/material'
import { RECRUITMENT_PART, TEXT } from 'lib/constants'
import {
    muiLabelStyleObj,
    muiMenuItemStyleObj,
    muiSelectMenuPropsObj,
    muiSelectStyleObj,
} from 'src/styles/mui/custom'
import usePostApplyment from 'hooks/usePostApplyment'
import Modal from './Modal'
import PlaceHolderComponent from './common/PlaceHolderComponent'

const ApplyModalLayout = styled.form`
    width: 500px;
    height: 570px;
    display: grid;
    grid-template-rows: 101px 399px 70px;
`

const ContentBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #ced4da;
    padding: 0 50px 50px 48px;
    row-gap: 32px;
    span {
        font-family: 'Pretendard';
        font-weight: 700;
        font-size: 16px;
        margin-top: 26px;
    }
`

const ButtonBox = styled.div`
    display: flex;
`

const Button = styled.button`
    width: 100%;
    height: 70px;
    font-family: 'Pretendard';
    font-weight: 700;
    font-size: 16px;
    background-color: #fff;
    border: none;
`

const CancelButton = styled(Button)`
    color: red;
    border-radius: 0 0 0 20px;
    border-right: 1px solid #ced4da;
`

const ApplyButton = styled(Button)`
    color: var(--primary-color);
    border-radius: 0 0 20px 0;
`

const Title = styled.p`
    color: var(--primary-color);
    font-size: 24px;
    line-height: 28.8px;
    font-weight: 700;
    justify-self: center;
    padding: 48px 0 24px 0;
`

const CommentBox = styled.div`
    label {
        p {
            font-size: 16px;
            font-weight: 700;
            margin-bottom: 16px;
        }
    }
    textarea {
        width: 100%;
        height: 150px;
        resize: none;
        border: 1px solid var(--gray-250);
        border-radius: 10px;
        padding: 8px;

        &:focus {
            outline: none;
            border: 1px solid var(--primary-color);
        }
    }
`

interface Props {
    isShowing: boolean
    handleShowing: () => void
    post: ContentResponse
}

const ApplyModal: React.FC<Props> = ({ isShowing, handleShowing, post }) => {
    const handleClick = () => {
        handleShowing()
    }
    const { register, handleSubmit, control } = useForm()
    const postApplyment = usePostApplyment()

    const POSSIBLE_RECRUITMENT_PART = RECRUITMENT_PART.filter((item) => {
        switch (item.value) {
            case 'FrontEnd':
                return post.frontReqNum > 0
            case 'BackEnd':
                return post.backReqNum > 0
            case 'Designer':
                return post.designReqNum > 0
            case 'PM':
                return post.pmReqNum > 0
            case 'Mobile':
                return post.mobileReqNum > 0
            default:
                return false
        }
    })
    // 모집중인 파트만 선택하도록 필터링

    const onSubmit: SubmitHandler<any> = async (inputData) => {
        // FIXME : ApplyObj로 변경 필요
        const serviceManager = useServiceManager()
        const payload = {
            comment: inputData.comment,
            position: inputData.position.toUpperCase(),
            postId: post.postId,
        }
        postApplyment.mutate(payload)
    }
    return (
        <Modal isOpen={isShowing} onClose={handleShowing}>
            <ApplyModalLayout onSubmit={handleSubmit(onSubmit)}>
                <Title>지원하기</Title>
                <ContentBox>
                    <FormControl sx={{ m: 1, margin: 0, width: '100%' }}>
                        <FormLabel sx={muiLabelStyleObj}>
                            지원하실 포지션을 선택해주세요.
                        </FormLabel>
                        <Controller
                            control={control}
                            name="position"
                            defaultValue=""
                            render={({ field }) => (
                                <Select
                                    defaultValue=""
                                    displayEmpty
                                    sx={muiSelectStyleObj}
                                    MenuProps={muiSelectMenuPropsObj}
                                    {...field}
                                >
                                    <MenuItem
                                        value=""
                                        disabled
                                        sx={muiMenuItemStyleObj}
                                    >
                                        <PlaceHolderComponent
                                            text={TEXT.PLACEHOLDER_CHOICE}
                                        />
                                    </MenuItem>
                                    {POSSIBLE_RECRUITMENT_PART.map((item) => (
                                        <MenuItem
                                            value={item.value}
                                            key={item.title}
                                            sx={muiMenuItemStyleObj}
                                        >
                                            {item.title}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                    </FormControl>
                    <CommentBox>
                        <label htmlFor="applyReason">
                            <p>지원 사유를 작성하여 나를 어필해 보세요!</p>
                            <textarea
                                id="applyReason"
                                {...register('comment')}
                            />
                        </label>
                    </CommentBox>
                </ContentBox>
                <ButtonBox>
                    <CancelButton type="button" onClick={handleClick}>
                        취소
                    </CancelButton>
                    <ApplyButton type="submit">지원하기</ApplyButton>
                </ButtonBox>
            </ApplyModalLayout>
        </Modal>
    )
}

export default ApplyModal
