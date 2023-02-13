import React from 'react'
import styled from 'styled-components'
import { DefaultButton } from 'components/HeaderComponent'
import Avatar from '@mui/material/Avatar'
import useGetAccountInfo from 'hooks/useGetAccountInfo'
import { useNavigate } from 'react-router-dom'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

const MyPageLayout = styled.div`
    width: 1440px;
    margin: 0 auto;
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
    font-family: 'Pretendard';
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
    font-family: 'Pretendard';
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
    font-family: 'Pretendard';
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
    font-family: 'Pretendard';
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

function MyPage() {
    const { data: accountData } = useGetAccountInfo()
    const navigate = useNavigate()

    const handleProfilePage = () => {
        navigate('/profilepage')
    }

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
        </MyPageLayout>
    )
}

export default MyPage
