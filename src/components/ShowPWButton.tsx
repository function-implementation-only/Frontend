/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components'
import React, { Dispatch, SetStateAction } from 'react'

const ShowPwButton = styled.button<{
    top?: string
    right?: string
    mobileTop?: string
}>`
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
    @media (max-width: 720px) {
        right: 24px !important;
        top: ${({ mobileTop }) => mobileTop || '37%'};
    }
`
interface Props {
    showingPW: boolean
    setShowingPW: Dispatch<SetStateAction<boolean>>
    top?: string
    mobileTop?: string
    right?: string
}

const ShowPWButton: React.FC<Props> = ({
    showingPW,
    setShowingPW,
    top,
    right,
    mobileTop,
}) => {
    return (
        <ShowPwButton
            type="button"
            onClick={() => {
                setShowingPW(!showingPW)
            }}
            top={top}
            right={right}
            mobileTop={mobileTop}
        >
            {showingPW ? (
                <img src="/assets/images/hidePW.svg" alt="hidePW" />
            ) : (
                <img src="/assets/images/showPW.svg" alt="showPW" />
            )}
        </ShowPwButton>
    )
}

export default ShowPWButton
