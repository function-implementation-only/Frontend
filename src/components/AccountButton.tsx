/* eslint-disable react/require-default-props */
import React from 'react'
import styled from 'styled-components'

const ButtonLayout = styled.button<{
    background?: string
    color?: string
    fontWeight: number
    marginBottom?: number
}>`
    width: 368px;
    height: 48px;
    background-color: ${(props) => props.background || '#ff9c30'};
    border: none;
    border-radius: 10px;
    font-family: 'Pretendard';
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
}: Props) {
    return (
        <ButtonLayout
            type={type}
            disabled={disabled}
            background={background}
            color={color}
            fontWeight={fontWeight}
            marginBottom={marginBottom}
        >
            <img src={img} alt={img} />
            <a href={url}>{children}</a>
        </ButtonLayout>
    )
}

export default AccountButton
