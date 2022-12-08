import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { PostObj } from '../../../types/post'

const PostDetailLayout = styled.div``

function PostDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()
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

    function handleUpdate() {
        navigate(`/post/update/${id}`)
    }

    async function handleDelete() {
        try {
            const {
                data: { response },
            } = await window.context.postAPI.deletePost(id)
            if (response.success) {
                navigate('/')
                // FIX ME : 응답 type 구현 및 조건 수정 & flow 수정
            }
        } catch (e) {
            console.log(e)
        }
    }
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
                    <br />
                    {/* FIX ME : 아래 버튼은 작성자일 경우에만 노출하도록 수정 필요 */}
                    <button type="button" onClick={handleUpdate}>
                        수정하기
                    </button>
                    <button type="button" onClick={handleDelete}>
                        삭제하기
                    </button>
                </>
            )}
        </PostDetailLayout>
    )
}

export default PostDetailPage
