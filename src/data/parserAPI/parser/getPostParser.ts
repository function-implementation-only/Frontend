import { RESPONSE_TYPE } from '../../../lib/constants'

export interface ParserInterface {
    getResponseType: () => string
    getParser: () => Function
}

export class GetPostResponseParser {
    getResponseType() {
        return RESPONSE_TYPE.POST.GET
    }

    getParser() {
        return () => {
            console.log('getPostResponse parsing')
        }
    }
}
