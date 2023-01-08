import React from 'react'
import { ChangeHandler, RefCallBack } from 'react-hook-form'
import styled from 'styled-components'

const RadioComponentLayout = styled.div`
    display: flex;
    align-items: center;

    input[type='radio'] {
        appearance: none;
        width: 20px;
        height: 20px;
        margin-right: 10px;
        border-radius: 50%;
        border: 1px solid #868e96;
        cursor: pointer;
    }
    input[type='radio']:checked {
        border: none;
        background: url('/src/assets/images/radio.svg') no-repeat center/ auto;
    }
`

interface RadioComponentProps {
    title: string
    name: string
    onChange: ChangeHandler
    onBlur: ChangeHandler
    value: string | number
    inputRef: RefCallBack
}

function RadioComponent({
    title,
    name,
    onChange,
    onBlur,
    value,
    inputRef,
}: RadioComponentProps) {
    return (
        <RadioComponentLayout>
            <input
                type="radio"
                id={title}
                onChange={onChange}
                onBlur={onBlur}
                name={name}
                ref={inputRef}
                value={value}
            />
            <label htmlFor={title}>{title}</label>
        </RadioComponentLayout>
    )
}
export default RadioComponent
