import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ChatPage = () => {
    const [roomName, setRoomName] = useState('')
    const [chatRooms, setChatRooms] = useState([])
    const navigate = useNavigate()

    const findAllRoom = async () => {
        const result = await axios.get('http://127.0.0.1:8081/chat/rooms')
        setChatRooms(result.data)
    }

    const createRoom = async () => {
        if (roomName === '') {
            alert('방 제목을 입력해 주십시요.')
        } else {
            const params = new URLSearchParams()
            params.append('name', roomName)
            try {
                const result = await axios.post(
                    'http://127.0.0.1:8081/chat/room',
                    params
                )
                console.log(result.data.roomName)
                findAllRoom()
            } catch (error) {
                console.log('error', error)
                alert('채팅방 개설에 실패하였습니다.')
            }
        }
    }

    const enterRoom = (roomId: string) => {
        const sender = prompt('대화명을 입력해 주세요.')
        if (sender !== '') {
            localStorage.setItem('wschat.sender', sender)
            localStorage.setItem('wschat.roomId', roomId)
            navigate(`/chat/room/enter/${roomId}`)
        }
    }

    useEffect(() => {
        findAllRoom()
    }, [])

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <h3>채팅방 리스트</h3>
                </div>
            </div>
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">방제목</span>
                </div>
                <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setRoomName(e.target.value as string)}
                />
                <div className="input-group-append">
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={() => createRoom()}
                    >
                        채팅방 개설
                    </button>
                </div>
            </div>
            <ul className="list-group">
                {chatRooms.map((item) => (
                    <li
                        aria-hidden="true"
                        onClick={() => enterRoom(item.roomId)}
                        className="list-group-item list-group-item-action"
                        key={item.roomId}
                    >
                        {item.roomName}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default ChatPage
