import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ContentResponse } from 'types/response'
import Hashtag from './Hashtag'
import TechList from './TechList'
import BookmarkIcon from './BookmarkIcon'
import Lookup from './Lookup'
import PostCardInfo from './PostCardInfo'

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
    display: flex;
    flex-direction: column;
    row-gap: 16px;
`

type PostCardComponentProps = {
    post: ContentResponse
}

function PostCardComponent({ post }: PostCardComponentProps) {
    const navigate = useNavigate()
    function handleClick() {
        navigate(`/post/detail/${post.postId}`)
    }

    return (
        <PostCardComponentLayout
            onClick={() => {
                handleClick()
            }}
        >
            <PostCardComponentRow>
                <p>{post.createdAt}</p>
                <PostCardInfo
                    category={post.category}
                    title={post.title}
                    postState={post.postState}
                />
                <Hashtag place={post.place} duration={post.duration} />
                <BookmarkIcon isBookmarked={post.likeCheck} />
            </PostCardComponentRow>
            <PostCardComponentRow>
                <TechList techs={post.techs.slice(0, 6)} />
                <p>{post.nickname}</p>
                <Lookup viewCount={post.viewCount} />
            </PostCardComponentRow>
        </PostCardComponentLayout>
    )
}

export default PostCardComponent
