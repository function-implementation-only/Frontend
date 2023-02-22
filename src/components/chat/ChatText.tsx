import React from 'react'
import styled from 'styled-components'

interface ChatTextProp {
    avatar: boolean | string
    side: boolean
    content: string
    name: string
    time: string
}

const ChatTextLayout = styled.div<{ isMine: boolean }>`
    display: flex;
    flex-direction: ${(props) => (props.isMine ? 'row-reverse;' : 'row;')}
    /* flex-direction: row; */
    max-width: 1124px;
    padding-left: 16px;
    padding-right: 16px;
`
const Avatar = styled.img<{ avatar: boolean | string }>`
    border-radius: 50%;
    width: 28px;
    height: 28px;
    display: ${(props) => (props.avatar ? 'show' : 'none')};
`
const TextBox = styled.div<{ isMine: boolean }>`
    margin-left: 8px;
    max-width: 450px;
    display: flex;
    flex-direction: column;
    font-family: 'Pretendard';
    position: relative;

    margin-left: ${(props) => (props.isMine ? 'auto' : '8px')};
`
const Name = styled.span<{ see: boolean | string }>`
    margin-top: 8px;
    font-weight: 400;
    font-family: 'Pretendard';
    display: ${(props) => (props.see ? 'box' : 'none')};
`
const Time = styled.span<{ isMine: boolean }>`
    position: absolute;
    right: ${(props) => (props.isMine ? '' : '-30px;')};
    left: ${(props) => (props.isMine ? '-15px;' : '')};
    bottom: 10px;
    font-size: 12px;
    color: #b0b0b0;
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
    font-family: 'Pretendard';

    margin-top: ${(props) => (props.gap ? '8px' : '4px')};
    margin-left: ${(props) => (props.gap ? '' : '28px')};
`
// Fixme: 프롭스 변수명 바꾸기.
function ChatText({ avatar, content, name, side, time }: ChatTextProp) {
    const hour = new Date(time).getHours()
    const min = new Date(time).getMinutes()

    return (
        <ChatTextLayout isMine={side}>
            <Avatar src="https://via.placeholder.com/28" avatar={avatar} />
            <TextBox isMine={side}>
                <Name see={avatar}>{name}</Name>
                <TextBallroon gap={avatar} boxColor={side}>
                    {content}
                </TextBallroon>
                <Time isMine={side}>{`${hour}:${min}`}</Time>
            </TextBox>
        </ChatTextLayout>
    )
}

export default ChatText
