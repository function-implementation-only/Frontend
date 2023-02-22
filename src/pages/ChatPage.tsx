import MessageItem from 'components/chat/MessageItem'
import MessageRoom from 'components/chat/MessageRoom'
import ThereIsContent from 'components/chat/ThereIsContent'
import ThereIsNoContent from 'components/chat/ThereIsNoContent'
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
    padding-right: 10px;
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
const UnSetButton = styled.div`
    all: unset;
`

const MessageList = styled.ul``

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
const token = localStorage.getItem('token')
function ChatPage() {
    const [AllMessage, setAllMessage] = useState(true)
    const [chatRoom, setChatRoom] = useState<ChatRoomType[]>([])
    const [searchParams] = useSearchParams()
    const currentChatRoom = searchParams.get('id')

    const DOMAIN = `http://121.180.179.245:8000`

    const currentChatMessage =
        (AllMessage && chatRoom?.length >= 1 && chatRoom) ||
        chatRoom?.filter((chat) => chat.unReadMessageCount >= 1)

    const getRoomIndex = (data: number | string) => {
        let index: number

        switch (typeof data) {
            case 'number':
                index = chatRoom.findIndex((room) => room.roomId === data)
                break
            case 'string':
                index = chatRoom.findIndex((room) => room.roomName === data)
                break
            default:
                index = -1
        }
        return index
    }

    const lastMessageModifie = (roomName: string, msg: string) => {
        const index = getRoomIndex(roomName)

        if (index !== -1) {
            const chatRoomCopy = [...chatRoom]
            chatRoomCopy[index].latestChatMessage = msg
            setChatRoom(() => chatRoomCopy)
        }
    }

    const deleteChatRoomRequest = (roomId: number) => {
        const index = getRoomIndex(roomId)

        if (index !== -1) {
            const chatRoomCopy = [...chatRoom]
            chatRoomCopy.splice(index, 1)
            setChatRoom(() => chatRoomCopy)
        }
    }

    const hadleUnReadChat = (roomName: string) => {
        const index = getRoomIndex(roomName)
        const chatRoomCopy = [...chatRoom]
        let target

        if (index !== -1) {
            target = chatRoomCopy.find((room) => {
                return room.roomName === roomName
            })
        }

        if (target.unReadMessageCount >= 1) {
            target.unReadMessageCount = 0
            chatRoomCopy.splice(index, 1, target)
            setChatRoom(() => chatRoomCopy)
            setAllMessage(() => true)
        }
    }

    function setMessageState(e: MouseEvent<HTMLButtonElement>) {
        const text = (e.target as HTMLElement).textContent

        if (text === '전체') setAllMessage(() => true)
        else setAllMessage(() => false)
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
                    {currentChatMessage?.map((room) => (
                        <UnSetButton
                            key={room.roomId}
                            onClick={() => hadleUnReadChat(room.roomName)}
                        >
                            <MessageItem data={room} />
                        </UnSetButton>
                    ))}
                </MessageList>
            </ChatListRow>
            {currentChatRoom ? (
                <MessageRoom
                    deleteFn={deleteChatRoomRequest}
                    lastChatModifie={lastMessageModifie}
                />
            ) : !currentChatRoom && currentChatMessage?.length ? (
                <ThereIsContent />
            ) : (
                <ThereIsNoContent />
            )}
        </ChatPageLayout>
    )
}

export default ChatPage
