/* eslint-disable no-nested-ternary */
// jsx 내에서는 if문을 쓸 수 없어 일단 삼항 연산자 중첩 처리함, 이후 디자인 적용할 때 바꿀 예정
import styled from 'styled-components'
import useAllPost from 'src/hooks/useAllPost'
import { PostResponse } from '../../types/response'
import PostCardComponent from '../components/PostCardComponent'
import AccordianComponent from '../components/AccordianComponent'
import { CATEGORY, TECHLIST } from '../../lib/constants'
import BannerComponent from '../components/BannerComponent'

const MainPageLayout = styled.div``

const MainPageRow = styled.div``

const ContentsBox = styled.div`
    width: 1440px;
    display: grid;
    grid-template-columns: 3fr 7fr;
    margin: 0 auto;
`

const SideBarBox = styled.div``
const PostCardBox = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: max-content;
    grid-gap: 24px;
    padding: 24px;
`

function MainPage() {
    const { status, error, data: apiResponse } = useAllPost()
    return (
        <MainPageLayout>
            <MainPageRow>
                <BannerComponent />
            </MainPageRow>
            <MainPageRow>
                <ContentsBox>
                    <SideBarBox>
                        <AccordianComponent
                            title="모집 구분"
                            constantsArray={CATEGORY}
                        />
                        <AccordianComponent
                            title="사용 기술 / 툴"
                            constantsArray={TECHLIST}
                        />
                    </SideBarBox>
                    <PostCardBox>
                        {status === 'loading'
                            ? 'Loading...'
                            : error instanceof Error
                            ? error.message
                            : apiResponse?.data.map((post: PostResponse) => {
                                  return (
                                      <PostCardComponent
                                          key={post.postId}
                                          post={post}
                                      />
                                  )
                              })}
                    </PostCardBox>
                </ContentsBox>
            </MainPageRow>
        </MainPageLayout>
    )
}

export default MainPage
