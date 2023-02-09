import styled from 'styled-components'

const BookmarkButton = styled.button<{
    isBookmarked: boolean
}>`
    background: center / cover no-repeat
        ${(props) =>
            props.isBookmarked
                ? `url('/assets/images/bookmark_on.svg')`
                : `url('/assets/images/bookmark.svg')`};
    position: absolute;
    right: 0;
    top: 0;
    border: none;
    cursor: pointer;
    width: 16px;
    height: 16px;
`

export default BookmarkButton
