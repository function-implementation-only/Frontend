import React, { ForwardRefRenderFunction, InputHTMLAttributes } from 'react'
import styled from 'styled-components'

export const BaseInputBox = styled.input`
    width: 100%;
    transition: box-shadow 0.1s ease, border-color 0.1s ease;
    border-radius: 3px;
    padding: 10px;
    background: #fff;
    color: var(--gray-500);
    border: 1px solid var(--gray-600);
`

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    label: string
    ref: string
}

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
    { name, label, ...otherProps },
    ref
) => {
    return (
        <label htmlFor={name}>
            {label}
            <BaseInputBox {...otherProps} name={name} ref={ref} />
        </label>
    )
}

const InputBase = React.forwardRef(Input)

export default InputBase
