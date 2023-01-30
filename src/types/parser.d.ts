export interface ParserInterface {
    getResponseType: () => string
    getParser: () => Function
}
