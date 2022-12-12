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
        const { data } = await window.context.postAPI.getOnePost(id)
        setPost(data.data)
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
            const { data } = await window.context.postAPI.deletePost(id)
            if (data.success) {
                alert('공고가 삭제되었습니다.')
                // FIX ME : i18n 라이브러리로 다국어 지원 해보기?
                navigate('/')
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
                    <ul>
                        techList :
                        {post?.techs.map((item) => {
                            return <li key={item.id}>{item.tech}</li>
                        })}
                    </ul>
                    <br />
                    <img src={post?.imageList[0].imgUrl} alt="postImg" />
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
