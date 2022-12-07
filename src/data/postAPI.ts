import axios from 'axios'
import setInterceptors from './interceptor'

const instance = setInterceptors(axios.create())

function postAnnouncement(payload: FormData) {
    return instance.post('/posts', payload)
}

export default postAnnouncement
