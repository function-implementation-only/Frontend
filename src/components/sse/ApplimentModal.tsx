import React from 'react'
import Modal from 'components/Modal'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

type ApplymentDetail = {
    accountId: number
    applymentId: number
    comment: string
    introduction: string
    nickname: string
    position: string
    postId: number
    imgUrl: string
}

interface Props {
    isShowing: boolean
    handleShowing: () => void
    detail: ApplymentDetail
}

const ModalLayout = styled.div`
    min-width: 500px;
    height: 657px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 48px 24px 0px;
    gap: 24px;
`
const DetailHeaderRow = styled.h1`
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    color: #ff9c30;
`
const ProfileRow = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    gap: 8px;

    width: 250px;
    height: 129px;
`
const ProfileImage = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #d9d9d9;
`
const PofileNickname = styled.h3`
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;

    color: #000000;
`
const ProfileDetaile = styled.p`
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #cbcbcb;
`

const PositionRow = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 8px;

    width: 400px;
    height: 84px;
`
const Position = styled(PofileNickname)``

const PositionValue = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px;
    gap: 10px;
    width: 400px;
    height: 39px;
    background: #ffffff;
    border: 1px solid #ff9c30;
    border-radius: 10px;
`
const ApplyCommnetRow = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 8px;
    width: 400px;
    height: 177px;
`
const ApplyCommentTitle = styled(PofileNickname)``

const ApplyComment = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 8px;
    gap: 10px;
    width: 400px;
    height: 150px;
    border: 1px solid #ff9c30;
    border-radius: 10px;
`
const ButtonRow = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    margin-top: auto;
    width: 500px;
    height: 70px;
    border-top: 1px solid #ced4da;
`
const ButtonLeft = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px;
    gap: 10px;
    width: 250px;
    height: 70px;
    background: #ffffff;
    border-right: 1px solid #ced4da;
    border-radius: 0px 0px 0px 20px;
    :hover {
        background: #f4f4f4;
    }
`
const ButtonRight = styled(ButtonLeft)`
    border-radius: 0px 0px 20px 0px;
`
const ButtonText = styled.p`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #ff3257;
`

const ApplimentModal: React.FC<Props> = ({
    isShowing,
    handleShowing,
    detail,
}) => {
    const navigate = useNavigate()
    const handleCoffeChat = () => {
        navigate('/chat')
        handleShowing()
    }

    return (
        <Modal isOpen={isShowing} onClose={handleShowing}>
            <ModalLayout>
                <DetailHeaderRow>지원자 확인</DetailHeaderRow>
                <ProfileRow>
                    <ProfileImage src={detail?.imgUrl} />
                    <PofileNickname>
                        {detail?.nickname || '닉네임을 확인할 수 없습니다'}
                    </PofileNickname>
                    <ProfileDetaile>
                        {detail?.introduction ?? '...'}
                    </ProfileDetaile>
                </ProfileRow>
                <PositionRow>
                    <Position>지원하신 포지션</Position>
                    <PositionValue>
                        {detail?.position ||
                            '지원한 포지션을 확인할 수 없습니다'}
                    </PositionValue>
                </PositionRow>
                <ApplyCommnetRow>
                    <ApplyCommentTitle>지원 사유</ApplyCommentTitle>
                    <ApplyComment>
                        {detail?.comment || '지원사유를 작성하지 않았습니다'}
                    </ApplyComment>
                </ApplyCommnetRow>
                <ButtonRow>
                    <ButtonLeft onClick={handleShowing}>
                        <ButtonText>취소</ButtonText>
                    </ButtonLeft>
                    <ButtonRight onClick={handleCoffeChat}>
                        <ButtonText style={{ color: '#FF9C30' }}>
                            커피챗 보기
                        </ButtonText>
                    </ButtonRight>
                </ButtonRow>
            </ModalLayout>
        </Modal>
    )
}
export default ApplimentModal
