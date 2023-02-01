import React, { useEffect, useState } from 'react'

import styled from 'styled-components'

const CheckBoxComponentLayout = styled.div`
    display: flex;
    height: 52px;
    align-items: center;
    padding: 0 22px 0 26px;
`

const CheckBoxRounded = styled.div<{
    isChecked: boolean
}>`
    cursor: pointer;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    border: ${(props) => (props.isChecked ? 'none' : 'solid 1px black')};
    border-radius: 50%;
    position: relative;

    background: ${(props) =>
        props.isChecked
            ? `url('/assets/images/checkbox.svg') no-repeat center`
            : 'white'};
`

interface CheckBoxComponentProps {
    title: string
    // FIXME : 상수로 만들기
    checkedHandlerProp: Function
    canceledHandlerProp: Function
    effectState?: any
    // 외부의 변경
}

function CheckBoxComponent({
    title,
    canceledHandlerProp,
    checkedHandlerProp,
    effectState,
}: CheckBoxComponentProps) {
    const [isChecked, setIsChecked] = useState(false)

    useEffect(() => {
        if (effectState === null) return
        // 전달된 외부 변경 state가 없음

        if (effectState === true && isChecked === false) {
            // 외부 변경이 일어났고, checked로 변경 필요
            checkedHandlerProp(true)
            setIsChecked(true)
        } else if (effectState === false && isChecked === true) {
            // 외부 변경이 일어났고, canceled로 변경 필요
            canceledHandlerProp(true)
            setIsChecked(false)
        }
    }, [effectState])

    function handleCheck(
        checkedHandler: Function,
        canceledHandler: Function
    ): void {
        if (!isChecked) {
            checkedHandler()
            setIsChecked(true)
        } else {
            canceledHandler()
            setIsChecked(false)
        }
    }
    return (
        <CheckBoxComponentLayout>
            <CheckBoxRounded
                isChecked={isChecked}
                onClick={() =>
                    handleCheck(checkedHandlerProp, canceledHandlerProp)
                }
            />
            {title}
        </CheckBoxComponentLayout>
    )
}

CheckBoxComponent.defaultProps = {
    effectState: null,
}

export default CheckBoxComponent
