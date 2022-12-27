import { RESPONSE_TYPE } from '../../../lib/constants'

export interface ParserInterface {
    getResponseType: () => string
    getParser: () => Function
}

export class GetAllPostResponseParser implements ParserInterface {
    getResponseType() {
        return RESPONSE_TYPE.POST.GET_ALL
    }

    getParser() {
        return () => {
            console.log('getAllPostResponse parsing')
        }
    }
}
