import React from 'react'
import styled from 'styled-components'

const MessageRow = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`
const ChatListBox = styled.div`
    width: 340px;
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const ChatListIconBox = styled.div`
    height: 78px;
    width: 340px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
`
const ChatListCircle = styled.div`
    border: 5px solid #ff9c30;
    border-radius: 50%;
    width: 78px;
    height: 78px;
`

const ChatListIcon = styled.svg`
    position: absolute;
    margin-bottom: 5px;
    margin-left: 4px;
    rotate: -45deg;
`
const ChatListParagraph = styled.p`
    font-weight: 700;
    font-size: 24px;
    line-height: 28.8px;
    margin-bottom: 8px;
`

const ChatListContentParagraph = styled.p`
    line-height: 23px;
    color: var(--gray-700);
`

function ThereIsContent() {
    return (
        <MessageRow>
            <ChatListBox>
                <ChatListIconBox>
                    <ChatListCircle />
                    <ChatListIcon
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        preserveAspectRatio="xMidYMid meet"
                        width={50}
                        height={50}
                        color="#ff9c30"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                        />
                    </ChatListIcon>
                </ChatListIconBox>

                <ChatListParagraph>메세지 선택하기</ChatListParagraph>
                <ChatListContentParagraph>
                    기존 대화에서 선택하거나 새로운 대화를 시작해보세요
                </ChatListContentParagraph>
            </ChatListBox>
        </MessageRow>
    )
}

export default ThereIsContent
