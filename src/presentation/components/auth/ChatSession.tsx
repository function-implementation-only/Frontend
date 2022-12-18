import { useLocation } from 'react-router-dom'
import ChatListComponent from './ChatListComponent'
import { ChatCount, ChatSectionHeader, ChatSectionWrapper } from './index.style'

export default function ChatSection() {
    const location = useLocation()

    return (
        <ChatSectionWrapper home={location.pathname === '/'}>
            <ChatSectionHeader>
                <ChatCount>안 읽은 대화 </ChatCount>
            </ChatSectionHeader>
            <ChatListComponent />
        </ChatSectionWrapper>
    )
}
