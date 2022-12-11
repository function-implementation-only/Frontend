import styled from 'styled-components'
import { useCallback, useEffect, useRef } from 'react'
import ChatMessage from './LauncherMessageComponent'
import LauncherWriteComponent from './LauncherWriteComponent'
import useChatConnect from '../../../hooks/useChatConnect.mooks'

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
    width: 480px;

    .chat-modal-contents {
        height: 40px;
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
    height: 340px;
`

const ChatsBox = styled.div`
    width: 300px;
`

const ChatRoomInfo = styled.div`
    border-bottom: 1px solid var(--gray-100);
    width: 180px;
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

function LauncherModalComponent({
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
            id: 1,
            name: 'Bot 1',
            email: 'bot@got.com',
        },
        {
            id: 2,
            name: 'Bot 2',
            email: 'bot@got.com',
        },
        {
            id: 3,
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
                            <p key={d.id}>
                                {d.name} ({d.email})
                            </p>
                        ))}
                    </ChatRoomInfo>
                    <ChatsBox>
                        {chats.map((chat) => {
                            const meFlag = chat.user.id === me.id
                            return (
                                <ChatMessage
                                    key={chat.id}
                                    me={meFlag}
                                    {...chat}
                                />
                            )
                        })}
                    </ChatsBox>
                </ChatRoom>
                <LauncherWriteComponent onSendMessage={onSendMessage} />
            </ChatContentsWrapper>
        </ChatModal>
    )
}

export default LauncherModalComponent
