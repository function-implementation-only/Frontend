/* eslint-disable consistent-return */
import styled from 'styled-components'
import TagBarComponent from 'components/TagBarComponent'
import { ContentResponse } from 'types/response'
import PostCardComponent from 'components/postcard/PostCardComponent'
import AccordianComponent from 'components/AccordianComponent'
import {
    CATEGORY,
    COLLABORATION_TOOL,
    PLACE,
    POST_TYPE,
    TECHLIST,
} from 'lib/constants'
import BannerComponent from 'components/BannerComponent'
import { useState, useEffect, useCallback } from 'react'
import useLogger from 'hooks/useLogger'
import { useAppSelector } from 'src/store/hooks'
import useGetPosts from 'hooks/useGetPosts'
import useGetFilteredPosts from 'hooks/useGetFilteredPosts'
import PostCardSkeletonComponent from 'components/postcard/PostCardSkeleton'

const MainPageLayout = styled.div``

const MainPageRow = styled.div``

const ContentsBox = styled.div`
    width: 1440px;
    display: grid;
    grid-template-columns: 3fr 7fr;
    margin: 0 auto;
    margin-top: 24px;
    @media (max-width: 720px) {
        display: none;
    }
`

const ContentsBoxLeftSide = styled.div``
const ContentsBoxRightSide = styled.div``

const PostCardBox = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: max-content;
    grid-gap: 24px;
    padding: 24px;
`

function MainPage() {
    const logger = useLogger('MainPage')
    const SKELETON_DELAY = 1000

    const [posts, setPosts] = useState([])
    const [pageNum, setPageNum] = useState(0)
    const [isEnd, setIsEnd] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [tmpPosts, setTmpPosts] = useState([])

    const tags = useAppSelector((state) => state.tagReducer.tags)
    const isRecruiting = useAppSelector(
        (state) => state.isRecruitingReducer.isRecruiting
    )

    const onScroll = useCallback(() => {
        const entireHeight = document.documentElement.scrollHeight
        const screenHeight = document.documentElement.clientHeight
        const scrollTop = window.scrollY

        if (screenHeight + scrollTop >= entireHeight) {
            logger.log('floor detected')
            setPageNum((prev) => prev + 1)
        }
    }, [])

    async function setPostsState(type: string): Promise<void> {
        logger.log(`setPostsState() ${isRecruiting}`)
        setIsLoading(true)

        let result

        if (type === POST_TYPE.NON_FILTERED) {
            result = await useGetPosts(pageNum)
        } else if (type === POST_TYPE.FILTERED) {
            result = await useGetFilteredPosts(pageNum, tags)
        }

        if (isRecruiting)
            result = result.filter(
                (item: ContentResponse) => item.postState === '모집중'
            )

        setPosts(result)
        setTimeout(() => {
            setIsLoading(false)
        }, SKELETON_DELAY)
    }

    async function addPostsState(type: string): Promise<void> {
        logger.log('addPostsState()')
        setIsLoading(true)

        let result

        if (type === POST_TYPE.NON_FILTERED) {
            const nonFilteredPosts = await useGetPosts(pageNum)
            if (nonFilteredPosts.length === 0) setIsEnd(true)
            result = posts.concat(nonFilteredPosts)
        } else if (type === POST_TYPE.FILTERED) {
            const filteredPosts = await useGetFilteredPosts(pageNum, tags)
            if (filteredPosts.length === 0) setIsEnd(true)
            result = posts.concat(filteredPosts)
        }

        if (isRecruiting)
            result = result.filter(
                (item: ContentResponse) => item.postState === '모집중'
            )
        setPosts(result)
        setTimeout(() => {
            setIsLoading(false)
        }, SKELETON_DELAY)
    }

    function reset() {
        logger.log('reset()')
        setPosts([])
        setPageNum(0)
        setIsEnd(false)
    }

    useEffect(() => {
        setPostsState(POST_TYPE.NON_FILTERED)
        // 최초 마운트시 공고 가져오기
    }, [])

    useEffect(() => {
        logger.log(`tags changed : ${JSON.stringify(tags)}`)
        reset()
        if (tags.length === 0) {
            setPostsState(POST_TYPE.NON_FILTERED)
            return
        }
        setPostsState(POST_TYPE.FILTERED)
    }, [tags])

    useEffect(() => {
        logger.log(`pageNum changed : ${pageNum}`)
        if (tags.length === 0) {
            addPostsState(POST_TYPE.NON_FILTERED)
            return
        }
        addPostsState(POST_TYPE.FILTERED)
    }, [pageNum])

    useEffect(() => {
        logger.log(`isEnd changed : ${isEnd}`)
        if (isEnd) {
            window.removeEventListener('scroll', onScroll)
        } else {
            window.addEventListener('scroll', onScroll)
        }
        return () => {
            window.removeEventListener('scroll', onScroll)
            // 언마운트시 이벤트 제거
        }
    }, [isEnd])

    useEffect(() => {
        setIsLoading(true)
        if (isRecruiting) {
            setTmpPosts(posts)
            setPosts((prev) =>
                prev.filter(
                    (item: ContentResponse) => item.postState === '모집중'
                )
            )
        } else {
            setPosts(tmpPosts)
            setTmpPosts([])
        }
        setTimeout(() => {
            setIsLoading(false)
        }, SKELETON_DELAY)
    }, [isRecruiting])

    return (
        <MainPageLayout>
            <MainPageRow>
                <BannerComponent />
            </MainPageRow>
            <MainPageRow>
                <ContentsBox>
                    <ContentsBoxLeftSide>
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
                    </ContentsBoxLeftSide>
                    <ContentsBoxRightSide>
                        <TagBarComponent />
                        <PostCardBox>
                            {isLoading ? (
                                <PostCardSkeletonComponent />
                            ) : (
                                posts?.map((post: ContentResponse) => {
                                    return (
                                        <PostCardComponent
                                            key={post.postId}
                                            post={post}
                                        />
                                    )
                                })
                            )}
                        </PostCardBox>
                    </ContentsBoxRightSide>
                </ContentsBox>
            </MainPageRow>
        </MainPageLayout>
    )
}

export default MainPage
