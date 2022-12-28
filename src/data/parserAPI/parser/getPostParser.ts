import { RESPONSE_TYPE } from '../../../lib/constants'
import { ParserInterface } from '../../../types/parser'

class GetPostResponseParser implements ParserInterface {
    getResponseType() {
        return RESPONSE_TYPE.POST.GET
    }

    getParser() {
        return () => {
            console.log('getPostResponse parsing')
        }
    }
}

export default GetPostResponseParser
