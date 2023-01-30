/* eslint-disable no-console */
import styled from 'styled-components'
import useChatRooms from 'hooks/useChatRooms'
import ChatItemSkeleton from 'components/auth/skeleton'
import ChatItemComponent from 'components/auth/ChatItemComponent'
import { ChatRoomWithUser } from 'types/chat'

export const ChatListWrapper = styled.ul`
    max-height: calc(100vh - 150px);
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

    return (
        <ChatListWrapper>
            {isLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                      <ChatItemSkeleton key={(i + 1).toString()} />
                  ))
                : data?.map((item) => {
                      const aaa = item as unknown as ChatRoomWithUser
                      return <ChatItemComponent key={item.roomId} {...aaa} />
                  })}
        </ChatListWrapper>
    )
}
