import parsers from './parser'

export interface ParserAPIInterface {
    parserMap: Map<string, Function>
    parse: (response_type: string, apiResponse: Object) => Object
}

export class ParserAPI implements ParserAPIInterface {
    parserMap: Map<string, Function>

    constructor() {
        this.parserMap = new Map()
        parsers.forEach((ParserClass) => {
            const parser = new ParserClass()
            this.parserMap.set(parser.getResponseType(), parser.getParser())
        })
    }

    parse(response_type: string, apiResponse: Object) {
        return this.parserMap.get(response_type)(apiResponse)
    }
}
