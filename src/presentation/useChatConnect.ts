import { useEffect, useState } from 'react'
import SocketIOCLient, { Socket } from 'socket.io-client'

import { Chat, User } from './components/launcher/Message'

export interface MessageData {
    message: string
    email: string
}

export interface ChatWithUser extends Chat {
    user: User
}

const useChatConnect = (id: string) => {
    const { data } = useChats(id)
    const [chats, setChats] = useState<ChatWithUser[]>([])
    const [socket, setSocket] = useState<Socket>()

    useEffect(() => {
        setChats(data ?? [])
    }, [data])

    useEffect(() => {
        if (!id) return

        const mySocket = SocketIOCLient('http://localhost:3000', {
            path: '/api/chat/socketio',
        }).connect()

        mySocket.on('connect', () => {
            console.log('SOCKET CONNECTED!', mySocket.id)

            mySocket.emit('onJoinRoom', id)
        })

        setSocket((prev: any) => prev || mySocket)

        // eslint-disable-next-line consistent-return
        return () => {
            if (socket) socket.disconnect()
        }
    }, [id, socket])

    useEffect(() => {
        socket?.on('onReceive', (chat: ChatWithUser) => {
            setChats((prev) => prev.concat(chat))
        })
    }, [socket])

    const onSendMessage = (messageData: MessageData) => {
        socket?.emit('onSend', { ...messageData, chatRoomId: id })
    }

    return { chats, onSendMessage }
}

export default useChatConnect
