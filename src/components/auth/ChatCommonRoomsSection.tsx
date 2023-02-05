import { useState } from 'react'
import styled from 'styled-components'
import ChatListComponent from './ChatListComponent'

const ChatCommonRoomsSectionWrapper = styled.section`
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

export default function ChatCommonRoomsSection() {
    const [choiceTab, setChoiceTab] = useState(0)

    return (
        <ChatCommonRoomsSectionWrapper>
            <CoffeeChatTab>
                <div
                    // tabIndex={0}
                    onClick={() => setChoiceTab(0)}
                    aria-hidden="true"
                    // role="button"
                    key={0}
                    className={`chat-grid ${choiceTab === 0 && 'action'}`}
                >
                    <span>전체</span>
                </div>
                <div
                    // tabIndex={0}
                    onClick={() => setChoiceTab(1)}
                    aria-hidden="true"
                    key={1}
                    className={`chat-grid ${choiceTab === 1 && 'action'}`}
                >
                    <span>안 읽음</span>
                </div>
            </CoffeeChatTab>
            <ChatListComponent />
        </ChatCommonRoomsSectionWrapper>
    )
}
