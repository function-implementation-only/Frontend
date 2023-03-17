import styled from 'styled-components'
import { useAppDispatch } from 'src/store/hooks'
import { useEffect } from 'react'
import { setpopupIsShowing } from 'src/store/features/popup/PopupSlice'
import SpinnerComponent from 'components/SpinnerComponent'

const Overlay = styled.div`
    animation: fadeIn 0.5s forwards;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const PopupLayout = styled.div`
    animation: zoomIn 0.5s forwards;
    width: 500px;
    height: 200px;
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
    svg {
        font-size: 50px;
        color: #ff3257;
        margin-top: 56px;
    }
    p {
        font-weight: 700;
        font-size: 16px;
        margin-top: 26px;
    }
`

const LoadingPopup: React.FC = () => {
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
                    <div>
                        <SpinnerComponent />
                    </div>
                    <p>처리중입니다...</p>
                </ContentBox>
            </PopupLayout>
        </Overlay>
    )
}

export default LoadingPopup
