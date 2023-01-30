import styled from 'styled-components'
import useAllPost from 'src/hooks/useAllPost'
import TagBarComponent from 'components/TagBarComponent'
import { ContentResponse } from 'types/response'
import PostCardComponent from 'components/PostCardComponent'
import AccordianComponent from 'components/AccordianComponent'
import { CATEGORY, TECHLIST } from 'lib/constants'
import BannerComponent from 'components/BannerComponent'

const MainPageLayout = styled.div``

const MainPageRow = styled.div``

const ContentsBox = styled.div`
    width: 1440px;
    display: grid;
    grid-template-columns: 3fr 7fr;
    margin: 0 auto;
    margin-top: 24px;
`

const ContentsBoxLeftSection = styled.section``
const ContentsBoxRightSection = styled.section``

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
                    <ContentsBoxLeftSection>
                        <AccordianComponent
                            title="모집 구분"
                            constantsArray={CATEGORY}
                        />
                        <AccordianComponent
                            title="사용 기술 / 툴"
                            constantsArray={TECHLIST}
                        />
                    </ContentsBoxLeftSection>
                    <ContentsBoxRightSection>
                        <TagBarComponent />
                        <PostCardBox>
                            {status === 'loading'
                                ? 'Loading...'
                                : error instanceof Error
                                ? error.message
                                : apiResponse?.data.content.map(
                                      (post: ContentResponse) => {
                                          return (
                                              <PostCardComponent
                                                  key={post.postId}
                                                  post={post}
                                              />
                                          )
                                      }
                                  )}
                        </PostCardBox>
                    </ContentsBoxRightSection>
                </ContentsBox>
            </MainPageRow>
        </MainPageLayout>
    )
}

export default MainPage
