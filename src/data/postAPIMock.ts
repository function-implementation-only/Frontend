import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { PostObj } from '../types/post'

export interface PostAPIMockInterface {
    instance: AxiosInstance
    createPost: (payload: FormData) => Promise<AxiosResponse>
    getAllPosts: () => Promise<AxiosResponse>
    getOnePost: (
        id: string | undefined
    ) => Promise<AxiosResponse<{ posts: PostObj[] }>>
    updatePost: (id: string, payload: FormData) => Promise<AxiosResponse>
    deletePost: (id: string) => Promise<AxiosResponse>
}
class PostAPIMock implements PostAPIMockInterface {
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
    public async getOnePost(id: string | undefined) {
        const idx = Number(id) - 1
        const { data } = await this.instance.get('/mock/posts.json')
        return data.posts[idx]
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
