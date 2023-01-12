import dayjs from 'dayjs'
import { ContentResponse } from 'src/types/response'
import { PARSE_CONSTANT, RESPONSE_TYPE } from '../../../lib/constants'
import { ParserInterface } from '../../../types/parser'

class GetPostResponseParser implements ParserInterface {
    getResponseType() {
        return RESPONSE_TYPE.POST.GET
    }

    getParser() {
        return (response: ContentResponse) => {
            response.category = PARSE_CONSTANT[response.category]
            response.place = PARSE_CONSTANT[response.place]
            response.duration = PARSE_CONSTANT[response.duration]
            response.startDate = dayjs(response.startDate).format('YYYY.MM.DD')
            return response
        }
    }
}

export default GetPostResponseParser
