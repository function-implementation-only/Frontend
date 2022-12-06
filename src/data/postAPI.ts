import axios from 'axios'

const BASE_URL = 'https://veloce.o-r.kr:8080/api'

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        // Access_Token:
        //     'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkdWR3bnMwOTIxQGdtYWlsLmNvbSIsImV4cCI6MTY3MDM3NjA2MCwiaWF0IjoxNjcwMjg5NjYwfQ.RZ4TdySOKTGki233aL6BlBxsErS61gLARadtQU9Y8ws',
        'Content-Type': 'multipart/form-data',
    },
})

function postAnnouncement(payload: FormData) {
    return instance.post('/posts', payload)
}

export default postAnnouncement
