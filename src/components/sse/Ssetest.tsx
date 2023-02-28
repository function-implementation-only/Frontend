import React from 'react'

function Ssetest() {
    if (!('Notification' in window)) {
        alert('This browser does not support Desktop Notification')
    } else if (Notification.permission === 'granted') {
        const noti = new Notification('hi JOINUS!!!', { body: '뭐야' })
    } else if (Notification.permission === 'denied') {
        Notification.requestPermission((permission) => {
            if (permission === 'granted') {
                const noti = new Notification('hi JOINUS!!!', {
                    body: '음',
                })
            } else {
                alert('You have blocked desktop notification.')
            }
        })
    }

    // const es = new EventSource('http://localhost:3000')

    // es.onopen = function () {
    //     console.log('es OPEN')
    // }
    // es.onmessage = function () {
    //     console.log('es MESSAGE')
    // }

    return (
        <div>
            <button type="button">크흠</button>
        </div>
    )
}

export default Ssetest
