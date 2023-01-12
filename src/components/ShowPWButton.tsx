/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components'
import React, { Dispatch, SetStateAction } from 'react'
import showPwImg from 'img/showPW.svg'
import hidePwImg from 'img/hidePW.svg'

const ShowPwButton = styled.button<{ top?: string; right?: string }>`
    position: absolute;
    top: ${({ top }) => top || '27%'};
    right: ${({ right }) => right || '137px'};
    width: auto;
    border: none;
    background-color: transparent;
    :hover {
        cursor: pointer;
    }
    img {
        vertical-align: middle;
    }
`
interface Props {
    showingPW: boolean
    setShowingPW: Dispatch<SetStateAction<boolean>>
    top?: string
    right?: string
}

const ShowPWButton: React.FC<Props> = ({
    showingPW,
    setShowingPW,
    top,
    right,
}) => {
    return (
        <ShowPwButton
            type="button"
            onClick={() => {
                setShowingPW(!showingPW)
            }}
            top={top}
            right={right}
        >
            {showingPW ? (
                <img src={hidePwImg} alt="hidePW" />
            ) : (
                <img src={showPwImg} alt="showPW" />
            )}
        </ShowPwButton>
    )
}

export default ShowPWButton
