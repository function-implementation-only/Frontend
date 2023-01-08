import { ChatRoom } from '../types/chat'

const useChatRoomInfo = (chats: ChatRoom) => {
    // const user: User = {
    //     id: 'string',
    //     name: 'string | null',
    //     email: 'string | null',
    //     image: 'string | null',
    // }

    // const getName = useCallback(
    //     (chatListByUsers: User[]) =>
    //         chatListByUsers.find((chatUser) => chatUser.email !== user?.email)
    //             ?.name,
    //     [user?.email]
    // )

    return {
        date: '2022-10',
        name: '이름',
        lastMessage: chats?.chatList?.reverse()[0],
    }
}

export default useChatRoomInfo
