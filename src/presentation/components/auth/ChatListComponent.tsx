import { useMemo } from 'react'

import styled from 'styled-components'
import ChatItemSkeleton from './skeleton'
import ChatItemComponent from './ChatItemComponent'
import useChatRooms from '../../../hooks/useChatRooms'

export const ChatListWrapper = styled.ul`
    max-height: calc(100vh - 80px - 90px - 60px - 64px);
    overflow-y: auto;
    padding: 1rem;
`

export const SearchBox = styled.div`
    display: flex;
    align-items: center;
    width: '100%';
    padding: 1rem;
    border-bottom: 1px solid var(--gray-100);
`

export default function ChatListComponent() {
    const { data, isLoading } = useChatRooms()

    const chatRooms = useMemo(() => {
        if (data.status === 200) {
            if (data.data != null) {
                return data.data
            }
        }

        return []
    }, [data])

    return (
        <ChatListWrapper>
            {isLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                      <ChatItemSkeleton key={(i + 1).toString()} />
                  ))
                : chatRooms.map((item: any) => (
                      <ChatItemComponent key={item.id} {...item} />
                  ))}
        </ChatListWrapper>
    )
}
