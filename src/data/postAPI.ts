import axios from 'axios'
import setInterceptors from './interceptor'

class PostAPI {
    constructor() {
        this.instance = setInterceptors(axios.create())
    }

    private instance

    /**
     * postAnnouncement
     * 공고 작성 API
     */
    public postAnnouncement(payload: FormData) {
        return this.instance.post('/posts', payload)
    }
}

export default PostAPI
