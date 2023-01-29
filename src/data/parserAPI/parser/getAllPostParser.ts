import dayjs from 'dayjs'
import { PARSE_CONSTANT, RESPONSE_TYPE } from '../../../lib/constants'
import { ParserInterface } from '../../../types/parser'
import { ContentResponse } from '../../../types/response'

class GetAllPostResponseParser implements ParserInterface {
    getResponseType() {
        return RESPONSE_TYPE.POST.GET_ALL
    }

    getParser() {
        return (responses: ContentResponse[]) => {
            if (responses == null || responses.length === 0) return []
            return responses.map((response: ContentResponse) => {
                response.category = PARSE_CONSTANT[response.category]
                response.place = PARSE_CONSTANT[response.place]
                response.duration = PARSE_CONSTANT[response.duration]
                response.startDate = dayjs(response.startDate).format(
                    'YYYY.MM.DD'
                )
                return response
            })
        }
    }
}

export default GetAllPostResponseParser
