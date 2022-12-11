import { Key, useEffect, useState } from 'react'
import SocketIoCLient, { Socket } from 'socket.io-client'
import { ChatWithUser } from '../types/chat'
import { MessageData } from './components/launcher/write'
import useChats from './components/useChats'

const useChatConnect = (id: string) => {
    const { data } = useChats(id)
    const [chats, setChats] = useState<ChatWithUser[]>([])
    const [socket, setSocket] = useState<Socket>()

    useEffect(() => {
        if (data) {
            setChats(data)
        }
    }, [data])

    useEffect(() => {
        // if (!id) return
        // const mySocket = SocketIoCLient(import.meta.env.VITE_API_END_POINT, {
        //     path: '/api/socket/chat',
        // }).connect()
        // mySocket.on('connect', () => {
        //     console.log('SOCKET CONNECTED!', mySocket.id)
        //     mySocket.emit('onJoinRoom', id)
        // })
        // setSocket((prev) => prev || mySocket)
        // if (socket) socket.disconnect()
    }, [id, socket])

    useEffect(() => {
        socket?.on('onReceive', (chat: ChatWithUser) => {
            setChats((prev) => prev.concat(chat))
        })
    }, [socket])

    const onSendMessage = (messageData: MessageData) => {
        socket?.emit('onSend', { ...messageData, chatRoomId: id })
    }
    const aaa = [
        {
            id: 1,
            user: {
                id: 100,
                name: '박경서',
                email: 'troublesome.dev@gmail.com',
                emailVerified: new Date('2019-12-11T12:20:30'),
                image: 'https://avatars.githubusercontent.com/u/45850400?v=4',
            },
            message: 'asds',
        },
        {
            id: 2,
            user: {
                id: 200,
                name: '박경서2',
                email: '2troublesome.dev@gmail.com',
                emailVerified: new Date('2020-12-11T12:20:30'),
                image: 'https://avatars.githubusercontent.com/u/45850400?v=4',
            },
            message: 'asds',
        },
        {
            id: 1,
            user: {
                id: 100,
                name: '박경서',
                email: 'troublesome.dev@gmail.com',
                emailVerified: new Date('2021-12-11T12:20:30'),
                image: 'https://avatars.githubusercontent.com/u/45850400?v=4',
            },
            message: 'asds',
        },
    ]

    return { chats: aaa, onSendMessage }
}

export default useChatConnect
