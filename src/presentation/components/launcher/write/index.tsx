import { useForm } from 'react-hook-form'
import { ActionBox, MessageArea, WriteForm } from './index.style'

export interface MessageData {
    message: string
    email: string
}
interface WriteFormData {
    message: string
}

interface WriteProps {
    onSendMessage: (messageData: MessageData) => void
}

export default function Write({ onSendMessage }: WriteProps) {
    const { register, handleSubmit, reset } = useForm<WriteFormData>()

    const onSubmit = async (data: WriteFormData) => {
        const email = 'session?.user?.email'
        const chatRoomId = 'router.query.chatRoomId?.toString()'
        if (!data.message.trim() || !email || !chatRoomId) return
        // await mutation({ email, chatRoomId, ...data });
        onSendMessage({ ...data, email })
        reset()
    }

    return (
        <WriteForm onSubmit={handleSubmit(onSubmit)}>
            <MessageArea
                {...register('message', { required: true })}
                placeholder="내용을 작성해 주세요."
            />
            <ActionBox>
                <button type="submit">보내기</button>
            </ActionBox>
        </WriteForm>
    )
}
