import { EventSourcePolyfill } from 'event-source-polyfill'

// todo: hooks 폴더로 옮길것.

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

    return { sseEvent: es }
}

export default sseEvent
