/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
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
    resendingMail: boolean
    auth: boolean
}

const EmailCheckModal: React.FC<Props> = ({
    isShowing,
    handleShowing,
    resendingMail,
    auth,
}) => {
    const handleClick = () => {
        handleShowing()
    }
    return (
        <Modal isOpen={isShowing} onClose={handleShowing}>
            <EmailCheckLayout>
                <ContentBox>
                    <CheckCircleOutlineIcon />
                    {auth ? (
                        <span> 인증이 완료되었습니다</span>
                    ) : resendingMail ? (
                        <span> 인증번호가 재전송되었습니다</span>
                    ) : (
                        <span> 인증번호가 전송되었습니다</span>
                    )}
                </ContentBox>
                <Button type="button" onClick={handleClick}>
                    확인
                </Button>
            </EmailCheckLayout>
        </Modal>
    )
}

export default EmailCheckModal
