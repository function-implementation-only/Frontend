import { useState } from 'react'
import styled from 'styled-components'
import ChatListComponent from './ChatListComponent'

const ChatUserSectionWrapper = styled.section`
    border-right: 1px solid var(--gray-100);
    min-width: 350px;
    position: relative;
`

const CoffeeChatTab = styled.div`
    width: 100%;
    font-size: 0.9rem;
    color: #b0b0b0;
    display: flex;
    text-align: center;
    font-size: 16px;

    .chat-grid {
        width: 50%;
        padding: 1em;
    }

    .action {
        font-weight: bold;
        border-bottom: 2px solid #ffc078;
        color: #212529;
    }
`

export default function ChatUserSection() {
    const [choiceTab, setChoiceTab] = useState(0)
    const [chatList, setChatList] = useState([])

    // choiceTab !== 1 초기화
    if (choiceTab === 1) {
        const chatSorting = chatList.filter(
            (chat: any) => chat.unreadCount === 0
        )
        setChatList(chatSorting)
    }

    return (
        <ChatUserSectionWrapper>
            <CoffeeChatTab>
                <div
                    tabIndex={0}
                    onClick={() => setChoiceTab(0)}
                    aria-hidden="true"
                    role="button"
                    key={0}
                    className={`chat-grid ${choiceTab === 0 && 'action'}`}
                >
                    <span>전체</span>
                </div>
                <div
                    tabIndex={0}
                    onClick={() => setChoiceTab(1)}
                    aria-hidden="true"
                    role="button"
                    key={1}
                    className={`chat-grid ${choiceTab === 1 && 'action'}`}
                >
                    <span>안 읽음</span>
                </div>
            </CoffeeChatTab>
            <ChatListComponent />
        </ChatUserSectionWrapper>
    )
}
