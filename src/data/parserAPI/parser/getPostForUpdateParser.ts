import axios from 'axios'
import { ContentResponse } from 'src/types/response'
import { COLLABORATION_TOOL, RESPONSE_TYPE } from '../../../lib/constants'
import { ParserInterface } from '../../../types/parser'

class GetPostResponseForUpdateParser implements ParserInterface {
    getResponseType() {
        return RESPONSE_TYPE.POST.GET_UPDATE
    }

    getParser() {
        return async (response: ContentResponse) => {
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

export default GetPostResponseForUpdateParser
