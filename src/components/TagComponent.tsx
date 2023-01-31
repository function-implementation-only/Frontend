/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import styled from 'styled-components'
import { useAppDispatch } from 'src/store/hooks'
import { spliceTag } from 'src/store/features/tag/tagSlice'

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
    displayCancelButton: boolean
}

function TagComponent({
    title,
    backgroundColor,
    displayCancelButton,
}: TagComponentProps) {
    const dispatch = useAppDispatch()

    function handleCancel() {
        return dispatch(spliceTag(title))
    }
    // FIXME : 체크박스와 동일하게 prop으로 핸들러 받도록 처리
    return (
        <TagComponentLayout backgroundColor={backgroundColor}>
            {title}
            {displayCancelButton ? (
                <img
                    src="/assets/images/cancel.svg"
                    alt="cancel"
                    onClick={handleCancel}
                />
            ) : (
                ''
            )}
        </TagComponentLayout>
    )
}

export default TagComponent
