import React from 'react'
import styled from 'styled-components'
import { ChatWithUser } from '../../../types/chat'

export const MessageWrapper = styled.div<{ me: boolean }>`
    position: relative;
    display: flex;
    padding: 0.5em 0;
    flex-direction: ${(props) => (props.me ? 'row-reverse' : 'row')};
`

export const MessageInfo = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    align-items: flex-start;
`
export const Name = styled.span`
    display: inline-block;
    font-weight: 600;
    height: 40px;
    line-height: 30px;
    color: rgba(0, 0, 0, 0.75);
`

export const Message = styled.p`
    margin: 0;
    padding: 0;
    font-size: 0.95rem;
    color: rgba(0, 0, 0, 0.75);
    font-weight: 500;
`
interface Props extends ChatWithUser {
    me: boolean
}

function ChatMessage({ id, user, message, me }: Props) {
    return (
        <MessageWrapper key={id} me={me}>
            <img src={user.image} alt="" width={30} height={30} />
            <MessageInfo>
                <Name>{user?.name}</Name>
                <Message
                    dangerouslySetInnerHTML={{
                        __html: message,
                    }}
                />
            </MessageInfo>
        </MessageWrapper>
    )
}

export default ChatMessage
