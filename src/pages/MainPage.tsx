import styled from 'styled-components'
import TagBarComponent from 'components/TagBarComponent'
import { ContentResponse } from 'types/response'
import PostCardComponent from 'components/PostCardComponent'
import AccordianComponent from 'components/AccordianComponent'
import {
    CATEGORY,
    COLLABORATION_TOOL,
    PLACE,
    RESPONSE_TYPE,
    TECHLIST,
} from 'lib/constants'
import BannerComponent from 'components/BannerComponent'
import { useState, useEffect } from 'react'
import useServiceManager from 'hooks/useServiceManager'
import useLogger from 'hooks/useLogger'
import { useAppSelector } from 'src/store/hooks'

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
    const serviceManager = useServiceManager()
    const logger = useLogger('MainPage')
    const [posts, setPosts] = useState([])
    const [pageNum, setPageNum] = useState(0)
    const tags = useAppSelector((state) => state.tagReducer.tags)

    function handleScroll() {
        const entireHeight = document.documentElement.scrollHeight
        const screenHeight = document.documentElement.clientHeight
        const scrollTop = window.scrollY

        if (screenHeight + scrollTop >= entireHeight) {
            logger.log('floor detected')
            setPageNum((prev) => prev + 1)
        }
    }

    async function getPosts() {
        logger.log('getPosts()')
        try {
            const { data } = await serviceManager.dataService.postAPI.getPosts()
            const dataParsed = serviceManager.dataService.parserAPI.parse(
                RESPONSE_TYPE.POST.GET_ALL,
                data.data.content
            )
            data.data.content = dataParsed
            setPosts(dataParsed)
        } catch (error) {
            alert(error)
        }
    }

    async function init() {
        logger.log('init()')
        window.addEventListener('scroll', handleScroll)
        getPosts()
    }

    async function filterByCategories() {
        logger.log('filterByCategories()')
        try {
            const { data } =
                await serviceManager.dataService.postAPI.getPostsByCategories(
                    tags
                )
            const dataParsed = serviceManager.dataService.parserAPI.parse(
                RESPONSE_TYPE.POST.GET_ALL,
                data.data.content
            )
            data.data.content = dataParsed
            setPosts(dataParsed)
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        init()
    }, [])

    useEffect(() => {
        if (tags.length === 0) {
            init()
            return
        }
        filterByCategories()
    }, [tags])

    useEffect(() => {
        logger.log(pageNum)
    }, [pageNum])

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
                            title="진행 방식"
                            constantsArray={PLACE}
                        />
                        <AccordianComponent
                            title="협업 프로그램"
                            constantsArray={COLLABORATION_TOOL}
                        />
                        <AccordianComponent
                            title="프론트엔드"
                            constantsArray={TECHLIST.filter((item) => {
                                return item.type === 'FrontEnd'
                            })}
                        />
                        <AccordianComponent
                            title="백엔드"
                            constantsArray={TECHLIST.filter((item) => {
                                return item.type === 'BackEnd'
                            })}
                        />
                        <AccordianComponent
                            title="모바일"
                            constantsArray={TECHLIST.filter((item) => {
                                return item.type === 'Mobile'
                            })}
                        />
                    </ContentsBoxLeftSection>
                    <ContentsBoxRightSection>
                        <TagBarComponent />
                        <PostCardBox>
                            {posts?.map((post: ContentResponse) => {
                                return (
                                    <PostCardComponent
                                        key={post.postId}
                                        post={post}
                                    />
                                )
                            })}
                        </PostCardBox>
                    </ContentsBoxRightSection>
                </ContentsBox>
            </MainPageRow>
        </MainPageLayout>
    )
}

export default MainPage
