import React from 'react'
import styled from 'styled-components'

interface ChatTextProp {
    avatar: boolean | string
    side: boolean
    message: string
    sender: string
    createAt: string
    avatarAddr: string
}
const ChatTextLayout = styled.div<{ isMine: boolean }>`
    display: flex;
    padding-left: 16px;
    padding-right: 16px;
    margin-left: ${(props) => (props.isMine ? 'auto;' : '')};
`
const Avatar = styled.img<{ avatar: boolean | string }>`
    border-radius: 50%;
    width: 28px;
    height: 28px;
    display: ${(props) => (props.avatar ? 'show' : 'none')};
`
const TextBox = styled.div<{ avatar: boolean | string }>`
    max-width: 450px;
    display: flex;
    flex-direction: column;
    
    position: relative;
    margin-left: ${(props) => (props.avatar ? '8px;' : '36px;')}
    margin-right: 8px;
`
const TextAndTimeBox = styled.div<{ isMine: boolean }>`
    display: flex;
    flex-direction: ${(props) => (props.isMine ? 'row-reverse;' : 'row;')};
    align-items: end;
`

const Name = styled.span<{ see: boolean | string }>`
    margin-top: 8px;
    font-weight: 400;

    display: ${(props) => (props.see ? 'box' : 'none')};
`
const Time = styled.span<{ isMine: boolean }>`
    bottom: 10px;
    font-size: 12px;
    color: #b0b0b0;
    translate: ${(props) => (props.isMine ? '28px -6px;' : '0px -6px;')};
`
type TextBoxType = {
    gap: boolean | string
    boxColor: boolean
}

const TextBallroon = styled.span<TextBoxType>`
    background: ${(props) => (props.boxColor ? '#FF9C30;' : '#F8F9FA;')}
    color: ${(props) => (props.boxColor ? 'white;' : '')}
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    padding: 9px 14px;
    border-radius: 10px;
    margin-bottom: 2px;
    
    margin-top: ${(props) => (props.gap ? '8px' : '4px')};
   

    
`
// Fixme: 프롭스 변수명 바꾸기.
function ChatText({
    avatar,
    side,
    avatarAddr,
    message,
    sender,
    createAt,
}: ChatTextProp) {
    const hour = new Date(createAt).getHours()
    const min = new Date(createAt).getMinutes()

    return (
        <ChatTextLayout isMine={side}>
            <Avatar src={avatarAddr} avatar={avatar} />
            <TextAndTimeBox isMine={side}>
                <TextBox avatar={avatar}>
                    <Name see={avatar}>{sender}</Name>
                    <TextBallroon gap={avatar} boxColor={side}>
                        {message}
                    </TextBallroon>
                </TextBox>
                <Time isMine={side}>{`${hour}:${min}`}</Time>
            </TextAndTimeBox>
        </ChatTextLayout>
    )
}

export default ChatText
