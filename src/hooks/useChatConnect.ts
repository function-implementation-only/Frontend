import { useEffect, useState } from 'react'
import SocketIoCLient, { Socket } from 'socket.io-client'
import { ChatWithUser } from '../types/chat'
import { MessageData } from '../presentation/components/launcher/LauncherWriteComponent'
import useChats from './useChats'

const useChatConnect = (id: string) => {
    const { data } = useChats({ id })
    const [chats, setChats] = useState<ChatWithUser[]>([])
    const [socket, setSocket] = useState<Socket>()

    useEffect(() => {
        if (data) {
            setChats(data)
        }
    }, [data])

    useEffect(() => {
        if (!id) return

        const mySocket = SocketIoCLient(import.meta.env.VITE_API_END_POINT, {
            path: '/api/socket/chat',
        }).connect()

        mySocket.on('connect', () => {
            mySocket.emit('onJoinRoom', id)
        })

        setSocket((prev) => prev || mySocket)

        if (socket) socket.disconnect()
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
