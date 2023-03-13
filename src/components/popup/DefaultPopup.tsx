import styled from 'styled-components'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { PopupProps } from 'types/popup'
import { useAppDispatch } from 'src/store/hooks'
import { useEffect } from 'react'
import { setpopupIsShowing } from 'src/store/features/popup/PopupSlice'

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
        color: #ff3257;
        margin-top: 56px;
    }
    span {
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

    font-weight: 700;
    font-size: 16px;
    background-color: #fff;
    border: none;
    color: #ff9c30;
    cursor: pointer;
    border-radius: 0 0 20px 20px;
    ${(props) =>
        props.buttonsLen >= 2 && props.buttonIdx !== 0
            ? 'border-left: 1px solid #ced4da;'
            : ''}
    ${(props) =>
        props.buttonsLen >= 2 && props.buttonIdx === 0
            ? 'border-radius: 0 0 0 20px;'
            : ''}
    ${(props) =>
        props.buttonsLen >= 2 && props.buttonIdx === props.buttonsLen - 1
            ? 'border-radius: 0 0 20px 0;'
            : ''}
`
const DefaultPopup: React.FC<PopupProps> = ({
    content,
    buttons,
    type,
}: PopupProps) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(
            setpopupIsShowing({
                popupIsShowing: true,
            })
        )
        return () => {
            dispatch(
                setpopupIsShowing({
                    popupIsShowing: false,
                })
            )
        }
    }, [])

    return (
        <Overlay>
            <PopupLayout>
                <ContentBox>
                    {type === 'check' ? (
                        <CheckCircleOutlineIcon />
                    ) : (
                        <ErrorOutlineOutlinedIcon />
                    )}
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
