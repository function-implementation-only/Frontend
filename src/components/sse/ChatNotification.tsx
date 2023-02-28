import { Dispatch, SetStateAction } from 'react'

type NotificationType = {
    id: number
    tag: string
    title: string
    message: string
    isShowing: boolean
    notifications: ChatNotification[]
    setNotification: Dispatch<SetStateAction<ChatNotification[]>>
}

class ChatNotification {
    id

    tag

    title

    message

    isShowing = false

    setNotification

    notifications

    constructor({
        id,
        tag,
        message,
        title,
        setNotification,
        notifications,
    }: NotificationType) {
        this.id = id
        this.tag = tag
        this.message = message
        this.title = title
        this.setNotification = setNotification
        this.notifications = notifications
        this.setMessage()
    }

    setMessage = () => {
        this.setNotification((prev) => [...prev, { ...this }])
    }

    getIndex = () => {
        return this.notifications.findIndex((noti) => noti.id === this.id)
    }

    showMessage = () => {
        const index = this.getIndex()
        // Todo: 첫번째 인덱스일때 바로 메세지 show
        if (index <= 0) return {}
        console.log('do something')

        return ''
    }
}

export default ChatNotification
