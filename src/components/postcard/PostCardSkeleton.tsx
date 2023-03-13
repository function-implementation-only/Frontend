import styled from 'styled-components'

const PostCardSkeleton = styled.div`
    @keyframes skeleton-gradient {
        0% {
            background-color: rgba(165, 165, 165, 0.1);
        }

        50% {
            background-color: rgba(165, 165, 165, 0.3);
        }

        100% {
            background-color: rgba(165, 165, 165, 0.1);
        }
    }
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
