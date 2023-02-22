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

const dummydata = [
    {
        roomId: 1,
        roomName: '나나나',
        chatList: [{}],
        unReadMessageCount: 3,
        latestChatMessage: '상돈',
        nickname: '배그',
    },
    {
        roomId: 2,
        roomName: '바바바',
        chatList: [{}],
        unReadMessageCount: 0,
        latestChatMessage: '상돈',
        nickname: '복승',
    },
    {
        roomId: 3,
        roomName: '두두두',
        chatList: [{}],
        unReadMessageCount: 4,
        latestChatMessage: '상돈',
        nickname: '두릅',
    },
]

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

// todo: 챗 룸에 들어오면 방정보 (채팅내역)을 불러 오는데 여기에 더하여 유저의 정보도 필요하다.
function ChatPage() {
    const [AllMessage, setAllMessage] = useState(true)
    const [chatRoom, setChatRoom] = useState<ChatRoomType[]>([])
    const [searchParams] = useSearchParams()
    const currentChatRoom = searchParams.get('id')

    const DOMAIN = `http://121.180.179.245:8000`

    // const currentChatMessage =
    //     (AllMessage && dummydata?.length >= 1 && dummydata) ||
    //     dummydata.filter((chat) => chat.unReadMessageCount >= 1)

    // const hadleUnReadChat = (roomName: string) => {
    //     const index = dummydata.findIndex((room) => room.roomName === roomName)
    //     const target = dummydata.find((room) => {
    //         return room.roomName === roomName
    //     })

    //     if (target.unReadMessageCount >= 1) {
    //         target.unReadMessageCount = 0
    //         dummydata.splice(index, 1, target)
    //         // setChatRoom(chatRoom)
    //         setAllMessage(() => true)
    //     }
    // }
    const currentChatMessage =
        (AllMessage && chatRoom?.length >= 1 && chatRoom) ||
        chatRoom?.filter((chat) => chat.unReadMessageCount >= 1)

    const deleteChatRoomRequest = (roomId: number) => {
        const index = chatRoom.findIndex((room) => room.roomId === roomId)

        chatRoom.splice(index, 1)
        setChatRoom(() => chatRoom)
    }

    const hadleUnReadChat = (roomName: string) => {
        const index = chatRoom.findIndex((room) => room.roomName === roomName)
        const target = chatRoom.find((room) => {
            return room.roomName === roomName
        })

        if (target.unReadMessageCount >= 1) {
            target.unReadMessageCount = 0
            dummydata.splice(index, 1, target)
            setChatRoom(() => chatRoom)
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
                <MessageRoom deleteFn={deleteChatRoomRequest} />
            ) : !currentChatRoom && currentChatMessage?.length ? (
                <ThereIsContent />
            ) : (
                <ThereIsNoContent />
            )}
        </ChatPageLayout>
    )
}

export default ChatPage
