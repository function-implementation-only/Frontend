import MessageItem from 'components/chat/MessageItem'
import MessageRoom from 'components/chat/MessageRoom'
import { MouseEvent, useState } from 'react'
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
    padding: 0 24px;
`

const ChatListRow = styled.div`
    height: 100%;
    border-right: 2px solid rgba(51, 51, 51, 0.1);
`

const MessageRow = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
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

const MessageList = styled.ul`
    padding-right: 10px;
`

const ChatListBox = styled.div`
    width: 340px;
    height: 150px;
`

const ChatListColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ChatListIcon = styled.img`
    border-radius: 50%;
    margin-bottom: 12px;
`

const ChatListParagraph = styled.p`
    font-weight: 700;
    font-size: 24px;
    line-height: 28.8px;
    margin-bottom: 8px;
`

const ChatListContentParagraph = styled.p`
    line-height: 23px;
    color: var(--gray-700);
`

const DUMMMY_DATA = [
    {
        id: '1',
        avatar: '',
        name: '김해피',
        content: '네~ 하겠습니다.',
        time: '00시간',
        email: 'test@test.com',
    },
    {
        id: '2',
        avatar: '',
        name: '김조인',
        content: 'asdfagsdjdsgj.',
        time: '00시간',
        email: 'test2@test.com',
    },
    {
        id: '3',
        avatar: '',
        name: 'Happy',
        content: '네~ afkjsdngdsjkdsgdsgfddsfdsfdsfsdfdfas.',
        time: '00시간',
        email: 'tes3t@test.com',
    },
    {
        id: '4',
        name: '이연말',
        avatar: '',
        content: 'dgkhbsdgkjnsjlgknsdlkgjndjl',
        time: '00시간',
        email: 'test4@test.com',
    },
]

function ChatPage() {
    const [AllMessage, setAllMessage] = useState(true)
    const [searchParams] = useSearchParams()

    // const changeCategoryHandler = () => setAllCategory()
    function setMessageState(e: MouseEvent<HTMLButtonElement>) {
        const text = (e.target as HTMLElement).textContent

        if (text === '전체') setAllMessage(true)
        else setAllMessage(false)
    }

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
                    {DUMMMY_DATA.map((data) => (
                        <MessageItem key={data.id} data={data} />
                    ))}
                </MessageList>
            </ChatListRow>
            {!searchParams.get('id') ? (
                <MessageRow>
                    <ChatListBox>
                        <ChatListColumn>
                            <ChatListIcon src="https://via.placeholder.com/78" />
                            <ChatListParagraph>
                                메세지 선택하기
                            </ChatListParagraph>
                            <ChatListContentParagraph>
                                기존 대화에서 선택하거나 새로운 대화를
                                시작해보세요
                            </ChatListContentParagraph>
                        </ChatListColumn>
                    </ChatListBox>
                </MessageRow>
            ) : (
                <MessageRoom />
            )}
        </ChatPageLayout>
    )
}

export default ChatPage
