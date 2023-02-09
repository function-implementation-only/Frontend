import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import FilterCheckBoxComponent from 'components/checkbox/FilterCheckBoxComponent'
import { ConstantObj } from 'lib/constants'
import FilterAllCheckBoxComponent from './checkbox/FilterAllCheckBoxComponent'

const AccordianBox = styled.div`
    border-bottom: 1px solid #f0f0f0;
`

const AccordianItem = styled.div``

const AccordianTitle = styled.div<{
    isOpen: boolean
}>`
    --animation-delay: 0.3s;

    height: 52px;
    display: flex;
    cursor: pointer;
    justify-content: space-between;
    align-items: center;
    padding: 0 22px 0 26px;

    div:nth-child(1) {
        font-weight: 700;
    }

    div:nth-child(2) {
        display: flex;
        align-items: center;
        transform: ${(props) =>
            props.isOpen ? 'rotateX(0)' : 'rotateX(180deg)'};
        transition: transform var(--animation-delay) ease-in-out;
    }
`

const AccordianContents = styled.div`
    --animation-delay: 0.3s;

    height: 0;
    overflow: hidden;
    transition: all var(--animation-delay) ease-in-out;
    display: flex;
    flex-direction: column;
`

interface AccordianComponentProps {
    title: string
    constantsArray: ConstantObj<string>[]
}

function AccordianComponent({
    title,
    constantsArray,
}: AccordianComponentProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedNum, setSelectedNum] = useState(0)
    const accordian = useRef<HTMLDivElement>(null)

    function ownHandler(cmd: string) {
        // 체크박스에서 체크가 일어나면 실행됨.
        switch (cmd) {
            case 'checked':
                setSelectedNum((prev) => prev + 1)
                break
            case 'canceled':
                setSelectedNum((prev) => prev - 1)
                break
            default:
        }
    }

    function handleClickAccordian() {
        setIsOpen((prev) => !prev)

        if (accordian.current) {
            if (accordian.current.clientHeight > 0) {
                accordian.current.style.height = '0px'
            } else {
                accordian.current.style.height = `${accordian.current.scrollHeight}px`
            }
        }
    }
    return (
        <AccordianBox>
            <AccordianItem>
                <AccordianTitle isOpen={isOpen} onClick={handleClickAccordian}>
                    <div>{`${title}(${selectedNum})`}</div>
                    <div>
                        <img src="/assets/images/arrow.svg" alt="arrowImg" />
                    </div>
                </AccordianTitle>
                <AccordianContents ref={accordian}>
                    <FilterAllCheckBoxComponent
                        constantsArray={constantsArray}
                        parentHandler={ownHandler}
                    />
                    {constantsArray.map((item) => {
                        return (
                            <FilterCheckBoxComponent
                                key={item.value}
                                title={item.title}
                                source={item.source}
                                value={item.value}
                                parentHandler={ownHandler}
                            />
                        )
                    })}
                </AccordianContents>
            </AccordianItem>
        </AccordianBox>
    )
}

export default AccordianComponent
