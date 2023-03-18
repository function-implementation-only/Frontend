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
    &:hover {
        background-color: #ffecd6;
    }
`
const ApplicationBodyRow = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 67px;
    gap: 4px;
    padding-left: 24px;
    position: relative;
`
const ApplicationH3 = styled.h3`
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
`
const ApplicationText = styled.p`
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #b0b0b0;
`
const ApplicationData = styled.p`
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
type ItemDetail = {
    applymentId: number
    created_at: string
    receiver: string
    sender: string
    senderNickname: string
}

type Applictations = {
    onClick: (id: number) => void
    detail: ItemDetail
}

function Applications({ onClick, detail }: Applictations) {
    const date = new Date(detail.created_at)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return (
        <ApplicationLayout onClick={() => onClick(detail.applymentId)}>
            <ApplicationBodyRow>
                <NotofictaionPoint />
                <ApplicationH3>
                    {detail.senderNickname} 님이 내 공고에 지원했어요!
                </ApplicationH3>
                <ApplicationText>어떤 사람인지 확인해 볼까요?</ApplicationText>
                <ApplicationData>
                    {year}. {month}. {day}
                </ApplicationData>
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
