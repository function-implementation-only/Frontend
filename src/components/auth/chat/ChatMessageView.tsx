/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import styled from 'styled-components'
import { IFrame } from '@stomp/stompjs'
// import useChatById from 'hooks/useChatById'
import { useCallback, useState } from 'react'
import useStomp from 'hooks/useStomp'

// import { Client } from '@stomp/stompjs'

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
    const config = {
        brokerURL: '/api/stomp/chat',
        connectHeaders: {
            Access_Token: window.localStorage.getItem('token'),
        },
    }
    const {
        disconnect,
        subscribe,
        unsubscribe,
        subscriptions,
        send,
        isConnected,
    } = useStomp(config)

    subscribe('/pub/chat/message', (body) => {
        console.log(body, 'body')

        // Body is Object Changed to JSON
    })

    console.log('isConnected', isConnected)
    console.log('subscriptions', subscriptions)

    const user = 'troublesome.dev@gmail.com'
    return (
        <ChatMessageBox>
            {[].map((e) =>
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
            <button
                type="button"
                onClick={() =>
                    send(
                        '/sub/1',
                        {
                            sender: '신규',
                            message: '하이로',
                        },
                        config
                    )
                }
            >
                하이
            </button>
        </ChatMessageBox>
    )
}
