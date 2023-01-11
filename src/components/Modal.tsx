import React, { ReactNode } from 'react'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'
import Portal from './Portal'

interface ModalProps {
    isOpen: boolean
    selector?: string
    children?: ReactNode | undefined
    onClose: () => void
}

const Box = styled.div`
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Dim = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99;
`
const Container = styled.div`
    max-width: 476px;
    position: relative;
    width: 100%;
    z-index: 100;
    justify-content: center;
    background-color: #fff;
    border-radius: 20px;
    display: flex;
    align-items: center;
`

const Modal: React.FC<ModalProps> = ({
    children,
    isOpen,
    onClose,
    selector = '#modal-root',
}) => {
    return (
        <CSSTransition
            in={isOpen}
            timeout={300}
            classNames="modal"
            unmountOnExit
        >
            <Portal selector={selector}>
                <Box>
                    <Dim onClick={onClose} />
                    <Container> {children}</Container>
                </Box>
            </Portal>
        </CSSTransition>
    )
}

Modal.defaultProps = {
    selector: '',
    children: null,
}
export default Modal
