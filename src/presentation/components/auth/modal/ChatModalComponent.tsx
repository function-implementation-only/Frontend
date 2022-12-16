interface Props {
    open: boolean
    onClose: () => void
}

export default function CreateChatModal({ open, onClose }: Props) {
    return (
        <button type="button" onClick={() => onClose()}>
            {open}
        </button>
    )
}
