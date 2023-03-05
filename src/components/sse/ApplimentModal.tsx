import React from 'react'
import Modal from 'components/Modal'

const ApplimentModal: React.FC<Props> = ({
    isShowing,
    handleShowing,
    deleteRequest,
}) => {
    return <Modal isOpen={isShowing}, onClose={handleShowing}>dd</Modal>
}
export default ApplimentModal
