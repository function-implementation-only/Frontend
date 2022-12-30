import ChatMessageBar from './ChatMessageBar'
import ChatMessageView from './ChatMessageView'

export default function ChatFoundSection() {
    return (
        <div style={{ width: '100%' }}>
            <ChatMessageView />
            <ChatMessageBar />
        </div>
    )
}
