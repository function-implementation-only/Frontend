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
        // TODO: Status 에서 유저 정보를 가져와야 함
        const email = 'troublesome.dev@gmail.com'
        const chatRoomId = '100'
        if (!data.message.trim() || !email || !chatRoomId) return
        // TODO: Validation 필요
        onSendMessage({ ...data, email })
        reset()
    }

    return (
        <WriteForm onSubmit={handleSubmit(onSubmit)}>
            <MessageArea
                {...register('message', { required: true })}
                placeholder="내용을 작성해 주세요."
            />
            <ActionBox type="submit">보내기</ActionBox>
        </WriteForm>
    )
}
