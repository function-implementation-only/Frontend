import styled from 'styled-components'

type MessageItemProps = {
    name: string
    content: string
    time: string
    avatar: string
}

const MessageItemLayout = styled.li`
    display: flex;
    height: 76px;
    min-width: 300px;
    padding: 10px;
    margin: 4px 0;
    cursor: pointer;
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

function MessageItem({ data }: { data: MessageItemProps }) {
    return (
        <MessageItemLayout>
            <AvatarRow>
                <AvatarImage src="https://via.placeholder.com/56 " />
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
