import React, { ForwardRefRenderFunction, InputHTMLAttributes } from 'react'
import styled from 'styled-components'

export const BaseInputBox = styled.input`
    background-color: '#f03f3f';
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
