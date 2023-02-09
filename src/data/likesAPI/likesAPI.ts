import { AxiosResponse } from 'axios'
import { APIResponse } from 'types/response'
import setInterceptors from '../interceptor'

export interface LikesAPIInterface {
    postLikes: (postId: string) => Promise<AxiosResponse<APIResponse<boolean>>>
}

export class LikesAPI implements LikesAPIInterface {
    postLikes(postId: string): Promise<AxiosResponse<APIResponse<boolean>>> {
        return setInterceptors.delete(`likes/${postId}`)
    }
}
