import dayjs from 'dayjs'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ContentResponse } from '../../types/response'
import lookupImg from '../../assets/images/lookup.svg'
import { TechObj } from '../../types/post'
import bookmarkBtnImg from '../../assets/images/bookmark.svg'

const PostCardComponentLayout = styled.div`
    cursor: pointer;
    height: 214px;
    background-color: #f8f9fa;
    border-radius: 20px;
    padding: 24px;
    color: var(--gray-900);
    font-size: 12px;
    p {
        margin-bottom: 8px;
    }
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const PostCardComponentRow = styled.div`
    position: relative;
    footer {
        display: flex;
        justify-content: space-between;
    }
`
const Title = styled.p`
    font-size: 16px;
    font-weight: 700;
`

const TechList = styled.div``

const BookmarkButton = styled.img`
    position: absolute;
    right: 0;
    top: 0;
`

const TechImage = styled.img`
    width: 16px;
    height: 16px;
    margin-right: 12px;
`

type PostCardComponentProps = {
    post: ContentResponse
}

function PostCardComponent({ post }: PostCardComponentProps) {
    const navigate = useNavigate()
    function handleClick() {
        navigate(`/post/detail/${post.postId}`)
    }

    function handleBookmark() {
        console.log('bookmarked')
    }
    return (
        <PostCardComponentLayout
            onClick={() => {
                handleClick()
            }}
        >
            <PostCardComponentRow>
                <p>{dayjs(post.startDate).format('YYYY.MM.DD')}</p>
                <p>{post.category}</p>
                <Title>{post.title}</Title>
                <p>{`#${post.place} #${post.peopleNum}명 #${post.duration}`}</p>
                <TechList>
                    {post.techs.slice(0, 6).map((item: TechObj) => {
                        const basePath = 'src/assets/images/techIcon'
                        const imgPath = `${basePath}/${item.tech.toLowerCase()}.svg`
                        return (
                            <TechImage
                                key={item.id}
                                src={imgPath}
                                alt="techImg"
                            />
                        )
                    })}
                </TechList>
                <BookmarkButton
                    src={bookmarkBtnImg}
                    onClick={() => {
                        handleBookmark()
                    }}
                    alt="bookmarkButton"
                />
            </PostCardComponentRow>
            <PostCardComponentRow>
                <footer>
                    <span>{post.nickname}</span>
                    <span>
                        <img src={lookupImg} alt="lookupImg" /> 0
                    </span>
                </footer>
            </PostCardComponentRow>
        </PostCardComponentLayout>
    )
}

export default PostCardComponent
