import { useState } from 'react'
import MugSaucerSvg from '../../../assets/mug-saucer.svg'
import LauncherChatBoxLayout from './LauncherChatBox.Styled'
import LauncherModal from './LauncherModal'

export default function LauncherChatBox() {
    const [showChatModal, setShowChatModal] = useState(false)

    const activeChatModal = () => {
        setShowChatModal((open) => !open)
    }
    if (showChatModal) {
        return (
            <LauncherChatBoxLayout>
                <div className="launcher-button-wrapper">
                    <div className="launcher-button-wrapper-child">
                        <div className="launcher-button-logo">
                            <MugSaucerSvg />
                        </div>
                        <div
                            onClick={activeChatModal}
                            aria-hidden="true"
                            className="launcher-wrapper"
                        >
                            <span className="launcher-title">
                                채팅 내용이 있을 때
                            </span>
                            <div className="launcher-content-grid">
                                <div className="launcher-error" />
                                <div className="launcher-text">
                                    현재 대기중인 채팅?
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LauncherChatBoxLayout>
        )
    }

    return <LauncherModal showChatModal setShowChatModal={setShowChatModal} />
}
