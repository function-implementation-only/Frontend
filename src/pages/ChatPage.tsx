import MessageItem from 'components/chat/MessageItem'
import { MouseEvent, useState } from 'react'
import styled from 'styled-components'

type CategoryProps = {
    selected: boolean
}

const ChatPageLayout = styled.div`
    width: 1440px;
    margin: 0 auto;
    padding: 0 24px;
`

const ChatPageRow = styled.div`
    width: 316px;
    height: 100vh;
    border-right: 2px solid rgba(51, 51, 51, 0.1);
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

const MessageColumn = styled.div``

const MessageList = styled.ul``

const DUMMMY_DATA = [
    {
        id: '1',
        avatar: '',
        name: '김해피',
        content: '네~ 하겠습니다.',
        time: '00시간',
    },
    {
        id: '2',
        avatar: '',
        name: '김조인',
        content: 'asdfagsdjdsgj.',
        time: '00시간',
    },
    {
        id: '3',
        avatar: '',
        name: 'Happy',
        content: '네~ afkjsdngdsjkdsgdsgfddsfdsfdsfsdfdfas.',
        time: '00시간',
    },
    {
        id: '4',
        name: '이연말',
        avatar: '',
        content: 'dgkhbsdgkjnsjlgknsdlkgjndjl',
        time: '00시간',
    },
]

function ChatPage() {
    const [AllMessage, setAllMessage] = useState(true)

    // const changeCategoryHandler = () => setAllCategory()
    function setMessageState(e: MouseEvent<HTMLButtonElement>) {
        const text = (e.target as HTMLElement).textContent

        if (text === '전체') setAllMessage(true)
        else setAllMessage(false)
    }

    return (
        <ChatPageLayout>
            <ChatPageRow>
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
                <MessageColumn>
                    <MessageList>
                        {DUMMMY_DATA.map((data) => (
                            <MessageItem key={data.id} data={data} />
                        ))}
                    </MessageList>
                </MessageColumn>
            </ChatPageRow>
        </ChatPageLayout>
    )
}

export default ChatPage
