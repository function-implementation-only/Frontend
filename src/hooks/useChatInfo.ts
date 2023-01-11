import { ChatRoom } from '../types/chat'

function timeForToday(value?: string) {
    if (value == null) {
        return 'New!'
    }
    const today = new Date()
    const timeValue = new Date(value)

    const betweenTime = Math.floor(
        (today.getTime() - timeValue.getTime()) / 1000 / 60
    )
    if (betweenTime < 1) return '방금전'
    if (betweenTime < 60) {
        return `${betweenTime}분전`
    }

    const betweenTimeHour = Math.floor(betweenTime / 60)
    if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간전`
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24)
    if (betweenTimeDay < 365) {
        return `${betweenTimeDay}일전`
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`
}

const useChatRoomInfo = (chat: ChatRoom) => {
    const last = chat?.chatList.sort(
        (a, b) =>
            new Date(a.sendDate).getTime() - new Date(b.sendDate).getTime()
    )

    const sendUser = () => {
        if (Number(last[0]?.sender) === chat?.joinUserId) {
            return chat?.joinUserNickname
        }
        return chat?.postUserNickname
    }

    return {
        date: timeForToday(last[0]?.sendDate),
        name: sendUser(),
        lastMessage: last[0]?.message,
    }
}

export default useChatRoomInfo
