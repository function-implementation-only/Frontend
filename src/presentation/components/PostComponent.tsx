import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { PostObj } from '../../types/post'

const PostComponentLayout = styled.div`
    cursor: pointer;
    border: 1px solid black;
    min-height: 214px;
    background-color: #f8f9fa; ;
`

type PostProps = {
    post: PostObj
}

function PostComponent({ post }: PostProps) {
    const navigate = useNavigate()
    function handleClick() {
        navigate(`/post/detail/${post.postId}`)
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
