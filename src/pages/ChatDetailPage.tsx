import axios from 'axios'
import useStomp from 'hooks/useStomp'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ChatDetailPage = () => {
    const { id: paramId } = useParams()

    const [roomId, setRoomId] = useState(paramId)
    const [room, setRoom] = useState({ name: '' })
    const [sender, setSender] = useState('')
    const [message, setMessage] = useState('')
    // const [messages, setMessages] = useState([])

    const navigate = useNavigate()
    // alert(document.title);
    // websocket & stomp initialize
    const config = {
        brokerURL: 'ws://localhost:8081/ws/chat',
        connectHeaders: {
            Access_Token: window.localStorage.getItem('token'),
        },
    }

    const findRoom = async () => {
        const result = await axios.get(
            `http://127.0.0.1:8081/api/chat/room/${roomId}`
        )
        setRoom(result.data)
    }

    const { subscriptions, send, isConnected } = useStomp(config)
    console.log('isConnected', isConnected)
    console.log('subscriptions', subscriptions)

    const sendMessage = () => {
        send(
            '/app/chat/message',
            {},
            {
                type: 'TALK',
                roomId,
                sender,
                message,
            }
        )
        setMessage('')
    }

    // const recvMessage = (recv: {
    //     type: string
    //     sender: string
    //     message: string
    // }) => {
    //     const aaa = [
    //         {
    //             type: recv.type,
    //             sender: recv.type === 'ENTER' ? '[알림]' : recv.sender,
    //             message: recv.message,
    //         },
    //         ...messages,
    //     ]
    //     setMessages(aaa)
    // }

    // function connect() {
    //     // pub/sub event
    //     ws.connect(
    //         {},
    //         function () {
    //             ws.subscribe(`/topic/chat/room/${roomId}`, function (params) {
    //                 const recv = JSON.parse(params.body)
    //                 recvMessage(recv)
    //             })
    //             ws.send(
    //                 '/app/chat/message',
    //                 {},
    //                 JSON.stringify({
    //                     type: 'ENTER',
    //                     roomId,
    //                     sender,
    //                 })
    //             )
    //         },
    //         function () {
    //             const addReconnect = reconnect + 1
    //             if (addReconnect <= 5) {
    //                 setTimeout(function () {
    //                     console.log('connection reconnect')
    //                     ws = Stomp.over(sock)
    //                     connect()
    //                 }, 10 * 1000)
    //             }
    //             setReconnect(addReconnect)
    //         }
    //     )
    // }

    useEffect(() => {
        setRoomId(localStorage.getItem('wschat.roomId'))
        setSender(localStorage.getItem('wschat.sender'))
        findRoom()
        // subscribe(`/topic/chat/room/${roomId}`, () => console.log('subscribe'))
        // connect()
    }, [])

    return (
        <>
            <div>
                <button type="button" onClick={() => navigate(`/chat`)}>
                    돌아가기
                </button>
            </div>
            <div>
                <div>
                    <h2>{room.name}</h2>
                </div>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">내용</span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        onClick={() => sendMessage()}
                    />
                    <div className="input-group-append">
                        <button
                            id="text"
                            className="btn btn-primary"
                            type="button"
                            onClick={() => sendMessage()}
                        >
                            보내기
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatDetailPage
