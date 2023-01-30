import GetAllPostResponseParser from './getAllPostParser'
import GetPostResponseForUpdateParser from './getPostForUpdateParser'
import GetPostResponseParser from './getPostParser'

const parsers = [
    GetAllPostResponseParser,
    GetPostResponseParser,
    GetPostResponseForUpdateParser,
]

export default parsers
