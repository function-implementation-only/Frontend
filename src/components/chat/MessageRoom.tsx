import { useRef } from 'react'
import styled from 'styled-components'

// TODO: 아래 타입 데이터는 중복데이터임 한곳에서 관리하면 좋을듯.
type MessageItemProps = {
    id: string
    name: string
    content: string
    time: string
    avatar: string
    email: string
}

const ChatInputRow = styled.form`
    width: 1124;
    height: 88px;
    display: flex;
    aligin-items: center;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: auto;
`
const ChatInput = styled.input`
    width: 984px;
    height: 40px;
    border-radius: 10px;
    background: #f0f0f0;
    border: none;
    padding-left: 12px;

    &:focus {
        outline: none;
    }
`

const MessageRoomLayOut = styled.div`
    width: 1124px;
    heigth: 1000px;
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
`
const NoReadContentBox = styled.div`
    width: 252px;
    display: flex;
    flex-direction: column;
    align-self: center;
    align-items: center;
    margin-top: auto;
    margin-bottom: auto;
`
const NoReadContentIcon = styled.svg`
    width: 78px;
    height: 78px;
    margin-bottom: 12px;
`
const SmileIcon = styled.svg`
    width: 20px;
    height: 20px;
    cursor: pointer;
`

const AddPictureIcon = styled(SmileIcon)``

const SubmitButtonIcon = styled.label`
    background: transparent;
    cursor: pointer;
`
const NoReadContentText = styled.p`
    font-weight: bold;
    font-size: 18px;
`

function MessageRoom({ list }: { list: MessageItemProps[] }) {
    const inputRef = useRef<HTMLInputElement>(null)
    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault()

        // console.log('sdsds')
    }

    return (
        <MessageRoomLayOut>
            {list.length ? (
                <ChatInputRow onSubmit={submitHandler}>
                    <AddPictureIcon
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        color="#ff9c30"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                    </AddPictureIcon>

                    <SmileIcon
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        color="#ff9c30"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                        />
                    </SmileIcon>

                    <ChatInput ref={inputRef} />

                    <input
                        type="submit"
                        id="submitBtn"
                        style={{ display: 'none' }}
                    />
                    <SubmitButtonIcon htmlFor="submitBtn">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1"
                            stroke="currentColor"
                            preserveAspectRatio="xMidYmid meet"
                            width={20}
                            height={20}
                            color="#ff9c30"
                            transform="rotateZ(45deg)"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                            />
                        </svg>
                    </SubmitButtonIcon>
                </ChatInputRow>
            ) : (
                <NoReadContentBox>
                    <NoReadContentIcon
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        color="#ff9c30"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </NoReadContentIcon>
                    <NoReadContentText>
                        안 읽은 메세지가 없습니다.
                    </NoReadContentText>
                </NoReadContentBox>
            )}
        </MessageRoomLayOut>
    )
}
export default MessageRoom

// Todo: 레이아웃에 패딩 왜있는거지?
