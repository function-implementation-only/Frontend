import styled from 'styled-components'

const PostCardSkeleton = styled.div`
    height: 214px;
    background-color: #f8f9fa;
    border-radius: 20px;
    animation: skeleton-gradient 1s infinite ease-in-out;
`
function PostCardSkeletonComponent() {
    return (
        <>
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
        </>
    )
}

export default PostCardSkeletonComponent
