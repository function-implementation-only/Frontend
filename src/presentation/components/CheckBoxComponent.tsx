import React, { useState } from 'react'
import styled from 'styled-components'

const CheckBoxComponentLayout = styled.div`
    height: 48px;
    display: flex;
    align-items: center;
    padding: 0 22px 0 26px;
`

const CheckBoxRounded = styled.label<{
    isChecked: boolean
}>`
    input {
        display: none;
    }
    cursor: pointer;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    border: ${(props) => (props.isChecked ? 'none' : 'solid 1px black')};
    border-radius: 50%;
    position: relative;

    background: ${(props) =>
        props.isChecked
            ? `url('/src/assets/images/checkbox.svg') no-repeat center`
            : 'white'};
`

interface CheckBoxComponentProps {
    title: string
    // FIX ME : 상수로 만들기
    parentHandler: Function
}

function CheckBoxComponent({ title, parentHandler }: CheckBoxComponentProps) {
    const [isChecked, setIsChecked] = useState(false)
    function handleCheck(checked: boolean): void {
        if (checked) {
            setIsChecked(true)
            parentHandler('checked')
        } else {
            setIsChecked(false)
            parentHandler('canceled')
        }
    }
    return (
        <CheckBoxComponentLayout>
            <CheckBoxRounded htmlFor={title} isChecked={isChecked}>
                <input
                    id={title}
                    type="checkbox"
                    onChange={(e) => {
                        handleCheck(e.target.checked)
                    }}
                />
            </CheckBoxRounded>
            {title}
        </CheckBoxComponentLayout>
    )
}

export default CheckBoxComponent
