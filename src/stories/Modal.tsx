/* eslint-disable jsx-a11y/click-events-have-key-events */
// 장애인 등 접근성 향상을 위한 rule입니다.
/* eslint-disable jsx-a11y/no-static-element-interactions */
// 사용자와의 상호작용이 일어나는 엘리먼트의 경우, 시멘트 마크업을 하거나 role 속성에 그 역할을 작성해주어야 합니다.

// FIXME : 위 두 가지 rule 모두 일단은 필요없다고 판단해 disable 처리했습니다. 나중에 수정이 필요합니다.

import React, { ReactNode } from 'react'
import { CSSTransition } from 'react-transition-group'
import './modal.css'
import Portal from '../presentation/components/Portal'

interface ModalProps {
    isOpen: boolean
    selector?: string
    children?: ReactNode | undefined
    onClose: () => void
}

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
                <div className="overlay">
                    <div className="dim" onClick={onClose} />
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
