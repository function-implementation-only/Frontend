import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { ConstantObj } from '../../lib/constants'
import CheckBoxComponent from './CheckBoxComponent'
import arrow from '../../assets/images/arrow.svg'

const AccordianBox = styled.div`
    cursor: pointer;
`

const AccordianItem = styled.div``

const AccordianTitle = styled.div<{
    isOpen: boolean
}>`
    height: 52px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 22px 0 26px;

    div:nth-child(2) {
        display: flex;
        align-items: center;
        transform: ${(props) =>
            props.isOpen ? 'rotateX(0)' : 'rotateX(180deg)'};
        transition: transform 0.3s ease-in-out;
    }
`

const AccordianContents = styled.div`
    height: 0;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
`

interface AccordianComponentProps {
    title: string
    constantsArray: ConstantObj[]
}

function AccordianComponent({
    title,
    constantsArray,
}: AccordianComponentProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState(0)
    const accordian = useRef<HTMLDivElement>()
    return (
        <AccordianBox>
            <AccordianItem>
                <AccordianTitle
                    isOpen={isOpen}
                    onClick={() => {
                        setIsOpen((prev) => !prev)
                        if (accordian.current) {
                            if (accordian.current.clientHeight > 0) {
                                accordian.current.style.height = '0px'
                            } else {
                                accordian.current.style.height = `${accordian.current.scrollHeight}px`
                            }
                        }
                    }}
                >
                    <div>{`${title}(${selected})`}</div>
                    <div>
                        <img src={arrow} alt="arrowImg" />
                    </div>
                </AccordianTitle>
                <AccordianContents ref={accordian}>
                    {constantsArray.map((item) => {
                        return (
                            <CheckBoxComponent
                                key={item.value}
                                item={item.value}
                                setSelected={setSelected}
                            />
                        )
                    })}
                </AccordianContents>
            </AccordianItem>
        </AccordianBox>
    )
}

export default AccordianComponent
