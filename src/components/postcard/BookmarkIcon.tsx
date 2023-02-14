import React from 'react'
import styled from 'styled-components'

interface BookmarkIconProps {
    isBookmarked: boolean
}

const BookmarkIconLayout = styled.div`
    width: 16px;
    height: 16px;
    position: absolute;
    top: 0;
    right: 0;
`

function BookmarkIcon({ isBookmarked }: BookmarkIconProps) {
    return (
        <BookmarkIconLayout>
            <img
                src={
                    isBookmarked
                        ? '/assets/images/bookmark_on.svg'
                        : '/assets/images/bookmark.svg'
                }
                alt="BookmarkIcon"
            />
        </BookmarkIconLayout>
    )
}

export default BookmarkIcon
