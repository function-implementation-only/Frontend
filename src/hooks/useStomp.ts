import { Client, StompConfig, StompSubscription } from '@stomp/stompjs'
import { useCallback, useEffect } from 'react'

interface ObjectType {
    [key: string]: any
}

let stompClient: Client
let isConnected = false
const subscriptions: { [key: string]: StompSubscription } = {}

export default function useStomp(config: StompConfig) {
    const connect = useCallback(() => {
        if (!stompClient) {
            stompClient = new Client(config)
            stompClient.activate()
        }

        stompClient.onConnect = () => {
            isConnected = true
        }
    }, [])

    const send = useCallback(
        (path: string, body: ObjectType, headers: ObjectType) => {
            stompClient.publish({
                destination: path,
                headers,
                body: JSON.stringify(body),
            })
        },
        [stompClient]
    )

    const subscribe = useCallback(
        <T>(path: string, callback: (msg: T) => void) => {
            if (!stompClient) return

            if (subscriptions[path]) return

            const subscription = stompClient.subscribe(path, (message) => {
                const body: T = JSON.parse(message.body)
                callback(body)
            })
            subscriptions[path] = subscription
        },
        []
    )

    const unsubscribe = useCallback((path: string) => {
        subscriptions[path].unsubscribe()
        delete subscriptions[path]
    }, [])

    const disconnect = useCallback(() => {
        stompClient.deactivate()
    }, [stompClient])

    useEffect(() => {
        connect()
    }, [])

    return {
        disconnect,
        subscribe,
        unsubscribe,
        subscriptions,
        send,
        isConnected,
    }
}
