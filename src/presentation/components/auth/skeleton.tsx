import styled from 'styled-components'

export const SkeletonWrapper = styled.li`
    display: flex;
    flex-direction: row;
    align-items: center;
    animation: loading 2.5s infinite;

    .skeleton {
        background: #ddd;
        margin: 10px 0;
        border-radius: 4px;
    }

    .skeleton.avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    .skeleton.text {
        margin: 10px;
        width: 240px;
        height: 16px;
    }

    .skeleton.date {
        margin-left: 130px;
        width: 120px;
        height: 15px;
    }

    @keyframes loading {
        0% {
            transform: translateX(-1%);
        }
        50% {
            transform: translateX(1%);
        }
        100% {
            transform: translate(-1%);
        }
    }
`

type SkeletonElementType = 'avatar' | 'text' | 'date'

const SkeletonElement = ({ type }: { type: SkeletonElementType }) => {
    return <div className={`skeleton ${type}`} />
}

export default function ChatItemSkeleton() {
    return (
        <SkeletonWrapper>
            <div>
                <SkeletonElement type="avatar" />
            </div>
            <div>
                <SkeletonElement type="text" />
                <SkeletonElement type="date" />
            </div>
        </SkeletonWrapper>
    )
}
