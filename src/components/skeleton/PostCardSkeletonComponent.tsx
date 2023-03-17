import styled from 'styled-components'

const PostCardSkeleton = styled.div`
    height: 214px;
    background-color: #f8f9fa;
    border-radius: 20px;
    animation: skeleton-gradient 1s infinite ease-in-out;
`
type PostCardSkeletonComponentProps = {
    number: number
}

function PostCardSkeletonComponent({ number }: PostCardSkeletonComponentProps) {
    return (
        <>
            {Array.from({ length: number }, (v, i) => i).map((item) => (
                <PostCardSkeleton key={item} />
            ))}
        </>
    )
}

export default PostCardSkeletonComponent
