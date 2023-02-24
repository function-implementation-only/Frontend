import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Modal from '../Modal'

interface Props {
    isShowing: boolean
    handleShowing: () => void
    deleteRequest: () => Promise<void>
    // login: boolean
    // signup: boolean
    // setLogin: Dispatch<SetStateAction<boolean>>
    // setSignup: Dispatch<SetStateAction<boolean>>
}

const CloseChatLayout = styled.div`
    width: 500px;
    heigt: 270px;
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
    font-weight: 700;
    font-size: 16px;
    &:hover {
        cursor: pointer;
        background #F8F9FA; 
    }
`
const WarningIcon = styled.svg`
    width: 44px;
    height: 44px;
    scale: 1.3;
`
const CloseParagraph = styled.h3`
    font-weight: 700;
    font-size: 16px;
    line-height: 19.09px;
`
const P = styled.p`
    font-weight: 400;
    font-size: 14px;
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
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 2 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        color="#FF3257"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                        />
                    </WarningIcon>
                    <CloseParagraph>채팅방을 나가시겠습니까?</CloseParagraph>
                    <P>나가기를 하면 대화내용이 모두 삭제되고</P>
                    <P>채팅목록애서도 삭제됩니다.</P>
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
