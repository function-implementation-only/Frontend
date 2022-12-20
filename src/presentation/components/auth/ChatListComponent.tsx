import { useMemo, useState } from 'react'

import styled from 'styled-components'
import DefaultButton from '../common/button'
import ChatItemSkeleton from './skeleton'
import { BaseInputBox } from '../common/input'
import ChatItemComponent from './ChatItemComponent'
import useChatRooms from '../../../hooks/useChatRooms'

export const ChatListWrapper = styled.ul`
    max-height: calc(100vh - 80px - 90px - 60px - 64px);
    overflow-y: auto;
    padding: 1rem;
`

export const SearchBox = styled.div`
    display: flex;
    align-items: center;
    width: '100%';
    padding: 1rem;
    border-bottom: 1px solid var(--gray-100);
`

export default function ChatListComponent() {
    const { data, isLoading } = useChatRooms()
    const [keyword, setKeyword] = useState('')

    const chatRooms = useMemo(() => {
        if (!keyword.trim()) return data ?? []

        return (data?.data ?? []).filter(
            ({ users }: any) =>
                !!users.find(({ name }: any) =>
                    name?.toLowerCase().includes(keyword.toLowerCase())
                )
        )
    }, [data, keyword])

    return (
        <>
            <SearchBox>
                <BaseInputBox
                    key="search"
                    placeholder="대화 검색하기"
                    aria-label="대화 검색하기"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    name="search"
                />
                <DefaultButton
                    style={{ height: '25px', margin: '0px 10px' }}
                    name="Search"
                    default
                />
            </SearchBox>
            <ChatListWrapper>
                {isLoading
                    ? Array.from({ length: 3 }).map((_, i) => (
                          <ChatItemSkeleton key={(i + 1).toString()} />
                      ))
                    : chatRooms.map((item: any) => (
                          <ChatItemComponent key={item.id} {...item} />
                      ))}
            </ChatListWrapper>
        </>
    )
}
