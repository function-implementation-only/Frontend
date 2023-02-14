import React from 'react'
import Sockjs from 'sockjs-client'
import { over } from 'stompjs'

function ChatPageTest() {
    const connect = () => {
        let client = null
        let socket = new Sockjs(`http://61.77.108.167:8000/chat-service/ws`)
        client = over(socket)
        console.log(client)
        let reconnect = 0

        client.connect({}, function () {
            client.subscribe(
                '/sub/chatroom/738f86e9-1ca9-4e34-b895-a70d15f83ff2',
                function (message) {
                    console.log(message)
                },
                function () {
                    if (reconnect < 5) {
                        setTimeout(() => {
                            reconnect += 1
                            socket = new Sockjs(
                                `http://61.77.108.167:9002/chat-service/ws`
                            )
                            client = over(socket)
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
