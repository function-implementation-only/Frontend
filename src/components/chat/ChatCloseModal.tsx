import React from 'react'
import styled from 'styled-components'
import Modal from '../Modal'

interface Props {
    isShowing: boolean
    handleShowing: () => void
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
    height: 70px;
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

const ChatCloseModal: React.FC<Props> = ({ isShowing, handleShowing }) => {
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
                <CloseButtonBox />
            </CloseChatLayout>
        </Modal>
    )
}

export default ChatCloseModal
