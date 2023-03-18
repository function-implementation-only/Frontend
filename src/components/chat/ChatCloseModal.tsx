import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Modal from '../Modal'

interface Props {
    isShowing: boolean
    handleShowing: () => void
    deleteRequest: () => Promise<void>
}

const CloseChatLayout = styled.div`
    width: 500px;
    height: 270px;
    display: flex;
    flex-direction: column;
`
const CloseMesssageBox = styled.div`
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
`
const CloseButtonBox = styled.div`
    display: flex;
    height: 70px;

    & :nth-child(1) {
        color: #ff3257;
        border-bottom-left-radius: 20px;
        border: none;
        border-right: 1px solid RGB(206, 212, 218);
        border-top: 1px solid RGB(206, 212, 218);
    }
    & :nth-child(2) {
        color: #ff9c30;
        border-bottom-right-radius: 20px;
        border: none;
        border-top: 1px solid RGB(206, 212, 218);
    }
`
const DeleteButton = styled.button`
    width: 100%;
    background: transparent;

    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    &:hover {
        cursor: pointer;
        background: #f8f9fa;
    }
`
const WarningIcon = styled.svg`
    margin-bottom: 6px;
`
const CloseParagraph = styled.h3`
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
`
const P = styled.p`
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: #5a5c5f;
`

const ChatCloseModal: React.FC<Props> = ({
    isShowing,
    handleShowing,
    deleteRequest,
}) => {
    const navigate = useNavigate()

    const deleteSequence = async () => {
        await deleteRequest()
        navigate('/chat')
    }

    return (
        <Modal isOpen={isShowing} onClose={handleShowing}>
            <CloseChatLayout>
                <CloseMesssageBox>
                    <WarningIcon
                        width="44"
                        height="45"
                        viewBox="0 0 44 45"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M22 4.5C12.0589 4.5 4 12.5589 4 22.5C4 32.4411 12.0589 40.5 22 40.5C31.9411 40.5 40 32.4411 40 22.5C40 12.5589 31.9411 4.5 22 4.5ZM0 22.5C0 10.3497 9.84974 0.5 22 0.5C34.1503 0.5 44 10.3497 44 22.5C44 34.6503 34.1503 44.5 22 44.5C9.84974 44.5 0 34.6503 0 22.5ZM22 12.5C23.1046 12.5 24 13.3954 24 14.5V22.5C24 23.6046 23.1046 24.5 22 24.5C20.8954 24.5 20 23.6046 20 22.5V14.5C20 13.3954 20.8954 12.5 22 12.5ZM20 30.5C20 29.3954 20.8954 28.5 22 28.5H22.02C23.1246 28.5 24.02 29.3954 24.02 30.5C24.02 31.6046 23.1246 32.5 22.02 32.5H22C20.8954 32.5 20 31.6046 20 30.5Z"
                            fill="#FF3257"
                        />
                    </WarningIcon>
                    <CloseParagraph>채팅방을 나가시겠습니까?</CloseParagraph>
                    <div>
                        <P>나가기를 하면 대화내용이 모두 삭제되고</P>
                        <P>채팅목록애서도 삭제됩니다.</P>
                    </div>
                </CloseMesssageBox>
                <CloseButtonBox>
                    <DeleteButton type="button" onClick={deleteSequence}>
                        나가기
                    </DeleteButton>
                    <DeleteButton type="button" onClick={handleShowing}>
                        취소
                    </DeleteButton>
                </CloseButtonBox>
            </CloseChatLayout>
        </Modal>
    )
}

export default ChatCloseModal
