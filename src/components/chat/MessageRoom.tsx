import { FormEvent } from 'react'

function MessageRoom() {
    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log('sdsds')
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <input type="text" />
                <button type="submit">전송</button>
            </form>
        </div>
    )
}
export default MessageRoom
