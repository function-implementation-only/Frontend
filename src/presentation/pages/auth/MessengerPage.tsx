import styled from 'styled-components'
import StompJs from '@stomp/stompjs'
import { getTokenFromCookie } from 'src/utils/cookie'
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

    client.onConnect = function t(frame: any) {
        console.log(`frame ${frame}`)
        // Do something, all subscribes must be done is this callback
        // This is needed because this will be executed after a (re)connect
    }

    client.onStompError = function t(frame: {
        headers: { message: any }
        body: any
    }) {
        // Will be invoked in case of error encountered at Broker
        // Bad login/passcode typically will cause an error
        // Complaint brokers will set `message` header with a brief message. Body may contain details.
        // Compliant brokers will terminate the connection after any error
        console.log(`Broker reported error: ${frame.headers.message}`)
        console.log(`Additional details: ${frame.body}`)
    }

    client.activate()

    return (
        <ChatViewLayout>
            <ChatUserSection />
            {chatFlag ? (
                <ChatNotFoundSection>
                    <p>
                        선택된 채팅이 없습니다.
                        <br />
                        <br />
                        좌측 메뉴에 있는 채팅방을 선택하거나,
                        <br />
                        좌측 상단에 새로운 메시지 추가하기 버튼을 클릭하여
                        채팅을 시작해주세요.
                    </p>
                </ChatNotFoundSection>
            ) : (
                <ChatFoundSection />
            )}
        </ChatViewLayout>
    )
}

export default AuthMessenger
