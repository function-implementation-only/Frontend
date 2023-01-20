import React from 'react'
import styled from 'styled-components'
import { DefaultButton } from 'components/HeaderComponent'
import Avatar from '@mui/material/Avatar'
import useGetAccountInfo from 'hooks/useGetAccountInfo'
import { useNavigate } from 'react-router-dom'

const MyPageLayout = styled.div`
    form {
        width: 638px;
    }
`

const ThemeBox = styled.div`
    width: 1440px;
    margin: 0 auto;
    padding: 36px 24px 24px;
    // display: flex;
    // align-items: center;
`

const ThemeItem = styled.span`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    margin: 36px 0 60px;
`

const AccountInfoBox = styled.div`
    width: 1440px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    padding: 0 24px;
`

const AccountInfoList = styled.div`
    display: flex;
    align-items: center;
`

const AccountNameItem = styled.span`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
`

const AccountFieldItem = styled.span`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
`

const AccountDividerItem = styled.span`
    color: #ced4da;
    margin: 0 8px;
`

const AccountTimeItem = styled.span`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #b0b0b0;
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
                <ThemeItem>마이페이지</ThemeItem>
            </ThemeBox>
            <AccountInfoBox>
                <AccountInfoList>
                    <Avatar
                        src="/broken-image.jpg"
                        sx={{ width: 150, height: 150, mr: '36px' }}
                    />
                    <div>
                        <AccountNameItem>
                            {accountData?.data.nickname}
                        </AccountNameItem>
                        <br />
                        <AccountFieldItem>
                            {accountData?.data.field}
                        </AccountFieldItem>
                        <AccountDividerItem>|</AccountDividerItem>
                        <AccountTimeItem>
                            {accountData?.data.availableTime}
                        </AccountTimeItem>
                        <br />
                        <AccountIntroductionItem>
                            {accountData?.data.introduction}
                        </AccountIntroductionItem>
                    </div>
                </AccountInfoList>
                <DefaultButton onClick={handleProfilePage}>
                    프로필 수정
                </DefaultButton>
            </AccountInfoBox>
        </MyPageLayout>
    )
}

export default MyPage
