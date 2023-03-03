import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useSearchParams, useNavigate } from 'react-router-dom'
import ChatText from 'components/chat/ChatText'
import useModal from 'hooks/useModal'
import SockJS from 'sockjs-client'
import { Client, Message, Subscription, over } from 'stompjs'
import { MyAccount } from 'pages/ChatPage'
import ChatCloseModal from './ChatCloseModal'
import Imoji from './Imoji'

// TODO: 아래 타입 데이터는 중복데이터임 한곳에서 관리하면 좋을듯.

type ChatFriendsData = {
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
    userData: ChatFriendsData
}

const UserInfoRow = styled.div`
    min-height: 72px;
    width: 1124px;
    border-bottom: 2px RGB(234, 234, 234) solid;
    display: flex;
    align-items: center;
`
const UserBox = styled.div`
    display: flex;
    align-items: center;
    width: 992px;
    height: 21px;
    gap: 10px;
    justify-content: start;
`

const Avatar = styled.img`
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-left: 16px;
    margin-right: 16px;
`
const UserInfoText = styled.span`
    color: #333333;
    h2 {
        font-weight: 700;
    }
    p {
        font-weight: 400;
    }
`
const TextContentRow = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 12px;
    overflow-x: hidden;
    overflow-y: scroll;
`

const ChatInputRow = styled.form`
    width: 1124;
    min-height: 88px;
    display: flex;
    aligin-items: center;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: auto;
`
const ChatInput = styled.input`
    width: 984px;
    height: 40px;
    border-radius: 10px;
    background: #f0f0f0;
    border: none;
    padding-left: 12px;

    &:focus {
        outline: none;
    }
`

const MessageRoomLayOut = styled.div`
    width: 1124px;
    heigth: 1000px;
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
`

const SmileIcon = styled.svg`
    width: 20px;
    height: 20px;
    cursor: pointer;
`
const ImojiBox = styled.div`
    position: relative;
`

const TrashCanIcon = styled(SmileIcon)`
    width: 30px;
    color: #b0b0b0;
    margin-left: auto;
    margin-right: 16px;
`

const AddPictureIcon = styled(SmileIcon)``

const SubmitButtonIcon = styled.label`
    background: transparent;
    cursor: pointer;
`

const ChatInitMessage = styled.span`
    background: #f8f9fa;
    align-items: center;
    padding: 9px 14px;
    border-radius: 10px;
    font-family: 'Pretendard';
    margin-bottom: 16px;
    align-self: center;
`

type PropTypes = {
    myAccount: MyAccount
    roomState: RoomState
    conversationList: MessageItemProps[]
    setRoomState: Dispatch<SetStateAction<MessageItemProps[]>>
    handleChatRoomDelete: (roomId: number) => void
    handleLastChat: (roomName: string, msg: string) => void
    handleChatTime: (roomName: string | number, time: number) => void
}

const token = localStorage.getItem('token')
let client: Client
function MessageRoom({
    myAccount,
    roomState,
    conversationList,
    handleChatRoomDelete,
    handleLastChat,
    handleChatTime,
    setRoomState,
}: PropTypes) {
    const [subscribtion, setSubscribtion] = useState<Subscription>(null)
    const { isShowing: imojiShowing, handleShowing: imojiHandle } = useModal()
    const { isShowing, handleShowing } = useModal()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const inputRef = useRef<HTMLInputElement>(null)
    const textContentRef = useRef<HTMLDivElement>(null)

    const DOMAIN = import.meta.env.VITE_API_CHAT_END_POINT
    const accountData = myAccount
    const PARAM = searchParams.get('id')

    // 채팅방 삭제
    const deleteChatRoom = async () => {
        await fetch(`${DOMAIN}/chat-service/chat/${PARAM}`, {
            method: 'POST',
            headers: {
                Access_Token: localStorage.getItem('token'),
            },
        })

        handleChatRoomDelete(roomState.roomId)
        navigate('/chat')
    }

    const handleAfterMessageSend = (message: string) => {
        console.log(roomState?.roomName, ' 함수안쪽 룸네임')
        handleLastChat(roomState?.roomName, message)
        handleChatTime(roomState?.roomId, new Date().getTime())
    }

    // 채팅방 스크롤 최하단 이동
    const scrollControll = () => {
        const textContent = textContentRef.current
        textContent.scrollTop = textContent.scrollHeight
    }

    // 채팅 발송
    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault()
        if (inputRef.current.value === '') return

        client.send(
            '/pub/chat',
            {
                Access_Token: token,
            },
            JSON.stringify({
                roomId: roomState.roomId,
                sender: accountData?.data.email,
                message: inputRef.current.value,
            })
        )
        // handleAfterMessageSend(inputRef.current.value)
        inputRef.current.value = ''
    }

    const hadleLastMessage = (message: string) => {
        handleAfterMessageSend(message)
    }

    // 메세지 수신시
    function onSubscrib(messages: Message) {
        const body: MessageItemProps = JSON.parse(messages.body)
        // setRoomState((prev) => {
        //     return [
        //         ...prev,
        //         {
        //             message: body.message,
        //             sender: body.sender,
        //             id: `${Math.random()}`,
        //             createAt: `${new Date().toISOString()}`,
        //         },
        //     ]
        // })
        // handleAfterMessageSend(body.message)
        console.log(roomState?.roomName, '메세지 수신시 룸네임')
        hadleLastMessage(body.message)
        scrollControll()
    }

    useEffect(() => {
        scrollControll()
    }, [conversationList])

    // 웹소켓 구독
    const connectCallback = () => {
        console.log(roomState, '커넥션 콜백')
        const sub: Subscription = client.subscribe(
            `/sub/chatroom/${PARAM}`,
            onSubscrib
        )
        setSubscribtion(sub)
    }

    // 웹소켓 연결
    useEffect(() => {
        const endPoint = new SockJS(`${DOMAIN}/chat-service/ws`)
        client = over(endPoint)
        client.connect({ Access_Token: token }, connectCallback)

        return () => {
            subscribtion?.unsubscribe()
        }
    }, [searchParams])

    return (
        <MessageRoomLayOut>
            <UserInfoRow>
                <Avatar src={roomState?.userData?.imgUrl} />
                <UserBox>
                    <UserInfoText>
                        <h2>{roomState?.userData?.nickname}</h2>
                    </UserInfoText>
                    |
                    <UserInfoText>
                        <p>{roomState?.userData?.field}</p>
                    </UserInfoText>
                    |
                    <UserInfoText>
                        <p>{roomState?.userData?.availableTime}</p>
                    </UserInfoText>
                </UserBox>
                <TrashCanIcon
                    onClick={handleShowing}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                </TrashCanIcon>
            </UserInfoRow>
            <TextContentRow ref={textContentRef}>
                <ChatInitMessage>
                    {roomState?.userData?.nickname}님 과의 대화를 시작합니다.
                </ChatInitMessage>
                {conversationList?.map((chat, index, arr) => {
                    const isMine = chat.sender === accountData?.data?.email
                    const isStart = index === 0 && index > -1
                    const isRepeat =
                        index > 0 && arr[index - 1].sender === chat.sender

                    return (
                        <ChatText
                            key={chat.id}
                            avatarAddr={roomState?.userData?.imgUrl}
                            avatar={!isMine && (isStart || !isRepeat)}
                            message={chat.message}
                            sender={
                                isMine
                                    ? accountData?.data?.nickname
                                    : roomState?.userData?.nickname
                            }
                            createAt={chat.createAt}
                            side={isMine}
                        />
                    )
                })}
            </TextContentRow>
            <ChatInputRow onSubmit={submitHandler}>
                <AddPictureIcon
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    color="#ff9c30"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                </AddPictureIcon>
                <ImojiBox>
                    <SmileIcon
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        color="#ff9c30"
                        onClick={imojiHandle}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                        />
                    </SmileIcon>
                    <Imoji
                        inputRef={inputRef}
                        isShowing={imojiShowing}
                        handleShowing={imojiHandle}
                    />
                </ImojiBox>
                <ChatInput ref={inputRef} />

                <input
                    type="submit"
                    id="submitBtn"
                    style={{ display: 'none' }}
                />
                <SubmitButtonIcon htmlFor="submitBtn">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1"
                        stroke="currentColor"
                        // preserveAspectRatio="xMidYmid meet"
                        width={20}
                        height={20}
                        color="#ff9c30"
                        // transform="rotateZ(45deg)"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                        />
                    </svg>
                </SubmitButtonIcon>
            </ChatInputRow>

            <ChatCloseModal
                isShowing={isShowing}
                handleShowing={handleShowing}
                deleteRequest={deleteChatRoom}
            />
        </MessageRoomLayOut>
    )
}
export default MessageRoom

// Todo: 레이아웃에 패딩 왜있는거지?
