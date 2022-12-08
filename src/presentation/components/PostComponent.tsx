import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { PostObj } from '../../types/post'

const PostComponentLayout = styled.div`
    cursor: pointer;
    width: 100px;
    height: 100px;
    border: 1px solid black;
`

type PostProps = {
    post: PostObj
}

function PostComponent({ post }: PostProps) {
    const navigate = useNavigate()
    function handleClick() {
        navigate(`/post/detail/${post.id}`)
    }
    return (
        <PostComponentLayout
            onClick={() => {
                handleClick()
            }}
        >
            <p>{post.title}</p>
            <p>{post.contents}</p>
        </PostComponentLayout>
    )
}

export default PostComponent
