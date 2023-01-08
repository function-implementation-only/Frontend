import {
    ButtonHTMLAttributes,
    forwardRef,
    ForwardRefRenderFunction,
} from 'react'
import styled from 'styled-components'

export const BaseButtonBox = styled.button<{ default?: boolean }>`
    width: 100px;
    height: 45px;
    border-radius: 100px;
    border: none;
    cursor: pointer;
    background-color: ${(props) =>
        props.default ? 'white' : ' var(--primary-color)'};
    color: ${(props) => (props.default ? 'var(--primary-color)' : 'white')};
    border: ${(props) =>
        props.default ? 'solid 1px var(--primary-color)' : 'none'};
`

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    name: string
    default: boolean
    ref: string
}

const Button: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
    { name, ...otherProps },
    ref
) => {
    return (
        <BaseButtonBox {...otherProps} ref={ref}>
            {name}
        </BaseButtonBox>
    )
}

const DefaultButton = forwardRef(Button)

export default DefaultButton
