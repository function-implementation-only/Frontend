/* eslint-disable no-nested-ternary */
// jsx 내에서는 if문을 쓸 수 없어 일단 삼항 연산자 중첩 처리함, 이후 디자인 적용할 때 바꿀 예정
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { PostResponse } from '../../types/response'
import PostComponent from '../components/PostComponent'

const MainPageLayout = styled.div``

function MainPage() {
    const {
        status,
        error,
        data: apiResponse,
    } = useQuery('getAllPosts', async () => {
        const { data } = await window.context.postAPI.getAllPosts()
        return data
    })
    return (
        <MainPageLayout>
            {status === 'loading'
                ? 'Loading...'
                : error instanceof Error
                ? error.message
                : apiResponse?.data.map((post: PostResponse) => {
                      return <PostComponent key={post.postId} post={post} />
                  })}
        </MainPageLayout>
    )
}

export default MainPage
