/* eslint-disable no-console */
import styled from 'styled-components'
import * as StompJs from '@stomp/stompjs'
import { IFrame } from '@stomp/stompjs'
import { getTokenFromCookie } from '../../../../utils/cookie'

const ChatMessageBox = styled.div`
    .div {
        position: relative;
        width: 100%;
        max-width: calc(100% - 6em);
        min-width: 4em;
        padding: 0.6em 1em 0.6em 5em;
    }
    .div::before {
        content: '';
        display: block;
        width: 2.8em;
        height: 2.8em;
        position: absolute;
        top: 0.3em;
        left: 1em;
        background-image: var(--profile-image);
        background-size: 100% 100%;
        background-position: center center;
        background-repeat: no-repeat;
        border-radius: 50%;
    }

    .div.deleted {
        visibility: hidden;
    }

    .class {
        min-width: 500px;
        width: 80%;
    }

    .you {
        background-color: red;
    }

    .me {
        background-color: yellow;
        text-align: right;
    }
`

export default function ChatMessageView() {
    const client = new StompJs.Client({
        brokerURL: 'ws://joinus.p-e.kr/api/ws',
        connectHeaders: {
            token: getTokenFromCookie(),
        },
        debug(msg: string) {
            console.log('Stomp msg', msg)
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
    })

    client.onConnect = (Iframe: IFrame) => {
        console.log('Stomp 연결됨', Iframe)
        // console.log(`frame ${frame}`)
        // Do something, all subscribes must be done is this callback
        // This is needed because this will be executed after a (re)connect
    }

    client.onStompError = (Iframe: IFrame) => {
        console.log('Stomp 에서 에러 남', Iframe)
        // console.log(`Broker reported error: ${iframe.headers.message}`)
        // console.log(`Additional details: ${iframe.body}`)
    }

    client.activate()
    const user = 'troublesome.dev@gmail.com'
    const data = [
        {
            email: 'troublesome.dev@gmail.com',
            message: '하이',
        },
        {
            email: 'troublesome2.dev@gmail.com',
            message: '하이',
        },
        {
            email: 'troublesome.dev@gmail.com',
            message: '하이',
        },
        {
            email: 'troublesome2.dev@gmail.com',
            message: '하이',
        },
        {
            email: 'troublesome.dev@gmail.com',
            message: '하이',
        },
        {
            email: 'troublesome2.dev@gmail.com',
            message: '하이',
        },
        {
            email: 'troublesome2.dev@gmail.com',
            message: '하이',
        },
        {
            email: 'troublesome.dev@gmail.com',
            message: '하이',
        },
        {
            email: 'troublesome2.dev@gmail.com',
            message: '하이',
        },
        {
            email: 'troublesome2.dev@gmail.com',
            message: '하이',
        },
    ]
    return (
        <ChatMessageBox>
            {data.map((e) =>
                e.email === user ? (
                    <div className="you">
                        <span className="class">Hello</span>
                    </div>
                ) : (
                    <div className="me">
                        <span className="class">너냐</span>
                    </div>
                )
            )}
        </ChatMessageBox>
    )
}
