import axios from 'axios'
import { PostAPIInterface } from './postAPI'

class PostAPIMock implements PostAPIInterface {
    instance

    constructor() {
        this.instance = axios.create()
    }

    /**
     * createPost
     * 공고 작성하기
     */
    public createPost(payload: FormData) {
        return this.instance.post('/posts', payload)
    }

    /**
     * getAllPosts
     * 모든 공고 가져오기
     */
    public getAllPosts() {
        return this.instance.get('/mock/posts.json')
    }

    /**
     * getOnePost
     * 공고 하나 가져오기
     */
    public getOnePost(id: string) {
        return this.instance.get(`/posts/${id}`)
    }

    /**
     * updatePost
     * 공고 업데이트하기
     */
    public updatePost(id: string, payload: FormData) {
        return this.instance.put(`/posts/${id}`, payload)
    }

    /**
     * deletePost
     * 공고 지우기
     */
    public deletePost(id: string) {
        return this.instance.delete(`/posts/${id}`)
    }
}

export default PostAPIMock
