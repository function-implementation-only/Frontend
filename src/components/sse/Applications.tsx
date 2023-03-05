import React from 'react'
import styled from 'styled-components'

const ApplicationLayout = styled.div`
    display: flex;
    width: 500px;
    heigth: 99px;
    padding: 16px;
    z-index: 49;
    background-color: #ffffff;
    border-radius: 8px;
    cursor: pointer;
`
const ApplicationBodyRow = styled.div`
    display: flex;
    flex-direction: column;
    width: 252px;
    height: 67px;
    gap: 4px;
    padding-left: 24px;
    position: relative;
`
const ApplicationH3 = styled.h3`
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
const ApplicationData = styled.p`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #b0b0b0;
    margin-top: auto;
`
const NotofictaionPoint = styled.div`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #ff9c30;
    position: absolute;
    top: calc(50% - 4px);
    left: 0px;
`
const NextButton = styled.button`
    all: unset;
    margin-left: auto;
`

const NextIcon = styled.svg`
    /* margin-left: auto; */
    width: 24px;
    color: black;
`

function Applications({ text }: { text: string }) {
    const handleApplimentClick = () => {
        console.log('핸들 어플라이먼트 클릭')
    }
    return (
        <ApplicationLayout onClick={handleApplimentClick}>
            <ApplicationBodyRow>
                <NotofictaionPoint />
                <ApplicationH3>제목</ApplicationH3>
                <ApplicationText>{text}</ApplicationText>
                <ApplicationData>날짜</ApplicationData>
            </ApplicationBodyRow>
            <NextButton type="button">
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
            </NextButton>
        </ApplicationLayout>
    )
}

export default Applications
