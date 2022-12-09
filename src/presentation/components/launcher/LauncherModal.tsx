import styled from 'styled-components'
import { useCallback, useEffect, useRef } from 'react'
import ChevronLeft from '../../../assets/icons/chevron-left'
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

export const ChatsBox = styled.div`
    padding: 1rem;
    max-height: 65vh;
    overflow: auto;
`

export const BackButton = styled(ChevronLeft)`
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

interface Props {
    showChatModal: boolean
    setShowChatModal: (bool: boolean) => void
}
export const ChatRoomInfo = styled.div`
    padding: 1rem;
    height: 80px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--gray-100);
    font-weight: 600;
    @media (max-width: 735px) {
        height: 60px;
    }
`
export const ChatContentsWrapper = styled.section`
    position: relative;
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
`

function LauncherModal({
    showChatModal,
    setShowChatModal,
}: Props): JSX.Element {
    const modalRef = useRef(null)

    const closeChatModal = (e: { target: null }) => {
        if (modalRef.current === e.target) {
            setShowChatModal(false)
        }
    }

    const closeChatModalEvent = useCallback(
        (e: { key: string }) => {
            if (e.key === 'Escape' && showChatModal) {
                setShowChatModal(true)
            }
        },
        [showChatModal, setShowChatModal]
    )

    useEffect(() => {
        document.addEventListener('keydown', closeChatModalEvent)
        return () =>
            document.removeEventListener('keydown', closeChatModalEvent)
    }, [closeChatModalEvent])

    const moveHome = () => console.log('asd')

    const data = {
        name: 'sp',
        email: 'aa',
    }
    const { chats, onSendMessage } = useChatConnect('100')

    return (
        <ChatModal
            id="chat-modal"
            ref={modalRef}
            onClick={() => closeChatModal}
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
                    <ChatRoomInfo>
                        <BackButton onClick={moveHome} />
                        {data && (
                            <p>
                                {data.name} ({data.email})
                            </p>
                        )}
                    </ChatRoomInfo>
                    <ChatsBox>
                        {chats.map((chat) => (
                            <ChatMessage key={chat?.id} {...chat} />
                        ))}
                    </ChatsBox>
                    <Write onSendMessage={onSendMessage} />
                </ChatContentsWrapper>
            </div>
        </ChatModal>
    )
}

export default LauncherModal
