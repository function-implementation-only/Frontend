import styled from 'styled-components'
import { useCallback, useEffect, useRef } from 'react'

const ChatModal = styled.div`
    position: fixed;
    z-index: 10;
    display: block;
    flex-wrap: nowrap;
    bottom: 20px;
    right: 20px;
    height: 500px;
    background-color: red;

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
        background-color: #808080;
    }
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
            </div>
        </ChatModal>
    )
}

export default LauncherModal
