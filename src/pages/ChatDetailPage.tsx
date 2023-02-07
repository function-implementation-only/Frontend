import SockJS from 'sockjs-client'
import React, { useEffect, useState } from 'react'
import webstomp from 'webstomp-client'
import { useNavigate } from 'react-router-dom'

const ChatDetailPage = () => {
    const [chatList, setChatList] = useState([])
    const sock = new SockJS('/ws/chat')
    const ws = webstomp.over(sock)
    const navigate = useNavigate()
    const roomId = 'b3c1cdee-5a04-4dae-aed9-b142cf87a072'
    const sender = 1
    console.log(chatList)

    function waitForConnection(wsParms: any, callback: any) {
        setTimeout(
            function () {
                // 연결되었을 때 콜백함수 실행

                if (wsParms.ws.readyState === 1) {
                    callback()

                    // 연결이 안 되었으면 재호출
                } else {
                    waitForConnection(wsParms, callback)
                }
            },
            50 // 밀리초 간격으로 실행
        )
    }

    const onbeforeunloda = () => {
        try {
            ws.disconnect(
                () => {
                    ws.unsubscribe('sub-0')
                    // clearTimeout(waitForConnection)
                },

                { Access_Token: localStorage.getItem('Access_Token') }
            )
        } catch (e) {
            // console.log('e', e)
        }
    }
    const headers = {
        Access_Token: localStorage.getItem('Access_Token'),
    }
    function wsConnectSubscribe() {
        try {
            ws.connect(headers, () => {
                // console.log('headers', headers)
                ws.subscribe(`/topic/chat/room/${roomId}`, (response) => {
                    // console.log('response', response)
                    const data = JSON.parse(response.body)
                    setChatList(data)
                })
            })
        } catch (error) {
            // console.log('error', error)
        }
    }

    // useEffect(() => {
    //     wsConnectSubscribe()
    // }, [])

    useEffect(() => {
        wsConnectSubscribe()
        console.log('aa')

        return () => {
            onbeforeunloda()
        }
    }, [roomId])

    const [chatBody, setChatBody] = useState('')

    const inputHandler = (e: {
        target: { value: React.SetStateAction<string> }
    }) => {
        setChatBody(e.target.value)
    }

    const onSubmitHandler = () => {
        if (chatBody === '' || chatBody === ' ') {
            alert('내용을 입력해주세요.')
            return -1
        }
        waitForConnection(ws, function () {
            ws.send(
                `/app/chat/message`,
                JSON.stringify(
                    {
                        type: 'TALK',
                        roomId,
                        sender,
                        content: chatBody,
                    }
                    // content
                ),
                {
                    Access_Token: localStorage.getItem('Access_Token'),
                }
            )
        })
        setChatBody('')
        return -1
    }
    const appKeyPress = (e: { key: string }) => {
        if (e.key === 'Enter') {
            onSubmitHandler()
            setChatBody('')
        }
    }

    // const { id: paramId } = useParams()

    // const [roomId, setRoomId] = useState(paramId)
    // const [room, setRoom] = useState({ name: '' })
    // const [sender, setSender] = useState('')
    // const [message, setMessage] = useState('')
    // // const [messages, setMessages] = useState([])

    // const navigate = useNavigate()
    // // alert(document.title);
    // // websocket & stomp initialize
    // const client = new StompJs.Client()
    // client.brokerURL = 'ws://localhost:15674/ws'

    // console.log(client.brokerURL)

    // const config = {
    //     brokerURL: 'ws://222.103.213.25:8081/ws/chat',
    //     connectHeaders: {
    //         Access_Token: window.localStorage.getItem('token'),
    //     },
    // }

    // const findRoom = async () => {
    //     const result = await axios.get(
    //         `http://222.103.213.25:8081/chat/room/${roomId}`
    //     )
    //     setRoom(result.data)
    // }

    // const sendMessage = () => {
    //     send(
    //         '/app/chat/message',
    //         {},
    //         {
    //             type: 'TALK',
    //             roomId,
    //             sender,
    //             message,
    //         }
    //     )
    //     setMessage('')
    // }

    // // const recvMessage = (recv: {
    // //     type: string
    // //     sender: string
    // //     message: string
    // // }) => {
    // //     const aaa = [
    // //         {
    // //             type: recv.type,
    // //             sender: recv.type === 'ENTER' ? '[알림]' : recv.sender,
    // //             message: recv.message,
    // //         },
    // //         ...messages,
    // //     ]
    // //     setMessages(aaa)
    // // }

    // // function connect() {
    // //     // pub/sub event
    // //     ws.connect(
    // //         {},
    // //         function () {
    // //             ws.subscribe(`/topic/chat/room/${roomId}`, function (params) {
    // //                 const recv = JSON.parse(params.body)
    // //                 recvMessage(recv)
    // //             })
    // //             ws.send(
    // //                 '/app/chat/message',
    // //                 {},
    // //                 JSON.stringify({
    // //                     type: 'ENTER',
    // //                     roomId,
    // //                     sender,
    // //                 })
    // //             )
    // //         },
    // //         function () {
    // //             const addReconnect = reconnect + 1
    // //             if (addReconnect <= 5) {
    // //                 setTimeout(function () {
    // //                     console.log('connection reconnect')
    // //                     ws = Stomp.over(sock)
    // //                     connect()
    // //                 }, 10 * 1000)
    // //             }
    // //             setReconnect(addReconnect)
    // //         }
    // //     )
    // // }

    // useEffect(() => {
    //     setRoomId(localStorage.getItem('wschat.roomId'))
    //     setSender(localStorage.getItem('wschat.sender'))
    //     findRoom()
    //     // subscribe(`/topic/chat/room/${roomId}`)
    //     // connect()
    // }, [])

    return (
        <>
            <div>
                <button type="button" onClick={() => navigate(`/chat`)}>
                    돌아가기
                </button>
            </div>
            <div>
                <div>
                    <h2>room.name</h2>
                </div>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">내용</span>
                    </div>
                    <input
                        type="text"
                        value={chatBody}
                        onChange={inputHandler}
                        className="form-control"
                        onKeyPress={appKeyPress}
                    />
                    <div className="input-group-append">
                        <button
                            id="text"
                            className="btn btn-primary"
                            type="button"
                            onClick={onSubmitHandler}
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
