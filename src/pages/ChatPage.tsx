import MessageItem from 'components/chat/MessageItem'
import MessageRoom from 'components/chat/MessageRoom'
import ThereIsContent from 'components/chat/ThereIsContent'
import ThereIsNoContent from 'components/chat/ThereIsNoContent'
import useGetAccountInfo from 'hooks/useGetAccountInfo'
import { MouseEvent, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'

type CategoryProps = {
    selected: boolean
}
export type MyAccount = {
    data: AccountData
}
type AccountData = {
    accountId: number
    availableTime: string
    email: string
    field: string
    imgUrl: string
    introduction: string
    nickname: string
}
type MessageItemProps = {
    id?: string
    sender: string
    message: string
    time?: string
    avatar?: string
    email?: string
    createAt: string
}
type RoomState = {
    roomId: number
    roomName: string
    userData: AccountData
}
const ChatPageLayout = styled.div`
    display: flex;
    width: 1440px;
    height: calc(100vh - 80px);
    margin: 0 auto;
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
    unReadMessageCount?: number
    unreadMessageCount?: number
    latestChatMessage: null | string
    nickname: string
    lastSendMessageTime?: number | null
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
    const [roomState, setRoomState] = useState<RoomState>()
    const [chatList, setChatList] = useState<MessageItemProps[]>()
    const { data: accountData }: { data: MyAccount } = useGetAccountInfo()
    const [searchParams] = useSearchParams()
    const currentChatRoom = searchParams.get('id')

    const DOMAIN = import.meta.env.VITE_API_CHAT_END_POINT

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

    const handleChatTime = (roomName: string | number, time: number) => {
        const index = getRoomIndex(roomName)

        if (index !== -1) {
            const chatRoomCopy = [...chatRoom]
            chatRoomCopy[index].lastSendMessageTime = time
            setChatRoom(() => chatRoomCopy)
        }
    }

    const handleLastChat = (roomName: string, msg: string) => {
        const index = getRoomIndex(roomName)

        if (index !== -1) {
            const chatRoomCopy = [...chatRoom]
            chatRoomCopy[index].latestChatMessage = msg
            setChatRoom(chatRoomCopy)
        }
    }

    const handleChatRoomDelete = (roomId: number) => {
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
        handleChatTime(roomName, chatRoomCopy[index].lastSendMessageTime)
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
    console.log(chatRoom, '챗룸')

    useEffect(() => {
        getChatRooms()
    }, [])

    useEffect(() => {
        if (currentChatRoom) {
            fetch(`${DOMAIN}/chat-service/chat/${currentChatRoom}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Access_Token: token,
                },
            })
                .then((res) => res.json())
                .then((json) => {
                    setChatList(() => json.chatList)
                    setRoomState(() => {
                        return {
                            roomId: json.roomId,
                            roomName: json.roomName,
                            userData: json.userData,
                        }
                    })
                })
        }
    }, [searchParams])

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
                    myAccount={accountData}
                    roomState={roomState}
                    conversationList={chatList}
                    handleChatRoomDelete={handleChatRoomDelete}
                    handleLastChat={handleLastChat}
                    handleChatTime={handleChatTime}
                    setRoomState={setChatList}
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
