import { FormEvent } from 'react'
import styled from 'styled-components'

const MessageRoomLayOut = styled.div`
    width: 1124px;
    heigth: 1000px;
`

function MessageRoom() {
    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // console.log('sdsds')
    }

    return (
        <MessageRoomLayOut>
            <form onSubmit={submitHandler}>
                <input type="text" />
                <button type="submit">전송</button>
            </form>
        </MessageRoomLayOut>
    )
}
export default MessageRoom

// Todo: 레이아웃에 패딩 왜있는거지?
