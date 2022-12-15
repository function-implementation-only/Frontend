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
            ? `url('/src/assets/images/checkbox.svg') no-repeat 0 0px / cover`
            : 'white'};
`

interface CheckBoxComponentProps {
    item: string
    type: string
    setSelectedNum?: React.Dispatch<React.SetStateAction<number>>
}

function CheckBoxComponent({
    item,
    type,
    setSelectedNum,
}: CheckBoxComponentProps) {
    const [isChecked, setIsChecked] = useState(false)
    function handleCheck(checked: boolean): void {
        if (checked) {
            setIsChecked(true)
            if (type === 'filter' && setSelectedNum !== undefined) {
                setSelectedNum((prev) => prev + 1)
            }
        } else {
            setIsChecked(false)
            if (type === 'filter' && setSelectedNum !== undefined) {
                setSelectedNum((prev) => prev - 1)
            }
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

CheckBoxComponent.defaultProps = {
    setSelectedNum: null,
    // FIX ME : 함수의 기본값을 빈 값으로 처리해도 되는지?
}

export default CheckBoxComponent
