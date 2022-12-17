import { useCallback, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ChatListComponent from './ChatListComponent'
import {
    ChatCount,
    ChatSectionHeader,
    ChatSectionWrapper,
    CreateChatButton,
} from './index.style'
import CreateChatModal from './modal/ChatModalComponent'

export default function ChatSection() {
    const [open, setOpen] = useState(false)
    const location = useLocation()

    const onClose = useCallback(() => {
        setOpen(false)
    }, [])

    return (
        <>
            <ChatSectionWrapper home={location.pathname === '/'}>
                <ChatSectionHeader>
                    <ChatCount>안 읽은 대화 </ChatCount>
                    <CreateChatButton
                        onClick={() => setOpen(true)}
                        default
                        name="새로운 메세지"
                    />
                </ChatSectionHeader>
                <ChatListComponent />
            </ChatSectionWrapper>
            {open && <CreateChatModal open={open} onClose={onClose} />}
        </>
    )
}
