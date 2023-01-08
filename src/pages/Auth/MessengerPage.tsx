import styled from 'styled-components'
import ChatCommonRoomsSection from 'components/auth/ChatCommonRoomsSection'
import ChatFoundSection from 'components/auth/chat/ChatFoundSection'
import useChatRooms from 'hooks/useChatRooms'
import CoffeeChatSvg from 'img/coffee-chat.svg'

const ChatViewLayout = styled.div`
    display: flex;
    height: calc(100vh - 100px);
    max-height: 100%;
`

const ChatNotFoundSection = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 1em;
    .coffee-top {
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 29px;
        color: #333333;
        padding: 10px 0px;
    }

    .coffee-bottom {
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 100%;
        color: #b0b0b0;
    }
`

function Messenger() {
    const { data } = useChatRooms()
    // TODO: 메세지를 선택하면 Props 로 전달

    return (
        <ChatViewLayout>
            <ChatCommonRoomsSection />
            {data?.data?.data != null ? (
                <ChatFoundSection />
            ) : (
                <ChatNotFoundSection>
                    <img src={CoffeeChatSvg} alt="" />
                    <p className="coffee-top">메세지 선택하기</p>
                    <p className="coffee-bottom">
                        기존 대화에서 선택하거나 새로운 대화를 시작해보세요
                    </p>
                </ChatNotFoundSection>
            )}
        </ChatViewLayout>
    )
}

export default Messenger
