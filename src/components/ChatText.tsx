import React from 'react'
import styled from 'styled-components'

interface ChatTextProp {
    avatar: boolean | string
    content: string
    name: string
}

const ChatTextLayout = styled.div`
    display: flex;
    flex-direction: row;
    width: 1124px;
    padding-left: 16px;
    padding-right: 16px;
`
const Avatar = styled.img<{ avatar: boolean | string }>`
    border-radius: 50%;
    width: 28px;
    height: 28px;
    display: ${(props) => (props.avatar ? 'show' : 'none')};
`
const TextBox = styled.div<{ align: boolean }>`
    margin-left: 8px;
    max-width: 450px;
    display: flex;
    flex-direction: column;

    margin-left: ${(props) => (props.align ? '8px' : 'auto')};
`
const Name = styled.span<{ see: boolean | string }>`
    font-weight: 400;

    display: ${(props) => (props.see ? 'show' : 'none')};
`
const TextBallroon = styled.span<{ gap: boolean | string }>`
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    padding: 9px 14px;
    background: #f8f9fa;
    border-radius: 10px;

    margin-top: ${(props) => (props.gap ? '8px' : '4px')};
`
// Fixme: 프롭스 변수명 바꾸기.
function ChatText({ avatar, content, name }: ChatTextProp) {
    return (
        <ChatTextLayout>
            <Avatar src="https://via.placeholder.com/28" avatar={avatar} />
            <TextBox align={avatar}>
                <Name see={avatar}>{name}</Name>
                <TextBallroon gap={avatar}>{content}</TextBallroon>
            </TextBox>
        </ChatTextLayout>
    )
}

export default ChatText
// todo: 해당 채팅메세지 이전메세지와 해당 메세지를 비교해서 아이디가 같으면 아바타 X  지금 메세지가 나의 메시지면 아바타 X 리버스O.
