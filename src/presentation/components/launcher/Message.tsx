import React from 'react'
import styled from 'styled-components'

export type User = {
    id: string
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
}
export type Chat = {
    message: string
}

export interface ChatWithUser extends Chat {
    user: User
}

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
export default function ChatMessage({ user, message }: ChatWithUser) {
    return (
        <MessageWrapper>
            {/* <ChatAvatar src={user?.image ?? undefined} /> */}
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
