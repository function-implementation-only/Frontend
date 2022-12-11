import { useState } from 'react'
import styled from 'styled-components'
import MugSaucerSvg from '../../../assets/mug-saucer.svg'
import LauncherModalComponent from './LauncherModalComponent'

const LauncherChatBoxLayout = styled.div`
    :hover {
        box-shadow: rgb(255 255 255 / 5%) 0px 0px 2px 0px inset,
            rgb(0 0 0 / 5%) 0px 0px 2px 1px, rgb(0 0 0 / 5%) 0px 4px 20px;
        border-radius: 22px;
    }

    position: fixed;
    z-index: 10;
    display: block;
    flex-wrap: nowrap;
    width: auto;
    overflow: visible;
    background: transparent;
    bottom: 20px;
    right: 20px;

    .launcher-button-wrapper {
        position: relative;
        -webkit-box-pack: center;
        justify-content: center;
        max-width: 520px;
        margin: 0px auto;
        overflow: visible;
        transition-timing-function: cubic-bezier(0.24, 0.06, 0, 0.97);
        transition-duration: 500ms;
        transition-property: transform, opacity;
        animation: 500ms cubic-bezier(0.24, 0.06, 0, 0.97) 0.55s 1 normal
            backwards running fkfYNj;
    }

    .launcher-button-wrapper-child {
        box-shadow: rgb(255 255 255 / 12%) 0px 0px 2px 0px inset,
            rgb(0 0 0 / 5%) 0px 0px 2px 1px, rgb(0 0 0 / 22%) 0px 4px 20px;
        position: relative;
        box-sizing: border-box;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        width: 320px;
        padding: 10px;
        cursor: pointer;
        background: linear-gradient(
            to left,
            rgba(255, 255, 255, 0.9),
            rgb(255, 255, 255)
        );
        backdrop-filter: blur(30px);
        border-radius: 22px;
    }

    .launcher-button-logo {
        position: relative;
        width: 42px;
        height: 42px;
        display: flex;
        justify-content: center;
    }

    .launcher-wrapper {
        max-width: 100%;
        margin: 0px 10px 0px 12px;
        overflow: hidden;

        .launcher-title {
            letter-spacing: -0.1px;
            padding-left: 2px;
            overflow: hidden;
            font-weight: bold;
            color: rgba(0, 0, 0, 0.85);
            font-size: 16px;
            line-height: 22.4px;
            text-align: left;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .launcher-content-grid {
            letter-spacing: -0.1px;
            margin-left: 2px;
            overflow: hidden;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.4);
            font-size: 13px;
            line-height: 18.2px;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: flex;
            white-space: nowrap;

            .launcher-error {
                width: 16px;
                height: 16px;
                content: '';
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 477.867 477.867'%3E%3Cpath d='M238.933 0C106.974 0 0 106.974 0 238.933s106.974 238.933 238.933 238.933 238.933-106.974 238.933-238.933C477.726 107.033 370.834.141 238.933 0zm0 443.733c-113.108 0-204.8-91.692-204.8-204.8s91.692-204.8 204.8-204.8 204.8 91.692 204.8 204.8c-.122 113.058-91.742 204.678-204.8 204.8z'/%3E%3Cpath d='M370.046 141.534c-6.614-6.388-17.099-6.388-23.712 0l-158.601 158.6-56.201-56.201c-6.548-6.78-17.353-6.967-24.132-.419-6.78 6.548-6.967 17.353-.419 24.132.137.142.277.282.419.419l68.267 68.267c6.664 6.663 17.468 6.663 24.132 0l170.667-170.667c6.548-6.779 6.36-17.583-.42-24.131z'/%3E%3C/svg%3E");
                background-size: cover;
            }

            .launcher-text {
                letter-spacing: -0.1px;
                margin-left: 2px;
                overflow: hidden;
            }
        }
    }
`

export default function LauncherChatComponent() {
    const [showChatModal, setShowChatModal] = useState(true)

    const activeChatModal = () => {
        setShowChatModal((open) => !open)
    }

    if (showChatModal) {
        return (
            <LauncherChatBoxLayout>
                <div
                    className="launcher-button-wrapper"
                    onClick={activeChatModal}
                    aria-hidden="true"
                >
                    <div className="launcher-button-wrapper-child">
                        <div className="launcher-button-logo">
                            <MugSaucerSvg />
                        </div>
                        <div className="launcher-wrapper">
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

    return (
        <LauncherModalComponent
            showChatModal
            setShowChatModal={setShowChatModal}
        />
    )
}
