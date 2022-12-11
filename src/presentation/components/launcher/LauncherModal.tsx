import styled from 'styled-components'
import { useCallback, useEffect, useRef } from 'react'
import ChatMessage from './Message'
import Write from './write'
import useChatConnect from '../../useChatConnect'

const ChatModal = styled.div`
    position: fixed;
    z-index: 10;
    display: block;
    flex-wrap: nowrap;
    bottom: 20px;
    right: 20px;
    height: 500px;
    background-color: #ebebeb;
    border: #979797;

    .chat-modal-grid {
        width: 480px;
    }

    .chat-modal-contents {
        text-align: right;
    }

    .chat-modal-btn {
        border: none;
        border-radius: 5px;
        padding: 1% 2%;
        background-color: rgba(0, 0, 0, 0, 0.5);
        color: white;
        font-size: 1.2rem;
        font-weight: bolder;
        cursor: pointer;
    }

    .chat-modal-btn:hover {
        background-color: #dadada;
    }

    .chat-body {
        display: flex;
    }
`
const ChatRoom = styled.div`
    display: flex;
`

export const ChatsBox = styled.div`
    width: 300px;
`

export const ChatRoomInfo = styled.div`
    border-bottom: 1px solid var(--gray-100);
    width: 180px;
`

export const BackButton = styled.div`
    cursor: pointer;
    display: none;
    height: 25px;
    margin-right: 1em;
    transition: color 200ms ease-out;
    &:hover {
        color: var(--primary);
    }
    @media (max-width: 735px) {
        display: flex;
    }
`

export const ChatContentsWrapper = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    animation: fadein 300ms ease-out;
    @keyframes fadein {
        from {
            transform: translateY(20%);
            opacity: 0;
        }
        to {
            transform: translateY(0%);
            opacity: 1;
        }
    }
    display: flex;
`
interface Props {
    showChatModal: boolean
    setShowChatModal: (bool: boolean) => void
}

function LauncherModal({
    showChatModal,
    setShowChatModal,
}: Props): JSX.Element {
    const modalRef = useRef(null)
    const { chats, onSendMessage } = useChatConnect('100')
    const me = {
        id: 100,
        name: '박경서',
        email: 'troublesome.dev@gmail.com',
        image: 'https://avatars.githubusercontent.com/u/45850400?v=4',
    }

    // TODO: API Response 추가 필요
    const data = [
        {
            name: 'Bot 1',
            email: 'bot@got.com',
        },
        {
            name: 'Bot 2',
            email: 'bot@got.com',
        },
        {
            name: 'Bot 3',
            email: 'bot@got.com',
        },
    ]

    const handleCloseChatModal = (e: { target: null }) => {
        if (modalRef.current === e.target) {
            setShowChatModal(false)
        }
    }

    const handleCloseChatModalEvent = useCallback(
        (e: { key: string }) => {
            if (e.key === 'Escape' && showChatModal) {
                setShowChatModal(true)
            }
        },
        [showChatModal, setShowChatModal]
    )

    useEffect(() => {
        document.addEventListener('keydown', handleCloseChatModalEvent)
        return () =>
            document.removeEventListener('keydown', handleCloseChatModalEvent)
    }, [handleCloseChatModalEvent])

    return (
        <ChatModal
            className="chat-modal"
            ref={modalRef}
            onClick={() => handleCloseChatModal}
        >
            <div className="chat-modal-grid">
                <div className="chat-modal-contents">
                    <button
                        type="button"
                        className="chat-modal-btn"
                        onClick={() => setShowChatModal(true)}
                    >
                        &#10005;
                    </button>
                </div>
                <ChatContentsWrapper>
                    <ChatRoom>
                        <ChatRoomInfo>
                            {data.map((d) => (
                                <p>
                                    {d.name} ({d.email})
                                </p>
                            ))}
                        </ChatRoomInfo>
                        <ChatsBox>
                            {chats.map((chat) => {
                                if (chat.id === me.id) {
                                    return (
                                        <ChatMessage key={chat.id} {...chat} />
                                    )
                                }
                                return <ChatMessage key={chat.id} {...chat} />
                            })}
                        </ChatsBox>
                    </ChatRoom>
                    <Write onSendMessage={onSendMessage} />
                </ChatContentsWrapper>
            </div>
        </ChatModal>
    )
}

export default LauncherModal
