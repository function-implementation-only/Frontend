import styled from 'styled-components'
import ChatListComponent from './ChatListComponent'

const ChatUserSectionWrapper = styled.section`
    border-right: 1px solid var(--gray-100);
    min-width: 350px;
    position: relative;
`

const ChatUserSectionHeader = styled.div`
    width: 100%;
    padding: 1em;
    border-bottom: 1px solid var(--gray-100);
    font-size: 0.9rem;
    color: var(--gray-500);
`

export default function ChatUserSection() {
    return (
        <ChatUserSectionWrapper>
            <ChatUserSectionHeader>안 읽은 대화</ChatUserSectionHeader>
            <ChatListComponent />
        </ChatUserSectionWrapper>
    )
}
