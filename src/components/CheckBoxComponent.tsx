import React, { useState, useEffect } from 'react'

import { getRandomColor } from 'utils/random'
import { pushTag, spliceTag } from 'src/store/features/tag/tagSlice'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
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
    // FIXME : 상수로 만들기
    parentHandler: Function
}

function CheckBoxComponent({ title, parentHandler }: CheckBoxComponentProps) {
    const tags = useAppSelector((state) => state.tagReducer.tags)
    const dispatch = useAppDispatch()

    const [isChecked, setIsChecked] = useState(false)

    function checkTagInStore(): boolean {
        const idx = tags.findIndex((tag) => tag.title === title)
        if (idx === -1) {
            return false
        }
        return true
    }

    useEffect(() => {
        const isTagInStore = checkTagInStore()
        if (!isTagInStore) setIsChecked(false)
    }, [tags])

    function handleCheck(checked: boolean): void {
        if (checked) {
            setIsChecked(true)
            dispatch(
                pushTag({
                    title,
                    backgroundColor: getRandomColor(),
                })
            )
            // store로 체크된 태그 전송
            parentHandler('checked')
        } else {
            setIsChecked(false)
            dispatch(spliceTag(title))
            // store로 체크 해제된 태그 전송
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
