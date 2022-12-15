import React from 'react'
import styled from 'styled-components'

interface SelectComponentProp {
    title: string
    id: string
    children: JSX.Element
}

const SelectComponentLayout = styled.div``

function SelectComponent({ title, id, children }: SelectComponentProp) {
    return (
        <SelectComponentLayout>
            <label htmlFor={id}>
                {title}
                {children}
            </label>
        </SelectComponentLayout>
    )
}

export default SelectComponent
