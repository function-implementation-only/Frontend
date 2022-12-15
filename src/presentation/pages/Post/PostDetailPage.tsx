/* eslint-disable no-nested-ternary */
// jsx 내에서는 if문을 쓸 수 없어 일단 삼항 연산자 중첩 처리함, 이후 디자인 적용할 때 바꿀 예정
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'

const PostDetailLayout = styled.div``

function PostDetailPage() {
    const { id: paramId } = useParams()
    const navigate = useNavigate()

    const {
        status,
        error,
        data: apiResponse,
    } = useQuery('getOnePost', async () => {
        const { data } = await window.context.postAPI.getOnePost(paramId)
        return data
    })

    function handleUpdate() {
        navigate(`/post/update/${paramId}`)
    }

    const mutation = useMutation(
        async (id?: string) => {
            const { data } = await window.context.postAPI.deletePost(id)
            return data
        },
        {
            onError: (e) => {
                console.log(e)
            },
            onSuccess: (data) => {
                if (data.success) {
                    alert('공고가 삭제되었습니다.')
                    // FIX ME : i18n 라이브러리로 다국어 지원 해보기?
                    navigate('/')
                }
            },
        }
    )

    async function handleDelete() {
        mutation.mutate(paramId)
    }
    return (
        <PostDetailLayout>
            {status === 'loading' ? (
                'Loading...'
            ) : error instanceof Error ? (
                error.message
            ) : (
                <div>
                    <p>title : {apiResponse?.data.title}</p>
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
                    <img
                        src={apiResponse?.data?.imageList[0]?.imgUrl}
                        alt="postImg"
                    />
                    <br />
                    {/* FIX ME : 아래 버튼은 작성자일 경우에만 노출하도록 수정 필요 */}
                    <button type="button" onClick={handleUpdate}>
                        수정하기
                    </button>
                    <button type="button" onClick={handleDelete}>
                        삭제하기
                    </button>
                </div>
            )}
        </PostDetailLayout>
    )
}

export default PostDetailPage
