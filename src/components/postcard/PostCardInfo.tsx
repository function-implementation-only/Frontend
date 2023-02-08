import React from 'react'
import styled from 'styled-components'

const PostInfoLayout = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 4px;

    div:last-child {
        font-size: 16px;
        font-weight: 700;
    }
`

interface PostCardInfoProps {
    category: string
    title: string
    postState: string
}

function PostCardInfo({ category, title, postState }: PostCardInfoProps) {
    return (
        <PostInfoLayout>
            <div>{`${category} | ${postState}`}</div>
            <div>{title}</div>
        </PostInfoLayout>
    )
}

export default PostCardInfo
