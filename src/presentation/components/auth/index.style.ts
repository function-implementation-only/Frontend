import styled, { css } from 'styled-components'

export const ChatSectionWrapper = styled.section<{ home?: boolean }>`
    border-right: 1px solid var(--gray-100);
    min-width: 350px;
    position: relative;
    @media (max-width: 735px) {
        min-width: unset;
        width: 100%;
    }
    ${({ home }) =>
        !home &&
        css`
            @media (max-width: 735px) {
                display: none;
            }
        `}
`

export const ChatSectionHeader = styled.div`
    width: 100%;
    padding: 1em;
    border-bottom: 1px solid var(--gray-100);
`

export const ChatCount = styled.span`
    font-size: 0.9rem;
    color: var(--gray-500);
`

export const SearchBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    height: fit-content;
    border-bottom: 1px solid var(--gray-100);
`
