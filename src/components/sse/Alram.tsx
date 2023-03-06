import styled from 'styled-components'
import { useEffect } from 'react'

type ItemDetail = {
    applymentId: number
    created_at: string
    receiver: string
    sender: string
    senderNickname: string
}
type PropType = {
    setDetail: (prev: any) => any
    detail: ItemDetail[]
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: calc(-100vh + 100px);
    right: 30px;
    width: 350px;
    height: 80px;
    border-radius: 5px;
    border: 1px solid #ff9c30;
    cursor: pointer;
    padding: 15px 20px;
    gap: 10px;
`
const AlramTitle = styled.h3`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    margin-left: auto;
`
const ApplicationText = styled.p`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #b0b0b0;
    margin-left: auto;
`

function Alram({ detail, setDetail }: PropType) {
    const removeAlram = () => {
        setTimeout(() => {
            setDetail((prev: ItemDetail[]) => prev.slice(1))
        }, 5000)
    }

    useEffect(() => {
        if (detail.length > 0) {
            removeAlram()
        }
    }, [detail])

    if (detail?.length) {
        return (
            <Container>
                <AlramTitle>
                    {detail[0].sender || 'nickname 님의 신청'}
                </AlramTitle>
                <ApplicationText>확인하러 가기</ApplicationText>
            </Container>
        )
    }
    return null
}

export default Alram
