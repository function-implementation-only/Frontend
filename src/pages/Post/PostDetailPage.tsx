import { useNavigate, useParams } from 'react-router-dom'
import useDeletePost from 'src/hooks/useDeletePost'
import usePostById from 'src/hooks/usePostById'
import styled from 'styled-components'
import { useState } from 'react'
import { POST_DETAIL_INFORMATION } from 'lib/constants'
import InformationComponent from 'components/InformationComponent'
import DefaultButton from 'components/common/DefaultButton'

const PostDetailLayout = styled.div`
    width: 1440px;
    padding: 48px;
    border: 1px solid var(--primary-color-100);
    border-radius: 20px;
    margin: 0 auto;
`

const PostDetailRow = styled.div<{ marginBottom?: string }>`
    margin-bottom: ${(props) => props.marginBottom};
`

const PostDetailHeader = styled.header``

const TitleBox = styled.div<{ fontSize: string }>`
    color: var(--gray-800);
    font-weight: 700;
    font-size: ${(props) => props.fontSize};
`

const ButtonBox = styled.div`
    display: flex;
    column-gap: 24px;
    align-items: center;
`
const HeaderDetailBox = styled.div<{
    justifyContent?: string
    marginBottom?: string
}>`
    display: flex;
    justify-content: ${(props) => props.justifyContent};
    align-items: center;
    margin-bottom: ${(props) => props.marginBottom};
    column-gap: 16px;
`

const InfoBox = styled.div`
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
`

const Divider = styled.div`
    width: 1px;
    background-color: var(--gray-400);
`

const DividerRow = styled.div<{ marginTopBottom: string }>`
    width: 100%;
    height: 2px;
    background-color: var(--primary-color);
    margin: ${(props) => props.marginTopBottom} 0;
`

const ProfileBox = styled.div`
    display: flex;
    align-items: center;
    column-gap: 14px;
`

const ProfileImageBox = styled.div`
    width: 32px;
    height: 32px;
    position: relative;
    img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
`

const NicknameSpan = styled.span`
    font-weight: 700;
    font-size: 24px;
`

const DateBox = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 24px;
    color: var(--gray-500);
`

const ChatButton = styled.button`
    background: center / cover no-repeat
        url('/src/assets/images/messageBubble.svg');
    width: 24px;
    height: 22px;
    border: none;
    cursor: pointer;
`

const BookMarkButton = styled.button<{
    isAuthor: boolean
}>`
    background: center / cover no-repeat url('/src/assets/images/bookmark.svg');
    width: ${(props) => (props.isAuthor ? '42px' : '32px')};
    height: ${(props) => (props.isAuthor ? '40px' : '30px')};
    border: none;
    cursor: pointer;
    margin-left: auto;
`

const ContentsBox = styled.div``

const ErrorButton = styled(DefaultButton)`
    color: var(--error-color);
    border: 1px solid var(--error-color);
    background-color: white;
`

function PostDetailPage() {
    const { id: paramId } = useParams()
    const navigate = useNavigate()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isAuthor, setIsAuthor] = useState(false)

    const { status, error, data: apiResponse } = usePostById(paramId)

    function handleUpdatePost() {
        navigate(`/post/update/${paramId}`)
    }

    function handleDeletePost() {
        useDeletePost().mutate(paramId)
    }

    function handleApply() {
        console.log('Apply for this post')
    }

    function handleChat() {
        console.log('Start chatting')
    }

    return (
        <PostDetailLayout>
            {status === 'loading' ? (
                'Loading...'
            ) : error instanceof Error ? (
                error.message
            ) : (
                <>
                    <PostDetailRow marginBottom="119px">
                        <PostDetailHeader>
                            <HeaderDetailBox
                                justifyContent="space-between"
                                marginBottom="38px"
                            >
                                <TitleBox fontSize="32px">
                                    {apiResponse.data.title}
                                </TitleBox>
                                <ButtonBox>
                                    {isAuthor ? (
                                        <>
                                            <ErrorButton
                                                type="button"
                                                onClick={handleDeletePost}
                                            >
                                                삭제하기
                                            </ErrorButton>
                                            <DefaultButton
                                                type="button"
                                                onClick={handleUpdatePost}
                                            >
                                                수정하기
                                            </DefaultButton>
                                        </>
                                    ) : (
                                        <>
                                            <DefaultButton
                                                type="button"
                                                onClick={handleApply}
                                            >
                                                지원하기
                                            </DefaultButton>
                                            <BookMarkButton
                                                isAuthor={isAuthor}
                                            />
                                        </>
                                    )}
                                </ButtonBox>
                            </HeaderDetailBox>
                            <HeaderDetailBox>
                                <InfoBox>
                                    <ProfileBox>
                                        <ProfileImageBox>
                                            <img
                                                src="https://source.unsplash.com/random/32×32"
                                                // FIXME : 나중에 프로필 이미지 src로 교체 필요
                                                alt="profileImage"
                                            />
                                        </ProfileImageBox>
                                        <NicknameSpan>
                                            {apiResponse.data.nickname}
                                        </NicknameSpan>
                                        {isAuthor ? (
                                            ''
                                        ) : (
                                            <ChatButton
                                                type="button"
                                                onClick={handleChat}
                                            />
                                        )}
                                    </ProfileBox>
                                    <Divider />
                                    <DateBox>
                                        {apiResponse.data.startDate}
                                    </DateBox>
                                </InfoBox>
                                {isAuthor ? (
                                    <BookMarkButton isAuthor={isAuthor} />
                                ) : (
                                    ''
                                )}
                            </HeaderDetailBox>
                            <DividerRow marginTopBottom="30px" />
                            <HeaderDetailBox>
                                <InfoBox>
                                    {POST_DETAIL_INFORMATION.map((item) => (
                                        <InformationComponent
                                            title={item.title}
                                            contentsType={item.type}
                                            key={item.title}
                                            contents={
                                                apiResponse?.data[item.value]
                                            }
                                        />
                                    ))}
                                </InfoBox>
                            </HeaderDetailBox>
                        </PostDetailHeader>
                    </PostDetailRow>
                    <PostDetailRow>
                        <TitleBox fontSize="24px">프로젝트 개요</TitleBox>
                        <DividerRow marginTopBottom="24px" />
                        <ContentsBox>{apiResponse.data.contents}</ContentsBox>
                    </PostDetailRow>
                </>
            )}
        </PostDetailLayout>
    )
}

export default PostDetailPage
