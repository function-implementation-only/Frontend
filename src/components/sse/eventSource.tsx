import { EventSourcePolyfill } from 'event-source-polyfill'

// todo: 여기 있어도 좋은가?

function sseEvent() {
    const es = new EventSourcePolyfill(
        'http://121.180.179.245:8000/main-service/notifications/subscribe',
        {
            headers: {
                Access_Token: localStorage.getItem('token'),
                'Content-Type': 'text/event-stream',
            },
        }
    )

    return es
}

export default sseEvent
