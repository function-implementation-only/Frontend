import { useNavigate, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'

type MessageItemProps = {
    id: string
    name: string
    content: string
    time: string
    avatar: string
    email: string
}

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

const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJha3NrZmx3bjRAZ21haWwuY29tIiwiZXhwIjoxNjc2Mjg5ODE1LCJpYXQiOjE2NzYyMDM0MTV9.zJciUB2PE814L6frlBqWZD_rmba_iThLSqqtRorjZdw'

function MessageItem({ data }: { data: MessageItemProps }) {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const targetEmail = { targetEmail: data.email }

    async function selectMessage() {
        const response = await fetch(
            'http://121.190.6.208:8000/chat-service/chat',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Access_Token: token,
                },
                body: JSON.stringify(targetEmail),
            }
        )
        const RoomData = await response.json()
        navigate(`/chat?id=${RoomData}`)
    }

    return (
        <MessageItemLayout
            onClick={selectMessage}
            selected={searchParams.get('id') === data.id}
        >
            <AvatarRow>
                <AvatarImage src="https://via.placeholder.com/56" />
            </AvatarRow>
            <MessageInfoBox>
                <NameColumn>
                    <NameParagraph>{data.name}</NameParagraph>
                </NameColumn>
                <ContentTimeColumn>
                    <ContentParagraph>{data.content}</ContentParagraph>
                    <TimeText>{data.time}</TimeText>
                </ContentTimeColumn>
            </MessageInfoBox>
        </MessageItemLayout>
    )
}

export default MessageItem
