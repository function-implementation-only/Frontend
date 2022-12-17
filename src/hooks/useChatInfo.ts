import { useCallback } from 'react'

import { ChatRoomWithUser, User } from '../types/chat'

const useChatRoomInfo = (chatRoom: ChatRoomWithUser) => {
    // const user = useUser();
    const user: User = {
        id: 'string',
        name: 'string | null',
        email: 'string | null',
        image: 'string | null',
    }

    const getName = useCallback(
        (chatListByUsers: User[]) =>
            chatListByUsers.find((chatUser) => chatUser.email !== user?.email)
                ?.name,
        [user?.email]
    )

    return {
        date: chatRoom.chats[0]?.createAt?.toISOString?.(),
        name: getName(chatRoom.users),
        lastMessage: chatRoom.chats[0]?.message,
    }
}

export default useChatRoomInfo
