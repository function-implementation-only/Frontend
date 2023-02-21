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

const MessageList = styled.ul``

export type ChatRoomType = {
    roomId: number
    roomName: string
    chatList: null | object[]
    unReadMessageCount: number | boolean
    latestChatMessage: null | string
    nickname: string
}

const chats = [
    {
        roomId: 113,
        roomName: 'string',
        chatList: [{}],
        unReadMessageCount: false,
        latestChatMessage: 'fadsadfsfsadfsdafasfsfsadfasfasdfasfasdf',
        nickname: 'string',
    },
    {
        roomId: 114,
        roomName: 'string',
        chatList: [{}],
        unReadMessageCount: true,
        latestChatMessage: 'fadsadfsfsadfsdafasfsfsadfasfasdfasfasdf',
        nickname: '감자',
    },
    {
        roomId: 115,
        roomName: 'string',
        chatList: [{}],
        unReadMessageCount: true,
        latestChatMessage: 'fadsadfsfsadfsdafasfsfsadfasfasdfasfasdf',
        nickname: '솜사탕',
    },
]

type ChatRoomResponse = {
    content: ChatRoomType[]
    first: boolean
    last: boolean
    totalPages: number
}

export type ChatPartnerType = {
    name: string
    time: string
    power: string
}

const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxcTJ3M2U0ciIsImV4cCI6MTY3Njg4ODE0OSwiaWF0IjoxNjc2ODAxNzQ5fQ.GGLogzGnouBOjo4OHcwOPzQ_AvQzJpfDL6u24QBNAFM'

// todo: 챗 룸에 들어오면 방정보 (채팅내역)을 불러 오는데 여기에 더하여 유저의 정보도 필요하다.
// 클릭으로 데이터를 넘기다 보면 url 입력이나 링크 이동시에 필요한 정보가 없을 수 있으므로
// 채팅에 참여하는 유저는 채팅 페이지에서 받아온 데이터를 사용해야 한다. (는게 내 생각)
// 이러기 위해서는 채팅방을 생성할 당시에 참여자 모두에 대한 정보를 서버로 보내주어야 한다.(는게 내생각)
function ChatPage() {
    const [AllMessage, setAllMessage] = useState(true)
    const [chatRoom, setChatRoom] = useState<ChatRoomType[]>([])
    const [searchParams] = useSearchParams()
    const currentChatRoom = searchParams.get('id')
    const DOMAIN = `http://61.77.108.167:8000`

    // Todo: 아래 콘솔 로그 지워야합니다. 빨간줄 없애기용
    console.log(chatRoom)

    // Fixme: 아래 chats 를 chatRoom 으로 바꾸어야 함니다.
    const currentChatMessage =
        (AllMessage && chats.length >= 1 && chats) ||
        chats.filter((chat) => chat.unReadMessageCount === true)

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
        // console.log(roomdata)  lastmessage, nickname, roomid, content[]
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
                    {/* //Todo: 아래 currentChatMessage? 를 chatRoom 으로 바꾸어야합니다. chats 는 더미데이터 */}
                    {currentChatMessage?.map((room: any) => (
                        <MessageItem data={room} key={room.roomName} />
                    ))}
                </MessageList>
            </ChatListRow>
            {currentChatRoom ? (
                <MessageRoom />
            ) : !currentChatRoom && currentChatMessage.length ? (
                <ThereIsContent />
            ) : (
                <ThereIsNoContent />
            )}
        </ChatPageLayout>
    )
}

export default ChatPage
