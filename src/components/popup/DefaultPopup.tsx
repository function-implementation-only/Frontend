import React from 'react'
import styled from 'styled-components'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { PopupProps } from 'types/popup'

const Overlay = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const PopupLayout = styled.div`
    width: 500px;
    height: 270px;
    display: grid;
    flex-direction: column;
    grid-template-rows: 200px 70px;
    background-color: white;
    border-radius: 20px;
`

const ContentBox = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid #ced4da;
    svg {
        font-size: 50px;
        color: #ff9c30;
        margin-top: 56px;
    }
    span {
        font-family: 'Pretendard';
        font-weight: 700;
        font-size: 16px;
        margin-top: 26px;
    }
`

const ButtonBox = styled.div`
    display: flex;
`

const Button = styled.button<{
    buttonsLen: number
    buttonIdx: number
}>`
    width: 100%;
    height: 70px;
    font-family: 'Pretendard';
    font-weight: 700;
    font-size: 16px;
    background-color: #fff;
    border: none;
    color: #ff9c30;
    cursor: pointer;
    ${(props) =>
        props.buttonsLen >= 2 && props.buttonIdx !== 0
            ? 'border-left: 1px solid #ced4da;'
            : ''}
    ${(props) => (props.buttonIdx === 0 ? 'border-radius: 0 0 0 20px;' : '')}
    ${(props) =>
        props.buttonIdx === props.buttonsLen - 1
            ? 'border-radius: 0 0 20px 0;'
            : ''}
`
const DefaultPopup: React.FC<PopupProps> = ({ content, buttons }) => {
    function stopScrolling() {
        const bodyEl = window.document.body
        bodyEl.classList.add('noScroll')
    }
    stopScrolling()
    return (
        <Overlay>
            <PopupLayout>
                <ContentBox>
                    <CheckCircleOutlineIcon />
                    <span>{content}</span>
                </ContentBox>
                <ButtonBox>
                    {buttons.map((item, index) => (
                        <Button
                            buttonIdx={index}
                            buttonsLen={buttons.length}
                            key={item.label}
                            onClick={() => {
                                item.clickHandler()
                            }}
                        >
                            {item.label}
                        </Button>
                    ))}
                </ButtonBox>
            </PopupLayout>
        </Overlay>
    )
}

export default DefaultPopup
