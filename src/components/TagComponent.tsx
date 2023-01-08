/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import styled from 'styled-components'
import cancel from 'img/cancel.svg'
import { useAppDispatch } from 'src/store/hooks'
import { splice } from 'src/store/features/tag/tagSlice'

const TagComponentLayout = styled.div<{
    backgroundColor: string
}>`
    width: max-content;
    height: 25px;
    border-radius: 20px;
    color: var(--gray-700);
    background-color: ${(props) => props.backgroundColor};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px 8px;

    img {
        margin-left: 7px;
        cursor: pointer;
    }
`
interface TagComponentProps {
    title: string
    backgroundColor: string
}

function TagComponent({ title, backgroundColor }: TagComponentProps) {
    const dispatch = useAppDispatch()
    function handleCancelClick() {
        dispatch(splice(title))
    }

    return (
        <TagComponentLayout backgroundColor={backgroundColor}>
            {title}
            <img src={cancel} alt="cancel" onClick={handleCancelClick} />
        </TagComponentLayout>
    )
}

export default TagComponent
