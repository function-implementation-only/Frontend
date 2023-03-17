import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { DefaultButton } from 'components/HeaderComponent'
import Avatar from '@mui/material/Avatar'
import useGetAccountInfo from 'hooks/useGetAccountInfo'
import { useNavigate } from 'react-router-dom'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { POST_TABS } from 'lib/constants'
import TabComponent from 'components/TabComponent'
import PostCardComponent from 'components/postcard/PostCardComponent'
import { ContentResponse } from 'types/response'
import useServiceManager from 'hooks/useServiceManager'
import PostCardSkeletonComponent from 'components/skeleton/PostCardSkeletonComponent'

const MyPageLayout = styled.div`
    width: 1440px;
    margin: 0 auto;
    padding-bottom: 129px;
    @media (max-width: 720px) {
        width: 100vw;
    }
`

const ThemeBox = styled.div`
    padding: 36px 24px 24px;
    svg {
        display: none;
    }
    @media (max-width: 720px) {
        padding: 21px 24px 45px;
        svg {
            display: inline-block;
            vertical-align: bottom;
        }
    }
`

const ThemeItem = styled.span`
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    margin: 36px 0 60px;
    @media (max-width: 720px) {
        font-size: 18px;
    }
`

const AccountInfoBox = styled.div`
    display: flex;
`

const AccountInfoList = styled.div`
    width: 1440px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: start;
    button {
        margin-left: 598px;
    }
    .avatar {
        width: 150px;
        height: 150px;
        margin-right: 36px;
    }
    @media (max-width: 720px) {
        justify-content: start;
        align-items: center;
        button {
            margin: 16px 0px 0px;
        }
        .avatar {
            width: 80px;
            height: 80px;
            margin-right: 24px;
        }
    }
`
const AccountDetailBox = styled.div`
    display: flex;
    @media (max-width: 720px) {
        flex-direction: column;
    }
`

const AccountDetailList = styled.div`
    display: flex;
    flex-direction: column;
`

const AccountNameItem = styled.span`
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    margin: 11.5px 0 4px;
    @media (max-width: 720px) {
        font-size: 16px;
    }
`

const AccountFieldItem = styled.span`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    @media (max-width: 720px) {
        font-size: 12px;
    }
`

const AccountDividerItem = styled.span`
    color: #ced4da;
    margin: 0 8px;
    @media (max-width: 720px) {
        margin: 0 4px;
    }
`

const AccountTimeItem = styled.span`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #b0b0b0;
    @media (max-width: 720px) {
        font-size: 12px;
    }
`

const AccountIntroductionItem = styled.p`
    width: 500px;
    height: 55px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 16px;
    padding: 16px 8px;
    gap: 10px;
    border: 1px solid #ff9c30;
    border-radius: 5px;
    span {
        color: #b0b0b0;
    }
    @media (max-width: 720px) {
        display: none;
    }
`

const AvatarImage = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 36px;
    @media (max-width: 720px) {
        width: 80px;
        height: 80px;
        margin-right: 24px;
    }
`

const PostBox = styled.div`
    margin-top: 52px;
`
const TabBox = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`
const PostCardsBox = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 52px 34px 34px;
    position: relative;
    grid-gap: 24px;

    span {
        font-weight: 700;
        font-size: 24px;
        position: absolute;
        left: 50%;
        top: 266px;
        transform: translate(-50%, -50%);
    }
`
function MyPage() {
    const { data: accountData } = useGetAccountInfo()
    const navigate = useNavigate()
    const serviceManger = useServiceManager()

    const [selectedTab, setSelectedTab] = useState('북마크')
    const [myPosts, setMyPosts] = useState([])

    const [isLoading, setIsloading] = useState(false)

    const handleProfilePage = () => {
        navigate('/profilepage')
    }

    async function getMyBookmarks() {
        const { data } =
            await serviceManger.dataService.accountAPI.getMyBookmarks()
        return data.data
    }
    async function getMyPosts() {
        const { data } = await serviceManger.dataService.accountAPI.getMyPosts()
        return data.data
    }
    async function getMyApplyments() {
        const { data } =
            await serviceManger.dataService.accountAPI.getMyApplyments()

        return data.data
    }

    async function setPostsState() {
        setIsloading(true)
        switch (selectedTab) {
            case '북마크':
                setMyPosts(await getMyBookmarks())
                setIsloading(false)
                break
            case '작성 공고':
                setMyPosts(await getMyPosts())
                setIsloading(false)
                break
            case '지원 공고':
                setMyPosts(await getMyApplyments())
                setIsloading(false)
                break
            default:
                break
        }
    }
    useEffect(() => {
        setPostsState()
    }, [])

    useEffect(() => {
        setPostsState()
    }, [selectedTab])

    return (
        <MyPageLayout>
            <ThemeBox>
                <a href="/">
                    <ArrowBackIosIcon fontSize="small" />
                </a>

                <ThemeItem>마이페이지</ThemeItem>
            </ThemeBox>
            <AccountInfoBox>
                <AccountInfoList>
                    {accountData?.data.imgUrl ? (
                        <AvatarImage
                            src={accountData?.data.imgUrl}
                            alt="프로필 이미지"
                        />
                    ) : (
                        <Avatar className="avatar" src="/broken-image.jpg" />
                    )}
                    <AccountDetailBox>
                        <AccountDetailList>
                            <AccountNameItem>
                                {accountData?.data.nickname}
                            </AccountNameItem>
                            <div>
                                <AccountFieldItem>
                                    {accountData?.data.field}
                                </AccountFieldItem>
                                <AccountDividerItem>|</AccountDividerItem>
                                <AccountTimeItem>
                                    {accountData?.data.availableTime}
                                </AccountTimeItem>
                            </div>
                            <AccountIntroductionItem>
                                {accountData?.data.introduction === '' ? (
                                    <span>자기 소개가 없습니다</span>
                                ) : (
                                    accountData?.data.introduction
                                )}
                            </AccountIntroductionItem>
                        </AccountDetailList>
                        <DefaultButton onClick={handleProfilePage}>
                            프로필 수정
                        </DefaultButton>
                    </AccountDetailBox>
                </AccountInfoList>
            </AccountInfoBox>
            <PostBox>
                <TabBox>
                    {POST_TABS.map((item) => {
                        return (
                            <TabComponent
                                title={item.title}
                                selectedTabTitle={selectedTab}
                                tabHandler={setSelectedTab}
                                key={item.title}
                            />
                        )
                    })}
                </TabBox>
                <PostCardsBox>
                    {isLoading ? (
                        <PostCardSkeletonComponent number={6} />
                    ) : myPosts.length > 0 ? (
                        myPosts.map((item: ContentResponse) => {
                            return (
                                <PostCardComponent
                                    post={item}
                                    key={item.postId}
                                />
                            )
                        })
                    ) : (
                        <span>{`${selectedTab}가 없습니다.`}</span>
                    )}
                </PostCardsBox>
            </PostBox>
        </MyPageLayout>
    )
}

export default MyPage
