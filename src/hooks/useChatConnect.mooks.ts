import { MessageData } from '../presentation/components/launcher/LauncherWriteComponent'

const useChatConnect = (id: string) => {
    const chats = [
        {
            id: 1,
            user: {
                id: 100,
                name: '박경서',
                email: 'troublesome.dev@gmail.com',
                emailVerified: new Date('2019-12-11T12:20:30'),
                image: 'https://avatars.githubusercontent.com/u/45850400?v=4',
            },
            message: 'asds',
        },
        {
            id: 2,
            user: {
                id: 200,
                name: '박경서2',
                email: '2troublesome.dev@gmail.com',
                emailVerified: new Date('2020-12-11T12:20:30'),
                image: 'https://avatars.githubusercontent.com/u/45850400?v=4',
            },
            message: 'asds',
        },
        {
            id: 3,
            user: {
                id: 100,
                name: '박경서',
                email: 'troublesome.dev@gmail.com',
                emailVerified: new Date('2021-12-11T12:20:30'),
                image: 'https://avatars.githubusercontent.com/u/45850400?v=4',
            },
            message: 'asds',
        },
    ]

    const onSendMessage = (messageData: MessageData) => {
        console.info(`${id} hello`, messageData)
    }

    return { chats, onSendMessage }
}

export default useChatConnect
