// TODO: 메모
import StompJs from '@stomp/stompjs'

const client = new StompJs.Client({
    brokerURL: 'ws://127.0.01:6000/api/chat/room',
    connectHeaders: {
        login: 'user',
        passcode: 'password',
    },
    debug(str) {
        console.log(str)
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
})

client.onConnect = function t(frame) {
    console.log(`frame ${frame}`)
    // Do something, all subscribes must be done is this callback
    // This is needed because this will be executed after a (re)connect
}

client.onStompError = function t(frame) {
    // Will be invoked in case of error encountered at Broker
    // Bad login/passcode typically will cause an error
    // Complaint brokers will set `message` header with a brief message. Body may contain details.
    // Compliant brokers will terminate the connection after any error
    console.log(`Broker reported error: ${frame.headers.message}`)
    console.log(`Additional details: ${frame.body}`)
}

client.activate()
