import { useNavigate, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { ChatRoomType } from 'pages/ChatPage'
import { useEffect, useState } from 'react'

type SelectedProps = {
    selected: boolean
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

// const TimeText = styled.span`
//     text-align: right;
//     font-size: 12px;
//     color: var(--gray-600);
//     width: 90px;
// `
const RedDot = styled.div`
    position: absolute;
    width: 8px;
    height: 8px;
    background: #ff9c30;
    border-radius: 50%;
    right: 0;
`

type PropTypes = {
    data: ChatRoomType
}

function MessageItem({ data }: PropTypes) {
    const [unReadMessage, setUnReasMessage] = useState<boolean>(false)
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const { roomName } = data

    function setUnReadMessageState() {
        if (data?.unreadMessageCount) {
            setUnReasMessage(true)
        }
    }

    function unReadMessageStateChange() {
        setUnReasMessage(() => false)
    }

    useEffect(() => {
        setUnReadMessageState()
    }, [])

    async function selectMessage() {
        navigate(`/chat?id=${roomName}`)
        unReadMessageStateChange()
    }

    return (
        <div>
            <MessageItemLayout
                onClick={selectMessage}
                selected={searchParams.get('id') === roomName}
            >
                <AvatarRow>
                    <AvatarImage src={data?.userData?.imgUrl} />
                </AvatarRow>
                <MessageInfoBox>
                    <NameColumn>
                        <NameParagraph>
                            {data?.userData?.nickname}
                        </NameParagraph>
                    </NameColumn>
                    <ContentTimeColumn>
                        <ContentParagraph>
                            {data?.latestChatMessage}
                        </ContentParagraph>
                        {/* <TimeText>
                                {hour && minute
                                    ? `${hour} 시간 ${minute}분`
                                    : minute
                                    ? `${minute}분`
                                    : '방금전'}
                            </TimeText> */}
                    </ContentTimeColumn>
                    {unReadMessage ? <RedDot /> : null}
                </MessageInfoBox>
            </MessageItemLayout>
        </div>
    )
}

export default MessageItem
