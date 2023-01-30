/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Children, Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import Modal from '../Modal'

const EmailCheckLayout = styled.div`
    width: 500px;
    height: 270px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ContentBox = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid #ced4da;
    svg {
        font-size: 50px;
        color: #ff9c30;
        margin-top: 56px;
    }
    span {
        font-family: 'Pretendard';
        font-weight: 700;
        font-size: 16px;
        margin-top: 26px;
    }
`

const Button = styled.button`
    width: 100%;
    height: 70px;
    font-family: 'Pretendard';
    font-weight: 700;
    font-size: 16px;
    background-color: #fff;
    border: none;
    border-radius: 0px 0px 20px 20px;
    color: #ff9c30;
`

interface Props {
    isShowing: boolean
    handleShowing: () => void
    setChangedPw: Dispatch<SetStateAction<boolean>>
}

const PasswordChangeModal: React.FC<Props> = ({
    isShowing,
    handleShowing,
    setChangedPw,
}) => {
    const handleClick = () => {
        handleShowing()
        setChangedPw(true)
    }
    return (
        <Modal isOpen={isShowing} onClose={handleShowing}>
            <EmailCheckLayout>
                <ContentBox>
                    <CheckCircleOutlineIcon />
                    <span>비밀번호가 변경되었습니다</span>
                </ContentBox>
                <Button type="button" onClick={handleClick}>
                    확인
                </Button>
            </EmailCheckLayout>
        </Modal>
    )
}

export default PasswordChangeModal
