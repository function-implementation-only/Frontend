import axios from 'axios'
import dayjs from 'dayjs'
import { ContentResponse } from 'src/types/response'
import {
    COLLABORATION_TOOL,
    PARSE_CONSTANT,
    RESPONSE_TYPE,
} from '../../../lib/constants'
import { ParserInterface } from '../../../types/parser'

class GetPostResponseParser implements ParserInterface {
    getResponseType() {
        return RESPONSE_TYPE.POST.GET
    }

    getParser() {
        return async (response: ContentResponse) => {
            response.category = PARSE_CONSTANT[response.category]
            response.place = PARSE_CONSTANT[response.place]
            response.duration = PARSE_CONSTANT[response.duration]
            response.createdAt = dayjs(response.createdAt).format('YYYY.MM.DD')

            const { data } = await axios.get(response.contentUrl)
            response.contentsParsed = data

            const techs: string[] = []
            const collaborationTool: string[] = []

            response.techs.forEach((item) => {
                if (COLLABORATION_TOOL.find((e) => e.title === item.tech)) {
                    collaborationTool.push(item.tech)
                } else {
                    techs.push(item.tech)
                }
            })

            response.techs = techs
            response.collaborationTool = collaborationTool

            return response
        }
    }
}

export default GetPostResponseParser
