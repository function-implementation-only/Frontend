import styled from 'styled-components'
import ChatSection from '../../components/auth/ChatSession'

const AuthMessengerLayout = styled.div`
    display: flex;
    height: calc(100vh - 100px);
    max-height: 100%;
`

const AuthMessengerBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 1em;
    p {
        text-align: center;
        font-weight: 600;
        font-size: 1.2rem;
        color: var(--primary-color);
    }
`

function AuthMessenger() {
    return (
        <AuthMessengerLayout>
            <ChatSection />
            <AuthMessengerBox>
                <p>
                    선택된 채팅이 없습니다.
                    <br />
                    <br />
                    좌측 메뉴에 있는 채팅방을 선택하거나,
                    <br />
                    좌측 상단에 새로운 메시지 추가하기 버튼을 클릭하여 채팅을
                    시작해주세요.
                </p>
            </AuthMessengerBox>
        </AuthMessengerLayout>
    )
}

export default AuthMessenger
