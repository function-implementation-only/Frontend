import { useNavigate, useParams } from 'react-router-dom'
import useDeletePost from 'src/hooks/useDeletePost'
import usePostById from 'src/hooks/usePostById'
import styled from 'styled-components'
import { POST_DETAIL_INFORMATION } from 'lib/constants'
import InformationComponent from 'components/InformationComponent'
import DefaultButton from 'components/common/DefaultButton'
import { Viewer } from '@toast-ui/react-editor'
import TableComponent from 'components/TableComponent'
import { Avatar } from '@mui/material'
import useBookmark from 'hooks/useBookmark'
import ApplyModal from 'components/ApplyModal'
import useModal from 'hooks/useModal'
import useServiceManager from 'hooks/useServiceManager'

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
    background: center / cover no-repeat url('/assets/images/messageBubble.svg');
    width: 24px;
    height: 22px;
    border: none;
    cursor: pointer;
`

const BookMarkButton = styled.button<{
    isAuthor: boolean
    isBookmarked: boolean
    isLogin: boolean
}>`
    background: center / cover no-repeat
        ${(props) =>
            props.isBookmarked
                ? `url('/assets/images/bookmark_on.svg')`
                : `url('/assets/images/bookmark.svg')`};
    width: ${(props) => (props.isAuthor ? '42px' : '32px')};
    height: ${(props) => (props.isAuthor ? '40px' : '30px')};
    border: none;
    cursor: pointer;
    margin-left: auto;
    opacity: ${(props) => (props.isLogin ? 1 : 0.5)};
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
    const deletePost = useDeletePost()
    const serviceManager = useServiceManager()
    const { isShowing, handleShowing } = useModal()

    const accountId = JSON.parse(localStorage.getItem('accountId')) || null
    const isLogin = !!localStorage.getItem('token')

    const { isLoading, error, data: apiResponse } = usePostById(paramId)

    function handleUpdatePost() {
        navigate(`/post/update/${paramId}`)
    }

    function handleDeletePost() {
        deletePost.mutate(paramId)
    }

    function handleApply() {
        if (isLogin) {
            handleShowing()
        } else {
            serviceManager.domainService.popupAPI.show({
                content: '로그인 후에 이용가능합니다.',
                buttons: [
                    {
                        label: '확인',
                        clickHandler: () => {
                            serviceManager.domainService.popupAPI.closeTopPopup()
                        },
                    },
                ],
            })
        }
    }

    function handleChat() {
        console.log('Start chatting')
    }

    async function handleBookMark() {
        if (isLogin) {
            await useBookmark(paramId)
        } else {
            alert('로그인이 필요합니다.')
        }
    }

    if (isLoading) return <PostDetailLayout>loading</PostDetailLayout>

    if (error instanceof Error)
        return <PostDetailLayout>{error.message}</PostDetailLayout>

    return (
        <PostDetailLayout>
            <PostDetailRow marginBottom="60px">
                <PostDetailHeader>
                    <HeaderDetailBox
                        justifyContent="space-between"
                        marginBottom="38px"
                    >
                        <TitleBox fontSize="32px">
                            {`[${
                                apiResponse.data.postState === 'ON'
                                    ? '모집중'
                                    : '모집완료'
                            }] `}
                            {apiResponse.data.title}
                        </TitleBox>
                        <ButtonBox>
                            {accountId === apiResponse.data.accountId ? (
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
                                        isAuthor={
                                            accountId ===
                                            apiResponse.data.accountId
                                        }
                                        isLogin={isLogin}
                                        isBookmarked={
                                            apiResponse.data.likeCheck
                                        }
                                        onClick={handleBookMark}
                                    />
                                </>
                            )}
                        </ButtonBox>
                    </HeaderDetailBox>
                    <HeaderDetailBox>
                        <InfoBox>
                            <ProfileBox>
                                <ProfileImageBox>
                                    {apiResponse.data.profileImg ? (
                                        <img
                                            src={apiResponse.data.profileImg}
                                            alt="profileImage"
                                        />
                                    ) : (
                                        <Avatar
                                            src="/broken-image.jpg"
                                            sx={{
                                                width: 32,
                                                height: 32,
                                            }}
                                        />
                                    )}
                                </ProfileImageBox>
                                <NicknameSpan>
                                    {apiResponse.data.nickname}
                                </NicknameSpan>
                                {accountId === apiResponse.data.accountId ? (
                                    ''
                                ) : (
                                    <ChatButton
                                        type="button"
                                        onClick={handleChat}
                                    />
                                )}
                            </ProfileBox>
                            <Divider />
                            <DateBox>{apiResponse.data.createdAt}</DateBox>
                        </InfoBox>
                        {accountId === apiResponse.data.accountId ? (
                            <BookMarkButton
                                isAuthor={
                                    accountId === apiResponse.data.accountId
                                }
                                isLogin={isLogin}
                                isBookmarked={apiResponse.data.likeCheck}
                                onClick={handleBookMark}
                            />
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
                                    key={item.title}
                                    contents={apiResponse.data[item.value]}
                                />
                            ))}
                        </InfoBox>
                    </HeaderDetailBox>
                </PostDetailHeader>
            </PostDetailRow>
            <PostDetailRow marginBottom="48px">
                <TitleBox fontSize="24px">지원현황</TitleBox>
                <TableComponent
                    frontReqNum={apiResponse.data.frontReqNum}
                    frontendNum={apiResponse.data.frontendNum}
                    backReqNum={apiResponse.data.backReqNum}
                    backendNum={apiResponse.data.backendNum}
                    mobileReqNum={apiResponse.data.mobileReqNum}
                    mobileNum={apiResponse.data.mobileNum}
                    designReqNum={apiResponse.data.designReqNum}
                    designNum={apiResponse.data.designNum}
                    pmReqNum={apiResponse.data.pmReqNum}
                    pmNum={apiResponse.data.pmNum}
                />
            </PostDetailRow>
            <PostDetailRow>
                <TitleBox fontSize="24px">프로젝트 개요</TitleBox>
                <DividerRow marginTopBottom="24px" />
                <ContentsBox>
                    <Viewer initialValue={apiResponse.data.contentsParsed} />
                </ContentsBox>
            </PostDetailRow>
            <ApplyModal
                isShowing={isShowing}
                handleShowing={handleShowing}
                post={apiResponse.data}
            />
        </PostDetailLayout>
    )
}

export default PostDetailPage
