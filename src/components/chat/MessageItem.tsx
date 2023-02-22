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

type TempType = {
    chatList: MessageItemProps[]
    latestChatMessage: string | null
    nickname: string | null
    roomId: number
    roomName: string
    unreadMessageCount: number | null
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
    width: 80px;
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

let hour: number | null | undefined | Date
let minute: number | null | undefined | Date
function MessageItem({ data }: { data: ChatRoomType }) {
    const [roomInfo, setRoomInfo] = useState<TempType>()
    const [unReadMessage, setUnReasMessage] = useState<boolean>(false)
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const { roomName } = data
    const DOMAIN = 'http://121.180.179.245:8000'

    const lastTime =
        roomInfo &&
        roomInfo?.chatList[roomInfo.chatList.length - 1] &&
        roomInfo?.chatList[roomInfo.chatList.length - 1].createAt

    if (lastTime) {
        const messageTime = new Date(lastTime).getTime()
        hour = Math.floor((Date.now() - messageTime) / 60 / 60 / 1000)
        minute = Math.floor(((Date.now() - messageTime) / 1000 / 60) % 60)
    }

    function setUnReadMessageState() {
        if (data.unReadMessageCount) {
            setUnReasMessage(true)
        }
    }

    useEffect(() => {
        fetch(`${DOMAIN}/chat-service/chat/${data.roomName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Access_Token: token,
            },
        })
            .then((res) => res.json())
            .then((json) => setRoomInfo(json))
        setUnReadMessageState()
    }, [])

    function unReadMessageStateChange() {
        setUnReasMessage(false)
    }

    async function selectMessage() {
        navigate(`/chat?id=${roomName}`)
        unReadMessageStateChange()
    }

    return (
        <MessageItemLayout
            onClick={selectMessage}
            selected={searchParams.get('id') === roomName}
        >
            <AvatarRow>
                <AvatarImage src="https://via.placeholder.com/56" />
            </AvatarRow>
            <MessageInfoBox>
                <NameColumn>
                    <NameParagraph>{data.nickname}</NameParagraph>
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
                            : null}
                    </TimeText>
                </ContentTimeColumn>
                {unReadMessage ? <RedDot /> : null}
            </MessageInfoBox>
        </MessageItemLayout>
    )
}

export default MessageItem
