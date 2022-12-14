import React, { useRef } from 'react'
import styled from 'styled-components'

const AccordianBox = styled.div`
    cursor: pointer;
`

const AccordianItem = styled.div``

const AccordianTitle = styled.div``

const AccordianContents = styled.div`
    height: 0;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
`

function AccordianComponent() {
    const accordian = useRef<HTMLDivElement>()
    return (
        <AccordianBox
            onClick={() => {
                if (accordian.current) {
                    if (accordian.current.clientHeight > 0) {
                        accordian.current.style.height = '0px'
                    } else {
                        accordian.current.style.height = `${accordian.current.scrollHeight}px`
                    }
                }
            }}
        >
            <AccordianItem>
                <AccordianTitle>Header</AccordianTitle>
                <AccordianContents ref={accordian}>
                    This is the first paragraph of text. This is the first
                    paragraph of text. This is the first paragraph of text. This
                    is the first paragraph of text.
                </AccordianContents>
            </AccordianItem>
        </AccordianBox>
    )
}

export default AccordianComponent
