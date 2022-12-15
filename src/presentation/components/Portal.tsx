/* eslint-disable react/jsx-no-useless-fragment */
import React, { ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface Props {
    selector?: string
    children?: ReactNode | undefined
}

const Portal: React.FC<Props> = ({ children, selector }) => {
    const rootElement = selector && document.querySelector(selector)
    return <>{rootElement ? createPortal(children, rootElement) : children}</>
}
Portal.defaultProps = {
    selector: '',
    children: null,
}

export default Portal
