class Logger {
    origin

    constructor(origin: string) {
        this.origin = origin
    }

    log(msg: any) {
        console.log(`[${this.origin}]`, msg)
    }
}

export default Logger
