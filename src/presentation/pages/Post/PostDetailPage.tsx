/* eslint-disable no-nested-ternary */
// jsx 내에서는 if문을 쓸 수 없어 일단 삼항 연산자 중첩 처리함, 이후 디자인 적용할 때 바꿀 예정
import { useNavigate, useParams } from 'react-router-dom'
import useDeletePost from 'src/hooks/useDeletePost'
import useOnePost from 'src/hooks/useOnePost'
import styled from 'styled-components'
import NoImageComponent from '../../components/NoImageComponent'

const PostDetailLayout = styled.div``

function PostDetailPage() {
    const { id: paramId } = useParams()
    const navigate = useNavigate()

    const { status, error, data: apiResponse } = useOnePost(paramId)

    function handleUpdatePost() {
        navigate(`/post/update/${paramId}`)
    }

    function handleDeletePost() {
        useDeletePost().mutate(paramId)
    }

    return (
        <PostDetailLayout>
            {status === 'loading' ? (
                'Loading...'
            ) : error instanceof Error ? (
                error.message
            ) : (
                <div>
                    <p>title : {apiResponse?.data?.title}</p>
                    <p>contents : {apiResponse?.data?.contents}</p>
                    <p>category : {apiResponse?.data?.category}</p>
                    <p>duration : {apiResponse?.data?.duration}</p>
                    <p>peopleNum : {apiResponse?.data?.peopleNum}</p>
                    <p>place : {apiResponse?.data?.place}</p>
                    <ul>
                        techList :
                        {apiResponse?.data?.techs.map((item) => {
                            return <li key={item.id}>{item.tech}</li>
                        })}
                    </ul>
                    <br />
                    {apiResponse?.data?.imageList[0] ? (
                        <img
                            src={apiResponse.data.imageList[0].imgUrl}
                            alt="postImg"
                        />
                    ) : (
                        <NoImageComponent />
                    )}
                    <br />
                    {/* FIXME : 아래 버튼은 작성자일 경우에만 노출하도록 수정 필요 */}
                    <button type="button" onClick={handleUpdatePost}>
                        수정하기
                    </button>
                    <button type="button" onClick={handleDeletePost}>
                        삭제하기
                    </button>
                </div>
            )}
        </PostDetailLayout>
    )
}

export default PostDetailPage
