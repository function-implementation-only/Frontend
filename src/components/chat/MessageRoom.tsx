import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useSearchParams, useNavigate } from 'react-router-dom'
import ChatText from 'components/chat/ChatText'
import useModal from 'hooks/useModal'
import SockJS from 'sockjs-client'
import { Client, Message, Subscription, over } from 'stompjs'
import { MyAccount } from 'pages/ChatPage'
import ChatCloseModal from './ChatCloseModal'
import Emoji from './emoji'

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
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 21px;
        text-transform: capitalize;
        color: #333333;
    }
    p {
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #333333;
    }
`
const TextContentRow = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 12px;
    overflow-x: hidden;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background: #ff9c30;
        border-radius: 3px;
    }
    ::-webkit-scrollbar-track {
        background: #f0f0f0;
    }
`

const ChatInputRow = styled.form`
    width: 1124;
    min-height: 88px;
    display: flex;
    align-items: center;
    position: relative;
    display: flex;
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
    height: 10;
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
`

const SmileIcon = styled.svg`
    cursor: pointer;
`
const EmojiBox = styled.div`
    position: relative;
`

const TrashCanIcon = styled(SmileIcon)`
    width: 30px;
    color: #b0b0b0;
    margin-left: auto;
    margin-right: 16px;
`

const AddPictureIcon = styled(SmileIcon)`
    margin-bottom: 1px;
`

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
    const [subscription, setSubscription] = useState<Subscription>(null)
    const [bodyMessage, setBodyMessage] = useState<string>('')
    const { isShowing: emojiShowing, handleShowing: emojiHandle } = useModal()
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
        handleLastChat(roomState?.roomName, message)
        handleChatTime(roomState?.roomId, new Date().getTime())
    }

    // 채팅방 스크롤 최하단 이동
    const scrollControl = () => {
        const textContent = textContentRef?.current || null
        if (textContent?.scrollHeight) {
            textContent.scrollTop = textContent.scrollHeight
        }
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
        inputRef.current.value = ''
    }

    // 메세지 수신시
    function onSubscribe(messages: Message) {
        const body: MessageItemProps = JSON.parse(messages.body)
        setRoomState((prev) => {
            return [
                ...prev,
                {
                    message: body.message,
                    sender: body.sender,
                    id: `${Math.random()}`,
                    createAt: `${new Date().toISOString()}`,
                },
            ]
        })
        setBodyMessage(body.message)
        scrollControl()
    }

    useEffect(() => {
        handleAfterMessageSend(bodyMessage)
    }, [bodyMessage])

    useEffect(() => {
        scrollControl()
    }, [conversationList])

    // 웹소켓 구독
    const connectCallback = () => {
        const sub: Subscription = client.subscribe(
            `/sub/chatroom/${PARAM}`,
            onSubscribe
        )
        setSubscription(sub)
    }

    // 웹소켓 연결
    useEffect(() => {
        const endPoint = new SockJS(`${DOMAIN}/chat-service/ws`)
        client = over(endPoint)
        client.connect({ Access_Token: token }, connectCallback)

        return () => {
            subscription?.unsubscribe()
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
                        <p>
                            {roomState?.userData?.field ||
                                '주특기를 입력하지 않았습니다.'}
                        </p>
                    </UserInfoText>
                    |
                    <UserInfoText>
                        <p>
                            {roomState?.userData?.availableTime ||
                                '대화 가능 시간을 입력하지 않았습니다.'}
                        </p>
                    </UserInfoText>
                </UserBox>
                <TrashCanIcon
                    width="20"
                    height="22"
                    viewBox="0 0 20 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleShowing}
                >
                    <path
                        d="M14 5V4.2C14 3.0799 14 2.51984 13.782 2.09202C13.5903 1.71569 13.2843 1.40973 12.908 1.21799C12.4802 1 11.9201 1 10.8 1H9.2C8.07989 1 7.51984 1 7.09202 1.21799C6.71569 1.40973 6.40973 1.71569 6.21799 2.09202C6 2.51984 6 3.0799 6 4.2V5M1 5H19M17 5V16.2C17 17.8802 17 18.7202 16.673 19.362C16.3854 19.9265 15.9265 20.3854 15.362 20.673C14.7202 21 13.8802 21 12.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V5"
                        stroke="#838485"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10.5 2H5.8C4.11984 2 3.27976 2 2.63803 2.32698C2.07354 2.6146 1.6146 3.07354 1.32698 3.63803C1 4.27976 1 5.11984 1 6.8V15.2C1 16.8802 1 17.7202 1.32698 18.362C1.6146 18.9265 2.07354 19.3854 2.63803 19.673C3.27976 20 4.11984 20 5.8 20H15C15.93 20 16.395 20 16.7765 19.8978C17.8117 19.6204 18.6204 18.8117 18.8978 17.7765C19 17.395 19 16.93 19 16M17 7V1M14 4H20M8.5 7.5C8.5 8.60457 7.60457 9.5 6.5 9.5C5.39543 9.5 4.5 8.60457 4.5 7.5C4.5 6.39543 5.39543 5.5 6.5 5.5C7.60457 5.5 8.5 6.39543 8.5 7.5ZM12.99 10.9181L4.53115 18.608C4.05536 19.0406 3.81747 19.2568 3.79643 19.4442C3.77819 19.6066 3.84045 19.7676 3.96319 19.8755C4.10478 20 4.42628 20 5.06929 20H14.456C15.8951 20 16.6147 20 17.1799 19.7582C17.8894 19.4547 18.4547 18.8894 18.7582 18.1799C19 17.6147 19 16.8951 19 15.456C19 14.9717 19 14.7296 18.9471 14.5042C18.8805 14.2208 18.753 13.9554 18.5733 13.7264C18.4303 13.5442 18.2412 13.3929 17.8631 13.0905L15.0658 10.8527C14.6874 10.5499 14.4982 10.3985 14.2898 10.3451C14.1061 10.298 13.9129 10.3041 13.7325 10.3627C13.5279 10.4291 13.3486 10.5921 12.99 10.9181Z"
                        stroke="#FF9C30"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </AddPictureIcon>
                <EmojiBox>
                    <SmileIcon
                        onClick={emojiHandle}
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7 13C7 13 8.5 15 11 15C13.5 15 15 13 15 13M14 8H14.01M8 8H8.01M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11ZM14.5 8C14.5 8.27614 14.2761 8.5 14 8.5C13.7239 8.5 13.5 8.27614 13.5 8C13.5 7.72386 13.7239 7.5 14 7.5C14.2761 7.5 14.5 7.72386 14.5 8ZM8.5 8C8.5 8.27614 8.27614 8.5 8 8.5C7.72386 8.5 7.5 8.27614 7.5 8C7.5 7.72386 7.72386 7.5 8 7.5C8.27614 7.5 8.5 7.72386 8.5 8Z"
                            stroke="#FF9C30"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </SmileIcon>
                    <Emoji
                        inputRef={inputRef}
                        isShowing={emojiShowing}
                        handleShowing={emojiHandle}
                    />
                </EmojiBox>
                <ChatInput ref={inputRef} />
                <input
                    type="submit"
                    id="submitBtn"
                    style={{ display: 'none' }}
                />
                <SubmitButtonIcon htmlFor="submitBtn">
                    <svg
                        width="22"
                        height="20"
                        viewBox="0 0 22 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M9.50043 10H4.00043M3.91577 10.2915L1.58085 17.2662C1.39742 17.8142 1.3057 18.0881 1.37152 18.2569C1.42868 18.4034 1.55144 18.5145 1.70292 18.5567C1.87736 18.6054 2.14083 18.4869 2.66776 18.2497L19.3792 10.7296C19.8936 10.4981 20.1507 10.3824 20.2302 10.2216C20.2993 10.082 20.2993 9.9181 20.2302 9.77843C20.1507 9.61767 19.8936 9.50195 19.3792 9.2705L2.66193 1.74776C2.13659 1.51135 1.87392 1.39315 1.69966 1.44164C1.54832 1.48375 1.42556 1.59454 1.36821 1.74078C1.30216 1.90917 1.3929 2.18255 1.57437 2.72931L3.91642 9.78556C3.94759 9.87947 3.96317 9.92642 3.96933 9.97444C3.97479 10.0171 3.97473 10.0602 3.96916 10.1028C3.96289 10.1508 3.94718 10.1977 3.91577 10.2915Z"
                            stroke="#FF9C30"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
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
