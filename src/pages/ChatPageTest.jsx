import React from 'react'
import Sockjs from 'sockjs-client'
import webstomp from 'webstomp-client'

function ChatPageTest() {
    const connect = () => {
        let socket = new Sockjs(`/chat-service/ws`)
        let client = webstomp.over(socket)
        let reconnect = 0

        client.connect({}, () => {
            client.subscribe(
                '/sub/chatroom/738f86e9-1ca9-4e34-b895-a70d15f83ff2',
                (message) => {
                    console.log(message)
                },
                () => {
                    if (reconnect < 5) {
                        setTimeout(() => {
                            reconnect += 1
                            socket = new Sockjs(`/chat-service/ws`)
                            client = webstomp.over(socket)
                            connect()
                        }, 10 * 1000)
                    }
                }
            )
        })
    }

    return (
        <div>
            <button type="button" onClick={connect}>
                연결
            </button>
        </div>
    )
}

export default ChatPageTest
