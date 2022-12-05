import { useState } from 'react';
import MugSaucerSvg from '../../../assets/mug-saucer.svg';
import { LauncherChatBoxLayout } from './LauncherChatBox.Styled';
import LauncherModal from './LauncherModal';

export default function LauncherChatBox() {
    const [showChatModal, setShowChatModal] = useState(false);
    
    const activeChatModal = () => {
        setShowChatModal((open) => !open);
    }
    return (
      <>
        {showChatModal ? 
            <LauncherChatBoxLayout>
                <div className="launcher-button-wrapper">
                    <div className="launcher-button-wrapper-child">
                        <div className="launcher-button-logo">
                            <MugSaucerSvg />
                        </div>
                        <div className="launcher-wrapper" onClick={activeChatModal}>
                            <div className="launcher-title">채팅 내용이 있을 때</div>
                            <div className="launcher-content-grid">
                                <div className="launcher-error"></div>
                                <div className="launcher-text">현재 대기중인 채팅?</div>
                            </div>
                        </div>
                    </div>
                </div>
            </LauncherChatBoxLayout>
        : 
            <div>
                <LauncherModal showChatModal={showChatModal} setShowChatModal={setShowChatModal} />
            </div>
        }
      </>
    );
}
