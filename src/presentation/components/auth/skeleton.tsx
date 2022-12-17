import styled from 'styled-components'

export const MessageInfo = styled.p`
    margin-left: 0.5em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: fit-content;
    font-size: 0.9rem;
    color: rgba(0, 0, 0, 0.6);
`

export const SkeletonWrapper = styled.li`
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--gray-100);
    padding: 0.5em 1em;
`

type SkeletonBoxProps = {
    fontSize?: string
    height?: number
    width: number
}

export const Skeleton = styled.div<SkeletonBoxProps>`
    ${(props) => (props.fontSize ? `font-size: ${props.fontSize}` : '')}
    height: ${(props) => (props.height ? props.height : '100%')};
    width: ${(props) => props.width};
`

export default function ChatItemSkeleton() {
    return (
        <SkeletonWrapper>
            <Skeleton width={36} height={36} />
            <MessageInfo>
                <Skeleton fontSize="1rem" width={120} />
                <Skeleton fontSize="1rem" width={250} />
            </MessageInfo>
        </SkeletonWrapper>
    )
}
