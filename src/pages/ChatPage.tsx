import MessageItem from 'components/chat/MessageItem'
import MessageRoom from 'components/chat/MessageRoom'
import { MouseEvent, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'

// import SockJs from 'sockjs-client'
// import { over } from 'stompjs'

// let stompClient = null

type CategoryProps = {
    selected: boolean
}

const ChatPageLayout = styled.div`
    display: flex;
    width: 1440px;
    height: calc(100vh - 80px);
    margin: 0 auto;
    /* padding: 0 24px; */
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
    display: flex;
    flex-direction: column;
    align-items: center;
`

// const ChatListColumn = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
// `

const ChatListIconBox = styled.div`
    height: 78px;
    width: 340px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
`

const ChatListCircle = styled.div`
    border: 2px solid #ff9c30;
    border-radius: 50%;
    width: 78px;
    height: 78px;
`

const ChatListIcon = styled.svg`
    transform: rotateZ(-45deg);
    position: absolute;
    margin-bottom: 5px;
    margin-left: 4px;
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
        email: 'te31e3123com',
    },
    {
        id: '2',
        avatar: '',
        name: '김조인',
        content: 'asdfagsdjdsgj.',
        time: '00시간',
        email: 't23123t3123c312om',
    },
    {
        id: '3',
        avatar: '',
        name: 'Happy',
        content: '네~ afkjsdngdsjkgdsgfddsfdsfdsfsdfdfas.',
        time: '00시간',
        email: 't33325244m',
    },
    {
        id: '4',
        name: '이연말',
        avatar: '',
        content: 'dgkhbsdgkjnsjlgknsdlkgjndjl',
        time: '00시간',
        email: 't32571est41com',
    },
]

const NO_DUMMMY_DATA = [
    {
        id: '1',
        avatar: '',
        name: '김해피',
        content: '네~ 하겠습니다.',
        time: '00시간',
        email: 'te31e3123com',
    },
    {
        id: '2',
        avatar: '',
        name: '김조인',
        content: 'asdfagsdjdsgj.',
        time: '00시간',
        email: 't23123t3123c312om',
    },
    {
        id: '3',
        avatar: '',
        name: 'Happy',
        content: '네~ afkjsdngdsjkgdsgfddsfdsfdsfsdfdfas.',
        time: '00시간',
        email: 't33325244m',
    },
    {
        id: '4',
        name: '이연말',
        avatar: '',
        content: 'dgkhbsdgkjnsjlgknsdlkgjndjl',
        time: '00시간',
        email: 't32571est41com',
    },
]

const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJha3NrZmx3bjRAZ21haWwuY29tIiwiZXhwIjoxNjc2Mjg5ODE1LCJpYXQiOjE2NzYyMDM0MTV9.zJciUB2PE814L6frlBqWZD_rmba_iThLSqqtRorjZdw'

function ChatPage() {
    const [AllMessage, setAllMessage] = useState(true)
    const [searchParams] = useSearchParams()

    // const changeCategoryHandler = () => setAllCategory()
    function setMessageState(e: MouseEvent<HTMLButtonElement>) {
        const text = (e.target as HTMLElement).textContent

        if (text === '전체') setAllMessage(true)
        else setAllMessage(false)
    }

    // const onConnectedCallback = () => {
    //     console.log('하이야')
    // }

    // useEffect(() => {
    //     const Sock = new SockJs(`http://172.30.1.26/chat-service`)
    //     stompClient = over(Sock)
    //     stompClient.connect(
    //         {
    //             'Content-Type': 'application/json',
    //             Access_Token: token,
    //         },
    //         onConnectedCallback
    //     )
    // }, [])

    const getChatRooms = async () => {
        const response = await fetch(
            'http://172.30.1.26/chat-service/chat/list',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Access_Token: token,
                },
            }
        )
        const RoomData = await response.json()
        // Todo: 아래리턴값 리턴 없애고 채팅방 이동으로 바꾸어야 함.
        return RoomData
    }

    // 페이지 도착시 채팅방 리스트 갱신
    useEffect(() => {
        getChatRooms()
    }, [])

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
                        {/* <ChatListColumn> */}
                        <ChatListIconBox>
                            <ChatListCircle />
                            <ChatListIcon
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1"
                                stroke="currentColor"
                                preserveAspectRatio="xMidYmid meet"
                                width={50}
                                height={50}
                                color="#ff9c30"
                                transform="rotateZ(45deg)"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                                />
                            </ChatListIcon>
                        </ChatListIconBox>

                        <ChatListParagraph>메세지 선택하기</ChatListParagraph>
                        <ChatListContentParagraph>
                            기존 대화에서 선택하거나 새로운 대화를 시작해보세요
                        </ChatListContentParagraph>
                        {/* </ChatListColumn> */}
                    </ChatListBox>
                </MessageRow>
            ) : (
                <MessageRoom list={NO_DUMMMY_DATA} />
            )}
        </ChatPageLayout>
    )
}

export default ChatPage
