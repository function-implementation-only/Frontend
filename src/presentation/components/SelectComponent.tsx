import React from 'react'
import styled from 'styled-components'

interface SelectComponentProp {
    title: string
    id: string
    children: JSX.Element
}

const SelectComponentLayout = styled.div`
    padding-bottom: 47px;
`

const SelectComponentRow = styled.div``

const SelectComponentTitle = styled.label`
    font-size: 18px;
    font-weight: 700;
    display: block;
    margin-bottom: 32px;
`

function SelectComponent({ title, id, children }: SelectComponentProp) {
    return (
        <SelectComponentLayout>
            <SelectComponentRow>
                <SelectComponentTitle htmlFor={id}>
                    {title}
                </SelectComponentTitle>
            </SelectComponentRow>
            <SelectComponentRow>{children}</SelectComponentRow>
        </SelectComponentLayout>
    )
}

export default SelectComponent
