import styled, { keyframes } from 'styled-components'
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
    handleListShow: () => void
    detail: ItemDetail[]
}

const fadeIn = keyframes`
    0% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0.2;
    }
    
`

const Container = styled.div`
    display: flex;
    position: absolute;
    bottom: calc(-100vh + 100px);
    right: 30px;
    width: 350px;
    height: 80px;
    border-radius: 5px;
    border: 1px solid #ff9c30;
    cursor: pointer;
    padding: 15px 20px;
    background-color: #ffffff;
    animation: ${fadeIn} 5s infinite;
    box-shadow: 3px 3px 5px gray;
`
const Logo = styled.img`
    width: 80px;
    height: 100%;
    object-fit: fill;
`
const TextColumn = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    margin-left: auto;
    margin-right: auto;
    gap: 10px;
`
const AlramTitle = styled.h3`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
`
const ApplicationText = styled.p`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #b0b0b0;
`
const NextIcon = styled.svg`
    /* margin-left: auto; */
    width: 24px;
    color: black;
`

function Alram({ detail, setDetail, handleListShow }: PropType) {
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
            <Container onClick={handleListShow}>
                <Logo src="/assets/images/Logo.svg" alt="logoImg" />
                <TextColumn>
                    <AlramTitle>{`${detail[0]?.senderNickname} 님의 신청`}</AlramTitle>
                    <ApplicationText>확인하러 가기</ApplicationText>
                </TextColumn>
                <NextIcon
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="black"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                </NextIcon>
            </Container>
        )
    }
    return null
}

export default Alram
