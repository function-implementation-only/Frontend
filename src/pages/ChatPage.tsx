import MessageItem from 'components/chat/MessageItem'
import MessageRoom from 'components/chat/MessageRoom'
import { MouseEvent, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'

type CategoryProps = {
    selected: boolean
}

const ChatPageLayout = styled.div`
    display: flex;
    width: 1440px;
    height: calc(100vh - 80px);
    margin: 0 auto;
    /* padding: 0 24px; */
`

const ChatListRow = styled.div`
    height: 100%;
    border-right: 2px solid rgba(51, 51, 51, 0.1);
`

const MessageRow = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const CategoryColumn = styled.div`
    display: flex;
`

const CategoryButton = styled.button<CategoryProps>`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    background-color: #fff;
    border: none;
    width: 150px;
    height: 74px;
    font-size: 18px;
    font-family: 'Pretendard';
    font-weight: ${(props) => props.selected && 'bold'};
    cursor: pointer;
    color: ${(props) => (props.selected ? '#333' : 'var(--gray-500)')};
    border-bottom: ${(props) =>
        props.selected && '3px solid var(--primary-color)'};
`

const MessageList = styled.ul`
    padding-right: 10px;
`

const ChatListBox = styled.div`
    width: 340px;
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

// const ChatListColumn = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
// `

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
    border: 2px solid #ff9c30;
    border-radius: 50%;
    width: 78px;
    height: 78px;
`

const ChatListIcon = styled.svg`
    transform: rotateZ(-45deg);
    position: absolute;
    margin-bottom: 5px;
    margin-left: 4px;
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

export type ChatRoomType = {
    roomId: number
    roomName: string
    chatList: null | object[]
    unReadMessageCount: number
    latestChatMessage: null | string
    nickname: string
}

type ChatRoomResponse = {
    content: ChatRoomType[]
    first: boolean
    last: boolean
    totalPages: number
}

const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJha3NrZmx3bkBnbWFpbC5jb20iLCJleHAiOjE2NzY3MDg5OTMsImlhdCI6MTY3NjYyMjU5M30.5h07nCZagQUfb4SvVssnOd6Ey7xQzuqEQNPdNt74VHg'

function ChatPage() {
    const [AllMessage, setAllMessage] = useState(true)
    const [chatRoom, setChatRoom] = useState<ChatRoomType[]>([])
    const [searchParams] = useSearchParams()
    const currentChatRoom = searchParams.get('id')
    const DOMAIN = `http://61.77.108.167:8000`

    // const changeCategoryHandler = () => setAllCategory()
    function setMessageState(e: MouseEvent<HTMLButtonElement>) {
        const text = (e.target as HTMLElement).textContent

        if (text === '전체') setAllMessage(true)
        else setAllMessage(false)
    }

    const getChatRooms = async () => {
        const response = await fetch(`${DOMAIN}/chat-service/chat/list`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Access_Token: token,
            },
        })
        const roomdata: ChatRoomResponse = await response.json()
        console.log(roomdata)
        // Todo: 아래리턴값 리턴 없애고 채팅방 이동으로 바꾸어야 함.
        setChatRoom(roomdata.content)
    }

    useEffect(() => {
        getChatRooms()
    }, [])

    return (
        <ChatPageLayout>
            <ChatListRow>
                <CategoryColumn>
                    <CategoryButton
                        onClick={setMessageState}
                        selected={AllMessage}
                    >
                        전체
                    </CategoryButton>
                    <CategoryButton
                        onClick={setMessageState}
                        selected={!AllMessage}
                    >
                        안 읽음
                    </CategoryButton>
                </CategoryColumn>
                <MessageList>
                    {chatRoom?.map((room) => (
                        <MessageItem key={room.roomName} data={room} />
                    ))}
                </MessageList>
            </ChatListRow>
            {!currentChatRoom ? (
                <MessageRow>
                    <ChatListBox>
                        <ChatListIconBox>
                            <ChatListCircle />
                            <ChatListIcon
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1"
                                stroke="currentColor"
                                preserveAspectRatio="xMidYMid meet"
                                width={50}
                                height={50}
                                color="#ff9c30"
                                style={{ rotate: '45deg' }}
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
            ) : (
                <MessageRoom />
            )}
        </ChatPageLayout>
    )
}

export default ChatPage
