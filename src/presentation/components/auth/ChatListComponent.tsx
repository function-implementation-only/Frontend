import { useMemo, useState } from 'react'

import styled from 'styled-components'
import DefaultButton from '../common/button'
import ChatItemSkeleton from './skeleton'
import { BaseInputBox } from '../common/input'
import ChatItemComponent from './ChatItemComponent'
import useChatRooms from '../../../hooks/useChatRooms'

export const PaperBox = styled.div`
    display: flex;
    width: '100%';
`

export const ChatListWrapper = styled.ul`
    max-height: calc(100vh - 80px - 90px - 60px - 64px);
    overflow-y: auto;
`

export const MoreChattingButton = styled(DefaultButton)<{ beforeIcon: any }>`
    width: 100%;
    background-color: white;
    height: 70px;
    border-top: 1px solid var(--gray-100);
    border-radius: 0;
    position: absolute;
    bottom: 0;
    left: 0;

    ::before {
        content: url(${(props) => props.beforeIcon});
    }
`

export const SearchBox = styled.div`
    padding: 1rem;
    border-bottom: 1px solid var(--gray-100);
`

export const Divider = styled.div`
    width: 100%;
    padding: 10px 0px;
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
                <PaperBox>
                    <BaseInputBox
                        style={{ width: '100%' }}
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
                </PaperBox>
            </SearchBox>
            <Divider />
            <ChatListWrapper>
                {isLoading
                    ? Array.from({ length: 3 }).map((_, i) => (
                          <ChatItemSkeleton key={(i + 1).toString()} />
                      ))
                    : chatRooms.map((item: any) => (
                          <ChatItemComponent key={item.id} {...item} />
                      ))}
            </ChatListWrapper>
            <MoreChattingButton
                type="button"
                beforeIcon="V"
                disabled
                name="이전 대화 불러오기"
                default={false}
            />
        </>
    )
}
