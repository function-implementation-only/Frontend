import axios from 'axios'
import { useQuery } from 'react-query'

const useChatRooms = () => {
    const result = axios.get('http://localhost:7777/api/rooms', {
        headers: {
            Access_Token: window.localStorage.getItem('token') || '',
        },
    })
    return useQuery(['chat/roomList'], async () => {
        const data = await result
        return data.data.data || []
    })
}

export default useChatRooms
