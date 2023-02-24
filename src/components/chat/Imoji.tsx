import React, { MouseEvent, RefObject } from 'react'
import styled from 'styled-components'

const imojis = [
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

type ImojiType = {
    isShowing: boolean
    handleShowing: () => void
    inputRef: RefObject<HTMLInputElement>
}

function Imoji({ inputRef, isShowing, handleShowing }: ImojiType) {
    const insertImoji = (e: MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLDivElement
        const imoji = target.innerHTML

        inputRef.current.value += imoji
        handleShowing()
    }

    return (
        <IconBox isShowing={isShowing}>
            {imojis.map((imo) => (
                <UnsetButton
                    key={Math.random()}
                    onClick={insertImoji}
                    type="button"
                >
                    {imo}
                </UnsetButton>
            ))}
        </IconBox>
    )
}

export default Imoji
