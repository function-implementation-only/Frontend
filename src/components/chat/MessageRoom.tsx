import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useSearchParams } from 'react-router-dom'
import ChatText from 'components/ChatText'
import useModal from 'hooks/useModal'
import SockJS from 'sockjs-client'
import { Client, Message, over } from 'stompjs'
import ChatCloseModal from './ChatCloseModal'
import Imoji from './Imoji'

// TODO: 아래 타입 데이터는 중복데이터임 한곳에서 관리하면 좋을듯.
type MessageItemProps = {
    chatList: [
        {
            id: string
            sender: string
            message: string
            time: string
            avatar: string
            email: string
        }
    ]

    roomId: string
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

const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxcTJ3M2U0ciIsImV4cCI6MTY3Njg4ODE0OSwiaWF0IjoxNjc2ODAxNzQ5fQ.GGLogzGnouBOjo4OHcwOPzQ_AvQzJpfDL6u24QBNAFM'

let client: Client
function MessageRoom() {
    const [chatList, setChatList] = useState<MessageItemProps>()
    const { isShowing: imojiShowing, handleShowing: imojiHandle } = useModal()
    const textContentRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const { isShowing, handleShowing } = useModal()
    const [searchParams] = useSearchParams()

    const DOMAIN = 'http://61.77.108.167:8000'
    const PARAM = searchParams.get('id')
    // Todo:아래정보 지우기
    const user = {
        sender: '상돈',
    }

    // Todo: 채팅방 제거 리턴값 뭔지 물어보기
    const deleteChatRoom = async () => {
        const deleted = await fetch(`${DOMAIN}/chat-service/chat/${PARAM}`, {
            method: 'POST',
            headers: {
                Access_Token: token,
            },
        })

        const result = await deleted.json()
        console.log(result)
    }

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault()

        client.send(
            '/pub/chat',
            {
                Access_Token: token,
            },
            JSON.stringify({
                roomId: chatList.roomId,
                sender: '중구', // email.
                message: inputRef.current.value,
            })
        )

        inputRef.current.value = ''
    }

    const scrollControll = () => {
        const textContent = textContentRef.current
        textContent.scrollTop = textContent.scrollHeight
    }

    useEffect(() => {
        fetch(`${DOMAIN}/chat-service/chat/${PARAM}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Access_Token: token,
            },
        })
            .then((res) => res.json())
            .then((json) => {
                setChatList(() => json)
                console.log(json)
                scrollControll()
            })
    }, [searchParams])

    const onSubscrib = (message: Message) => {
        console.log(message, '메세지징지징')
    }

    useEffect(() => {
        const endPoint = new SockJS(`${DOMAIN}/chat-service/ws`)
        client = over(endPoint)
        const connectCallback = () => {
            client.subscribe(`/sub/chatroom/${PARAM}`, onSubscrib)
        }

        client.connect({ Access_Token: token }, connectCallback)
    }, [searchParams])

    return (
        <MessageRoomLayOut>
            <UserInfoRow>
                <Avatar src="https://via.placeholder.com/40" />
                <UserBox>
                    <UserInfoText>
                        <h2>이름</h2>
                    </UserInfoText>
                    |
                    <UserInfoText>
                        <p>백엔드</p>
                    </UserInfoText>
                    |
                    <UserInfoText>
                        <p>시간 </p>
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
                {chatList?.chatList.map((chat, index, arr) => {
                    const isMine = chat.sender === user.sender
                    const isStart = index === 0 && index > -1
                    const isRepeat =
                        index > 0 && arr[index - 1].sender === chat.sender

                    return (
                        <ChatText
                            key={chat.id}
                            avatar={!isMine && (isStart || !isRepeat)}
                            content={chat.message}
                            name={chat.sender}
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
