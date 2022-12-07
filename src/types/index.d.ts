import { ContextInterface } from '../context'

export {}

declare global {
    interface Window {
        context: ContextInterface
    }
}
