import Logger from 'utils/logger'

function useLogger(origin: string) {
    return new Logger(origin)
}

export default useLogger
