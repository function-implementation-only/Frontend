/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { PostObj } from '../../../types/post'

const PostDetailLayout = styled.div``

function PostDetailPage() {
    const { id } = useParams()
    const [post, setPost] = useState<PostObj | null>(null)
    const [loading, setLoading] = useState(true)

    async function initialize() {
        const postData = await window.context.postAPI.getOnePost(id)
        setPost(postData)
        setLoading(false)
    }
    useEffect(() => {
        initialize()
    }, [])
    return (
        <PostDetailLayout>
            {loading ? (
                'Loading...'
            ) : (
                <>
                    <p>title : {post?.title}</p>
                    <p>contents : {post?.contents}</p>
                    <p>category : {post?.category}</p>
                    <p>duration : {post?.duration}</p>
                    <p>peopleNum : {post?.peopleNum}</p>
                    <p>place : {post?.place}</p>
                </>
            )}
        </PostDetailLayout>
    )
}

export default PostDetailPage
