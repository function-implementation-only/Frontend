import { ContextInterface } from '../context'

declare global {
    interface Window {
        context: ContextInterface
    }
}
