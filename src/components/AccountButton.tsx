/* eslint-disable react/require-default-props */
import React from 'react'
import styled from 'styled-components'

const ButtonLayout = styled.button<{
    background?: string
    color?: string
    fontWeight: number
    marginBottom?: number
    mobileWidth?: number
}>`
    width: 368px;
    height: 48px;
    background-color: ${(props) => props.background ?? '#ff9c30'};
    border: none;
    border-radius: 10px;
    font-weight: ${(props) => props.fontWeight};
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    margin-bottom: ${(props) => props.marginBottom}px;
    a {
        width: 292px;
        color: ${(props) => props.color};
    }
    :hover {
        cursor: pointer;
    }
    @media (max-width: 720px) {
        width: ${(props) =>
            `calc((${props.mobileWidth ?? 600} / 720) * 100vw)`};
        height: 51px;
        a {
            width: 250px;
        }
    }
`

interface Props {
    type: 'button' | 'submit'
    disabled?: boolean
    background?: string
    color?: string
    fontWeight: number
    marginBottom?: number
    img?: string
    url?: string
    children: React.ReactNode
    mobileWidth?: number
}

function AccountButton({
    type,
    disabled,
    background,
    color,
    fontWeight,
    marginBottom,
    img,
    url,
    children,
    mobileWidth,
}: Props) {
    return (
        <ButtonLayout
            type={type}
            disabled={disabled}
            background={background}
            color={color}
            fontWeight={fontWeight}
            marginBottom={marginBottom}
            mobileWidth={mobileWidth}
        >
            <img src={img} alt={img} />
            <a href={url}>{children}</a>
        </ButtonLayout>
    )
}

export default AccountButton
