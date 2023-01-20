import { PARSE_CONSTANT, RESPONSE_TYPE } from '../../../lib/constants'
import { ParserInterface } from '../../../types/parser'
import { ContentResponse } from '../../../types/response'

class GetAllPostResponseParser implements ParserInterface {
    getResponseType() {
        return RESPONSE_TYPE.POST.GET_ALL
    }

    getParser() {
        return (responses: ContentResponse[]) => {
            return responses.map((response: ContentResponse) => {
                response.category = PARSE_CONSTANT[response.category]
                response.place = PARSE_CONSTANT[response.place]
                response.duration = PARSE_CONSTANT[response.duration]
                return response
            })
        }
    }
}

export default GetAllPostResponseParser
