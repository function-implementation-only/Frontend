import { EventSourcePolyfill } from 'event-source-polyfill'
import useGetAccountInfo from 'hooks/useGetAccountInfo'
import { MyAccount } from 'pages/ChatPage'

// todo: 여기 있어도 좋은가?

function sseEvent() {
    const { data: accountData }: { data: MyAccount } = useGetAccountInfo()

    if (accountData.data.accountId) {
        const domain = import.meta.env.VITE_API_END_POINT
        const es = new EventSourcePolyfill(`${domain}notifications/subscribe`, {
            headers: {
                Access_Token: localStorage.getItem('token'),
                'Content-Type': 'text/event-stream',
            },
        })

        return es
    }
    return null
}

export default sseEvent
