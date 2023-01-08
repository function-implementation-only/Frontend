import * as StompJs from '@stomp/stompjs'
import styled from 'styled-components'
import { getTokenFromCookie } from '../../../utils/cookie'
import ChatFoundSection from '../../components/auth/chat/ChatFoundSection'
import ChatUserSection from '../../components/auth/ChatUserSection'

const ChatViewLayout = styled.div`
    display: flex;
    height: calc(100vh - 100px);
    max-height: 100%;
`

const ChatNotFoundSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 1em;
    p {
        text-align: center;
        font-weight: 600;
        font-size: 1.2rem;
        color: var(--primary-color);
    }
`

function AuthMessenger() {
    const chatFlag = false

    const client = new StompJs.Client({
        brokerURL: 'ws://joinus.p-e.kr/api/chat/room',
        connectHeaders: {
            token: getTokenFromCookie(),
        },
        debug(str: any) {
            console.log(str)
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
    })

    client.onConnect = (frame: any) => {
        console.log(`frame ${frame}`)
        // Do something, all subscribes must be done is this callback
        // This is needed because this will be executed after a (re)connect
    }

    client.onStompError = (iframe) => {
        console.log(`Broker reported error: ${iframe.headers.message}`)
        console.log(`Additional details: ${iframe.body}`)
    }

    client.activate()

    return (
        <ChatViewLayout>
            <ChatUserSection />
            {chatFlag ? (
                <ChatNotFoundSection>
                    <p>이모지</p>
                    <p>메세지 선택하기</p>
                    <p>기존 대화에서 선택하거나 새로운 대화를 시작해보세요</p>
                </ChatNotFoundSection>
            ) : (
                <ChatFoundSection />
            )}
        </ChatViewLayout>
    )
}

export default AuthMessenger
