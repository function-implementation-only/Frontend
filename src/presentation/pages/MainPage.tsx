/* eslint-disable no-nested-ternary */
// jsx 내에서는 if문을 쓸 수 없어 일단 삼항 연산자 중첩 처리함, 이후 디자인 적용할 때 바꿀 예정
import React, { useQuery } from 'react-query'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper'
import { PostResponse } from '../../types/response'
import PostComponent from '../components/PostComponent'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import AccordianComponent from '../components/AccordianComponent'

const MainPageLayout = styled.div``

const MainPageRow = styled.div``

const BannerBox = styled.div`
    background-color: gray;
    height: 320px;
`

const ContentsBox = styled.div`
    width: 1440px;
    display: grid;
    grid-template-columns: 3fr 7fr;
    margin: 0 auto;
`

const SideBarBox = styled.div`
    border: 1px solid black;
`
const PostBox = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 24px;
    padding: 24px;
`

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
            <MainPageRow>
                <Swiper
                    modules={[Navigation, Pagination, A11y]}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                >
                    <SwiperSlide>
                        <BannerBox>배너1</BannerBox>
                    </SwiperSlide>
                    <SwiperSlide>
                        <BannerBox>배너2</BannerBox>
                    </SwiperSlide>
                    <SwiperSlide>
                        <BannerBox>배너3</BannerBox>
                    </SwiperSlide>
                    <SwiperSlide>
                        <BannerBox>배너4</BannerBox>
                    </SwiperSlide>
                </Swiper>
            </MainPageRow>
            <MainPageRow>
                <ContentsBox>
                    <SideBarBox>
                        {[0, 1, 2, 3, 4, 5].map((item) => {
                            return <AccordianComponent key={item} />
                        })}
                    </SideBarBox>
                    <PostBox>
                        {status === 'loading'
                            ? 'Loading...'
                            : error instanceof Error
                            ? error.message
                            : apiResponse?.data.map((post: PostResponse) => {
                                  return (
                                      <PostComponent
                                          key={post.postId}
                                          post={post}
                                      />
                                  )
                              })}
                    </PostBox>
                </ContentsBox>
            </MainPageRow>
        </MainPageLayout>
    )
}

export default MainPage
