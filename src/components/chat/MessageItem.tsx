import { useNavigate, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { ChatRoomType } from 'pages/ChatPage'

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
    font-size: 12px;
    color: var(--gray-600);
`
const RedDot = styled.div`
    position: absolute;
    width: 8px;
    height: 8px;
    background: #ff9c30;
    border-radius: 50%;
    right: 0;
`

const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxcTJ3M2U0ciIsImV4cCI6MTY3NzA3Mzg1NSwiaWF0IjoxNjc2OTg3NDU1fQ.wkR57szvXeVet8-juSmGtiL2MFCYgWAtjs56MZWCBQg'

console.log(token)

function MessageItem({ data }: { data: ChatRoomType }) {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const { roomName } = data

    async function selectMessage() {
        navigate(`/chat?id=${roomName}`)
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
                    <TimeText>시간</TimeText>
                </ContentTimeColumn>
                {data.unReadMessageCount ? <RedDot /> : null}
            </MessageInfoBox>
        </MessageItemLayout>
    )
}

export default MessageItem
