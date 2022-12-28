import { PARSE_CONSTANT, RESPONSE_TYPE } from '../../../lib/constants'
import { ParserInterface } from '../../../types/parser'
import { PostResponse } from '../../../types/response'

class GetAllPostResponseParser implements ParserInterface {
    getResponseType() {
        return RESPONSE_TYPE.POST.GET_ALL
    }

    getParser() {
        return (responses: PostResponse[]) => {
            return responses.map((response: PostResponse) => {
                response.category = PARSE_CONSTANT[response.category]
                response.place = PARSE_CONSTANT[response.place]
                return response
            })
        }
    }
}

export default GetAllPostResponseParser
