import { MouseEvent, RefObject } from 'react'
import styled from 'styled-components'

const emojis = [
    '😁',
    '😂',
    '😃',
    '😄',
    '😅',
    '😆',
    '😇',
    '😈',
    '😉',
    '😊',
    '😋',
    '😌',
    '😍',
    '😎',
    '😏',
    '😐',
    '😑',
    '😒',
    '😓',
    '😔',
    '😕',
    '😖',
    '😗',
    '😘',
    '😙',
    '😚',
    '😛',
    '😜',
    '😝',
    '😞',
    '😟',
    '😠',
    '😡',
    '😢',
    '😣',
    '😤',
    '😥',
    '😦',
    '😧',
    '😨',
    '😩',
    '😪',
    '😫',
    '😬',
    '😭',
    '😮',
    '😯',
    '😰',
    '😱',
    '😲',
    '😳',
    '😴',
    '😵',
    '😶',
    '😷',
    '😸',
    '😹',
    '😺',
    '😻',
    '😼',
    '😽',
    '😾',
    '😿',
    '🙀',
    '🙁',
    '🙂',
    '🙃',
    '🙄',
    '🙅',
    '🙆',
    '🙇',
    '🙈',
    '🙉',
    '🙊',
    '🙋',
    '🙌',
    '🙍',
    '🙎',
]

const UnsetButton = styled.button`
    all: unset;
    cursor: pointer;
    transition: scale 0.2s ease-in-out;

    &:hover {
        scale: 1.1;
    }
`
const IconBox = styled.div<{ isShowing: boolean }>`
    display: ${(props) => (props.isShowing ? 'flex;' : 'none;')}
    width: 180px;
    flex-wrap: wrap;
    gap: 5px;
    justify-content: center;
    padding: 10px;
    border-radius: 20px;
    background: #ffecd6;
    box-shadow: 0.5px 0.5px 2px gray;
    position: absolute;
    bottom: 40px;
`

type EmojiType = {
    isShowing: boolean
    handleShowing: () => void
    inputRef: RefObject<HTMLInputElement>
}

function Emoji({ inputRef, isShowing, handleShowing }: EmojiType) {
    const insertEmoji = (e: MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLDivElement
        const emoji = target.innerHTML

        inputRef.current.value += emoji
        handleShowing()
    }

    return (
        <IconBox isShowing={isShowing}>
            {emojis.map((imo) => (
                <UnsetButton
                    key={Math.random()}
                    onClick={insertEmoji}
                    type="button"
                >
                    {imo}
                </UnsetButton>
            ))}
        </IconBox>
    )
}

export default Emoji
