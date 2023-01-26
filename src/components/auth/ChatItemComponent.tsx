import styled, { css } from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { ChatRoomWithUser } from 'types/chat'
import useChatRoomInfo from 'hooks/useChatInfo'
import defaultUserAvatar from 'img/default-user-avatar.svg'

interface ChatItemWrapperProps {
    active?: boolean
}

export const ChatItemWrapper = styled.li<ChatItemWrapperProps>`
    position: relative;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--gray-100);
    padding: 0.5em 1em;
    cursor: pointer;
    transition: background-color 200ms ease-out;
    &:hover {
        background-color: var(--gray-100);
        &::after {
            background-color: var(--primary);
        }
    }
    &::after {
        position: absolute;
        left: 2px;
        top: 0;
        content: ' ';
        width: 3px;
        height: 100%;
        transition: background-color 200ms ease-out;
    }
    &:last-of-type {
        border-bottom: none;
    }
    ${({ active }) =>
        active &&
        css`
            background-color: var(--gray-100);
            &::after {
                background-color: var(--primary);
            }
        `}
`

export const BorderAvatar = styled.img`
    border-radius: 30px;
`

export const MessageInfo = styled.p`
    margin-left: 0.5em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: fit-content;
    font-size: 0.9rem;
    color: rgba(0, 0, 0, 0.6);
`

export const Name = styled.span`
    font-weight: 600;
    font-size: 1rem;
    color: rgba(0, 0, 0, 0.7);
`

export const Time = styled.time`
    font-size: 0.8rem;
    margin-left: 0.5em;
    color: rgba(0, 0, 0, 0.5);
`

export const SkeletonWrapper = styled.li`
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--gray-100);
    padding: 0.5em 1em;
`

export default function ChatItemComponent(props: ChatRoomWithUser) {
    const { roomId, postUserImg } = props

    const { date, lastMessage, name } = useChatRoomInfo(props)
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const queryRoomId = Number(params.get('roomId'))

    return (
        <Link to={`/auth/messenger?roomId=${roomId}`}>
            <ChatItemWrapper active={roomId === queryRoomId}>
                <BorderAvatar src={postUserImg ?? defaultUserAvatar} />
                <MessageInfo>
                    <Name>{name}</Name>
                    {date && <Time>{date}</Time>}
                    <br />
                    {lastMessage ?? '채팅 내역이 존재하지 않습니다.'}
                </MessageInfo>
            </ChatItemWrapper>
        </Link>
    )
}
