import React from 'react'
import styled from 'styled-components'

const MessageRow = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`
const ChatListBox = styled.div`
    width: 400px;
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const ChatListIconBox = styled.div`
    height: 78px;
    width: 342px;
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
    margin-top: 2px;
    margin-right: 5px;
`
const ChatListParagraph = styled.p`
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    color: #333333;
    margin-bottom: 8px;
`

const ChatListContentParagraph = styled.p`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
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
                        width="42"
                        height="42"
                        viewBox="0 0 42 42"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M18.0025 24.1448L38.0425 4.10477M18.246 24.7709L23.2619 37.669C23.7038 38.8053 23.9248 39.3734 24.2431 39.5393C24.5191 39.6831 24.8479 39.6833 25.124 39.5398C25.4425 39.3743 25.6642 38.8065 26.1074 37.6707L38.6855 5.43924C39.0856 4.41399 39.2857 3.90137 39.1762 3.57381C39.0812 3.28934 38.858 3.06609 38.5735 2.97106C38.2459 2.86163 37.7333 3.06168 36.708 3.46178L4.47656 16.0399C3.34082 16.4831 2.77295 16.7047 2.60746 17.0233C2.464 17.2994 2.46419 17.6282 2.60798 17.9042C2.77384 18.2225 3.34197 18.4435 4.47823 18.8853L17.3764 23.9013C17.607 23.991 17.7223 24.0358 17.8195 24.1051C17.9055 24.1665 17.9808 24.2418 18.0422 24.3278C18.1115 24.4249 18.1563 24.5403 18.246 24.7709Z"
                            stroke="#FF9C30"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
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
