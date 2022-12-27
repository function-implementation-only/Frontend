import { PARSE_CONSTANTS, RESPONSE_TYPE } from '../../../lib/constants'
import { PostResponse } from '../../../types/response'

export interface ParserInterface {
    getResponseType: () => string
    getParser: () => Function
}

export class GetAllPostResponseParser implements ParserInterface {
    getResponseType() {
        return RESPONSE_TYPE.POST.GET_ALL
    }

    getParser() {
        return (responses: PostResponse[]) => {
            return responses.map((response: PostResponse) => {
                response.category = PARSE_CONSTANTS[response.category]
                response.place = PARSE_CONSTANTS[response.place]
                return response
            })
        }
    }
}
