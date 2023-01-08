import * as StompJs from '@stomp/stompjs'
import styled from 'styled-components'
import CoffeeChatSvg from '../../../assets/images/coffee-chat.svg'
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
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 1em;
    .coffee-top {
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 29px;
        /* identical to box height */

        /* Gray/750 */
        color: #333333;

        padding: 10px 0px;
    }

    .coffee-bottom {
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 100%;
        /* identical to box height, or 14px */

        /* Gray/400 */

        color: #b0b0b0;
    }
`

function AuthMessenger() {
    const chatFlag = true

    const client = new StompJs.Client({
        brokerURL: 'ws://joinus.p-e.kr/api/ws',
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
                    <img src={CoffeeChatSvg} alt="" />
                    <p className="coffee-top">메세지 선택하기</p>
                    <p className="coffee-bottom">
                        기존 대화에서 선택하거나 새로운 대화를 시작해보세요
                    </p>
                </ChatNotFoundSection>
            ) : (
                <ChatFoundSection />
            )}
        </ChatViewLayout>
    )
}

export default AuthMessenger
