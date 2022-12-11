import styled from 'styled-components'
import { useForm } from 'react-hook-form'

const WriteForm = styled.form`
    width: 100%; // calc(100% - 50px);
    height: 120px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
`

const MessageArea = styled.textarea`
    resize: none;
    height: 100px;
    padding: 10px;
    margin: 5px 10px;
    outline: none;
    border: none;
    border-bottom: 1px solid var(--gray-100);
    border-radius: 10px 10px;
`

const ActionBox = styled.button`
    width: 60px;
    padding: 5px;
    margin: 5px 10px;
    border-radius: 10px;
    transition: color 200ms ease-out;
    cursor: pointer;
    &:hover {
        color: var(--primary);
    }
`

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

export default function LauncherWriteComponent({ onSendMessage }: WriteProps) {
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
