import { ReactNode } from 'react'
import { CSSTransition } from 'react-transition-group'
import './modal.css'
import Portal from './Portal'

export interface ModalProps {
    isOpen: boolean
    selector?: string
    children?: ReactNode | undefined
    onClose: () => void
}

function Modal({
    children,
    isOpen,
    onClose,
    selector = '#modal-root',
}: ModalProps) {
    return (
        <CSSTransition
            in={isOpen}
            timeout={300}
            classNames="modal"
            unmountOnExit
        >
            <Portal selector={selector}>
                <div className="overlay">
                    {isOpen && (
                        <div
                            onClick={onClose}
                            aria-hidden="true"
                            className="dim"
                        >
                            Close
                        </div>
                    )}
                    <div className="container"> {children}</div>
                </div>
            </Portal>
        </CSSTransition>
    )
}

Modal.defaultProps = {
    selector: '',
    children: null,
}
export default Modal
