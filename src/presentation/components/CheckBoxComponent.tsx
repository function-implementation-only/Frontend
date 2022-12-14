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
    display: block;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    border: ${(props) => (props.isChecked ? 'none' : 'solid 1px black')};
    border-radius: 50%;
    position: relative;

    background: ${(props) =>
        props.isChecked
            ? `url('/src/assets/images/checkbox.svg') no-repeat 0 0px / cover`
            : 'white'};
`

interface CheckBoxComponentProps {
    item: string
    setSelected: React.Dispatch<React.SetStateAction<number>>
}

function CheckBoxComponent({ item, setSelected }: CheckBoxComponentProps) {
    const [isChecked, setIsChecked] = useState(false)
    function handleCheck(checked: boolean): void {
        if (checked) {
            setIsChecked(true)
            setSelected((prev) => prev + 1)
        } else {
            setIsChecked(false)
            setSelected((prev) => prev - 1)
        }
    }
    return (
        <CheckBoxComponentLayout>
            <CheckBoxRounded htmlFor={item} isChecked={isChecked}>
                <input
                    id={item}
                    type="checkbox"
                    onChange={(e) => {
                        handleCheck(e.target.checked)
                    }}
                />
            </CheckBoxRounded>
            {item}
        </CheckBoxComponentLayout>
    )
}

export default CheckBoxComponent
