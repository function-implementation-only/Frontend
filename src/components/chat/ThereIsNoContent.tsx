import styled from 'styled-components'

const MessageRow = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
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
const NoReadContentText = styled.p`
    font-weight: bold;
    font-size: 18px;
`

export default function ThereIsNoContent() {
    return (
        <MessageRow>
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
        </MessageRow>
    )
}
