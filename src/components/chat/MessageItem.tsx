import { useNavigate, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { ChatRoomType } from 'pages/ChatPage'
import { useEffect, useState } from 'react'

type SelectedProps = {
    selected: boolean
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

type ChatFriendsData = {
    accountId: number
    availableTime: string
    email: string
    field: string
    imgUrl: string
    introduction: string
    nickname: string
}

type RoomState = {
    roomId: number
    roomName: string
    userData: ChatFriendsData
}

const MessageItemLayout = styled.li<SelectedProps>`
    display: flex;
    height: 76px;
    width: 300px;
    padding: 10px;
    margin: 4px 0;
    cursor: pointer;
    border-radius: 10px;
    background-color: ${(props) =>
        props.selected && 'var(--primary-color-100)'};
`

const AvatarRow = styled.div`
    margin-right: 12px;
`

const AvatarImage = styled.img`
    border-radius: 50%;
    width: 56px;
    height: 56px;
`

const MessageInfoBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
    position: relative;
    width: 212px;
`

const NameColumn = styled.div``

const NameParagraph = styled.p`
    color: var(--gray-700);
    font-weight: 700;
`

const ContentTimeColumn = styled.div`
    display: flex;
    font-weight: 400;
`

const ContentParagraph = styled.p`
    width: 156px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    margin-right: 4px;
`

const TimeText = styled.span`
    text-align: right;
    font-size: 12px;
    color: var(--gray-600);
    width: 90px;
`
const RedDot = styled.div`
    position: absolute;
    width: 8px;
    height: 8px;
    background: #ff9c30;
    border-radius: 50%;
    right: 0;
`
const token = localStorage.getItem('token')

type PropTypes = {
    data: ChatRoomType
}

function MessageItem({ data }: PropTypes) {
    const [loading, setLoading] = useState<boolean>(false)
    const [chatList, setChatList] = useState<MessageItemProps[]>()
    const [roomState, setRoomState] = useState<RoomState>()
    const [unReadMessage, setUnReasMessage] = useState<boolean>(false)
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const { roomName } = data
    const DOMAIN = import.meta.env.VITE_API_CHAT_END_POINT

    let hour: number | null | undefined | Date = null
    let minute: number | null | undefined | Date = null

    const lastTime =
        data?.lastSendMessageTime ||
        (chatList &&
            chatList[chatList.length - 1] &&
            chatList[chatList.length - 1].createAt)

    if (lastTime && chatList?.length) {
        switch (typeof lastTime) {
            case 'string':
                hour = Math.floor(
                    (Date.now() - new Date(lastTime).getTime()) / 60 / 60 / 1000
                )
                minute = Math.floor(
                    ((Date.now() - new Date(lastTime).getTime()) / 1000 / 60) %
                        60
                )
                break
            case 'number':
                hour = Math.floor(
                    (Date.now() - data.lastSendMessageTime) / 60 / 60 / 1000
                )
                minute = Math.floor(
                    ((Date.now() - data.lastSendMessageTime) / 1000 / 60) % 60
                )
                break
            default:
        }
    }

    function setUnReadMessageState() {
        if (data.unreadMessageCount) {
            setUnReasMessage(true)
        }
    }
    useEffect(() => {
        setUnReadMessageState()
    }, [])

    // useEffect(() => {
    //     fetch(`${DOMAIN}/chat-service/chat/${data.roomName}`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Access_Token: token,
    //         },
    //     })
    //         .then((res) => res.json())
    //         .then((json) => {
    //             console.log(json, ' messageItem')
    //             setChatList(() => json.chatList)
    //             setRoomState(() => {
    //                 return {
    //                     roomId: json.roomId,
    //                     roomName: json.roomName,
    //                     userData: json.userData,
    //                 }
    //             })
    //         })
    //     setUnReadMessageState()
    //     setLoading(() => false)
    // }, [])

    function unReadMessageStateChange() {
        setUnReasMessage(() => false)
    }

    async function selectMessage() {
        navigate(`/chat?id=${roomName}`)
        unReadMessageStateChange()
    }

    return (
        <div>
            {loading ? (
                'null'
            ) : (
                <MessageItemLayout
                    onClick={selectMessage}
                    selected={searchParams.get('id') === roomName}
                >
                    <AvatarRow>
                        <AvatarImage src={roomState?.userData?.imgUrl} />
                    </AvatarRow>
                    <MessageInfoBox>
                        <NameColumn>
                            <NameParagraph>
                                {roomState?.userData?.nickname}
                            </NameParagraph>
                        </NameColumn>
                        <ContentTimeColumn>
                            <ContentParagraph>
                                {data.latestChatMessage}
                            </ContentParagraph>
                            <TimeText>
                                {hour && minute
                                    ? `${hour} 시간 ${minute}분`
                                    : minute
                                    ? `${minute}분`
                                    : '방금전'}
                            </TimeText>
                        </ContentTimeColumn>
                        {unReadMessage ? <RedDot /> : null}
                    </MessageInfoBox>
                </MessageItemLayout>
            )}
        </div>
    )
}

export default MessageItem
