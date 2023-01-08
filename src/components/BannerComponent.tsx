import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import styled from 'styled-components'

const BannerBox = styled.div`
    background-color: gray;
    height: 320px;
`

function BannerComponent() {
    return (
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
    )
}

export default BannerComponent
