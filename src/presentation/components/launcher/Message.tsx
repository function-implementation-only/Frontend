import React from 'react'
import styled from 'styled-components'
import { ChatWithUser } from '../../../types/chat'

export const MessageWrapper = styled.div`
    position: relative;
    display: flex;
    padding: 0.5em 0;
`
// export const ChatAvatar = styled(Avatar)`
//     position: absolute;
// `
export const MessageInfo = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 50px;
    align-items: flex-start;
`
export const Name = styled.span`
    display: inline-block;
    font-weight: 600;
    height: 40px;
    line-height: 40px;
    color: rgba(0, 0, 0, 0.75);
`

export const Message = styled.p`
    margin: 0;
    font-size: 0.95rem;
    color: rgba(0, 0, 0, 0.75);
    font-weight: 500;
`

function ChatMessage({ id, user, message }: ChatWithUser) {
    return (
        <MessageWrapper key={id}>
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
