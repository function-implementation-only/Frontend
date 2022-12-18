import StompJs from 'stompjs'
import SockJs from 'sockjs-client'

const sock = new SockJs('https://joinus.p-e.kr/ws/chat')

const stomp = StompJs.over(sock)

const token = ''

export const connectChatByRoomId = () => {
    try {
        stomp.debug = null
        stomp.connect(token, () => {
            stomp.subscribe(
                `서버주소`,
                (data) => {
                    const newMessage = JSON.parse(data.body)
                    console.log(newMessage)
                },
                token
            )
        })
    } catch (err) {
        console.error(err)
    }
}

export const disconnectChatByRoomId = () => {
    try {
        stomp.debug = null
        stomp.disconnect(() => {
            stomp.unsubscribe('sub-0')
        }, token)
    } catch (err) {
        console.error(err)
    }
}

type SendMessageType = {
    roomId: string
    userId: string
    message: string
}

export const SendMessage = (props: SendMessageType) => {
    const { roomId, userId, message } = props
    stomp.debug = null
    const data = {
        roomId,
        user: userId,
        message,
    }

    stomp.send('/ws/chat/message', token, JSON.stringify(data))
}
