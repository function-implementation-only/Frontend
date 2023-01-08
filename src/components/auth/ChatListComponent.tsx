import styled from 'styled-components'
import { ChatRoomWithUser } from 'src/types/chat'
import useChatRooms from 'hooks/useChatRooms'
import ChatItemSkeleton from 'components/auth/skeleton'
import ChatItemComponent from 'components/auth/ChatItemComponent'

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
    const { data: chatRooms, isLoading } = useChatRooms()

    return (
        <ChatListWrapper>
            {isLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                      <ChatItemSkeleton key={(i + 1).toString()} />
                  ))
                : chatRooms?.data?.data?.map(
                      (_item: JSX.IntrinsicAttributes & ChatRoomWithUser) => (
                          <ChatItemComponent key={_item.roomId} {..._item} />
                      )
                  )}
        </ChatListWrapper>
    )
}
