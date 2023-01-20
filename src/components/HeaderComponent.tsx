import styled from 'styled-components'
import { useEffect, useState } from 'react'
import useModal from 'hooks/useModal'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Menu, MenuItem } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import useGetAccountInfo from 'hooks/useGetAccountInfo'
import usePostLogOut from 'hooks/usePostLogOut'
import AccountModal from './account/AccountModal'

const HeaderComponentLayout = styled.div`
    z-index: 999;
    background-color: white;
    position: sticky;
    top: 0;
`

const HeaderComponentRow = styled.div`
    width: 1440px;
    height: 80px;
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
`

const LogoBox = styled.div`
    cursor: pointer;
`

const UtilityBox = styled.div`
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: 16px;
`

const LogInList = styled.div`
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: 16px;
    svg {
        color: #b0b0b0;
    }
`

const ChatItem = styled.button`
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
`

const AlertItem = styled(ChatItem)``

const AccountItem = styled(ChatItem)``

const AvatarImage = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
`

const Divider = styled.div`
    width: 1px;
    height: 40px;
    margin-top: 3px;
    background: #b0b0b0;
`

const LogOutList = styled.div`
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: 16px;
`

export const DefaultButton = styled.button<{ default?: boolean }>`
    width: 100px;
    height: 46px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    background-color: ${(props) =>
        props.default ? 'white' : ' var(--primary-color)'};
    color: ${(props) => (props.default ? 'var(--primary-color)' : 'white')};
    border: ${(props) =>
        props.default ? 'solid 1px var(--primary-color)' : 'none'};
    a {
        text-decoration: none;
        color: #fff;
    }
`

const DefaultButtonReversed = styled(DefaultButton)`
    border: 1px solid var(--primary-color);
    background-color: white;
    color: var(--primary-color);
`

function HeaderComponent() {
    const { isShowing, handleShowing } = useModal()
    const [isLogin, setIsLogin] = useState(false)
    const [login, setLogin] = useState(false)
    const [signup, setSignup] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const navigate = useNavigate()

    // 사용자 기본정보 API
    const { data: accountData } = useGetAccountInfo()

    // 로그아웃 API
    const postLogout = usePostLogOut(setIsLogin)

    const handleClick = (event: { currentTarget: any }) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleMypage = () => {
        navigate('/mypage')
        handleClose()
    }

    const handleLogout = () => {
        postLogout.mutate()
        navigate('/')
    }

    const handleLogin = () => {
        handleShowing()
        setLogin(true)
        setSignup(false)
    }

    const handleSignup = () => {
        handleShowing()
        setSignup(true)
        setLogin(false)
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setIsLogin(true)
        }
    }, [])
    return (
        <HeaderComponentLayout>
            <HeaderComponentRow>
                <LogoBox>
                    <a href="/">
                        <img src="/assets/images/Logo.svg" alt="logoImg" />
                    </a>
                </LogoBox>
                <UtilityBox>
                    {isLogin ? (
                        <LogInList>
                            <ChatItem type="button">
                                <ChatOutlinedIcon />
                            </ChatItem>
                            <AlertItem type="button">
                                <NotificationsOutlinedIcon />
                            </AlertItem>
                            <AccountItem type="button" onClick={handleClick}>
                                {accountData?.data.imgUrl ? (
                                    <AvatarImage
                                        src={accountData?.data.imgUrl}
                                        alt="프로필 이미지"
                                    />
                                ) : (
                                    <AccountCircleIcon />
                                )}
                            </AccountItem>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleMypage}>
                                    마이페이지
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    로그아웃
                                </MenuItem>
                            </Menu>
                            <Divider />
                            <DefaultButton type="button">글쓰기</DefaultButton>
                        </LogInList>
                    ) : (
                        <LogOutList>
                            <DefaultButton type="button" onClick={handleLogin}>
                                로그인
                            </DefaultButton>
                            <DefaultButtonReversed
                                type="button"
                                onClick={handleSignup}
                            >
                                회원가입
                            </DefaultButtonReversed>
                        </LogOutList>
                    )}
                </UtilityBox>
            </HeaderComponentRow>
            <AccountModal
                isShowing={isShowing}
                handleShowing={handleShowing}
                login={login}
                signup={signup}
                setLogin={setLogin}
                setSignup={setSignup}
            />
        </HeaderComponentLayout>
    )
}

export default HeaderComponent