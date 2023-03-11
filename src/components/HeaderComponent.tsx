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
import sseEvent from 'components/sse/eventSource'
import AccountModal from './account/AccountModal'
import Applications from './sse/Applications'
import ApplimentModal from './sse/ApplimentModal'
import Alram from './sse/Alram'

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
    @media (max-width: 720px) {
        max-width: 100vw;
    }
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
    position: relative;
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: 16px;
    svg {
        color: #b0b0b0;
    }
    @media (max-width: 720px) {
        .postBtn {
            display: none;
        }
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

const NotificationLayOut = styled.div<{ notiListShowing: boolean }>`
    width: 502px;
    display: ${(props) => (props.notiListShowing ? 'flex;' : 'none;')};
    flex-direction: column;
    border-radius: 5px;
    border: 1px solid #ff9c30;
    background: #ffffff;
    position: absolute;
    left: -80%;
    top: 50px;
    z-index: 40;
    box-shadow: 3px 3px 5px gray;
`
const NoApplyment = styled.div`
    display: flex;
    justify-content: center;
    width: 500px;
    heigth: 99px;
    padding: 16px;
    z-index: 30;
    background-color: #ffffff;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
        background-color: #ffecd6;
    }
`
const NotofictaionPoint = styled.div`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #ff9c30;
    top: 10px;
    left: 25%;
    position: absolute;
`
const es = sseEvent()
function HeaderComponent() {
    const { isShowing, handleShowing } = useModal()
    const [isLogin, setIsLogin] = useState(false)
    const [login, setLogin] = useState(false)
    const [signup, setSignup] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [notification, setNotification] = useState([])
    const [alram, setAlram] = useState([])
    const [applymentDetail, setApplymentDetail] = useState()
    const open = Boolean(anchorEl)
    const navigate = useNavigate()
    const [notiListShowing, setNotiListShowing] = useState(false)
    const { isShowing: applymentShowing, handleShowing: setApplymentShowing } =
        useModal()
    const domain = import.meta.env.VITE_API_END_POINT

    // sse 객체 연결콜백 (onopen), 메세지 수신 콜백(onmessage), 에러콜백(onerror)
    if (es) {
        es.onopen = () => {
            console.log('sse 이벤트 연결')
        }
        es.onmessage = (ev) => {
            if (typeof ev.data === 'object') {
                const data = JSON.parse(ev.data)
                console.log(data, '이벤트 수신 완료')
                setNotification((prev) => [data, ...prev])
                setAlram((prev) => [...prev, data])
            }
        }
        es.onerror = () => {
            console.log('sse connection Error. Trying reconnect')
        }
    }

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

    const handleWrite = () => {
        navigate('/post/create')
        handleClose()
    }

    const handleChatIconClick = () => {
        navigate('/chat')
    }

    const handleNotiListShowing = () => {
        setNotiListShowing((prev) => !prev)
    }

    const handleApplymentShowing = async (id: number) => {
        const data = await fetch(`${domain}applyments/${id}`)
        if (data.ok) {
            const result = await data.json()
            setApplymentDetail(result.data)
            handleNotiListShowing()
            setApplymentShowing()
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setIsLogin(true)
        }

        const options = {
            method: 'GET',
            headers: {
                Access_Token: localStorage.getItem('token'),
            },
        }

        async function getData() {
            const data = await fetch(`${domain}notifications/list`, options)
            if (data.ok) {
                const result = await data.json()
                setNotification(result.data)
            }
        }

        getData()
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
                            <ChatItem
                                type="button"
                                onClick={handleChatIconClick}
                            >
                                <ChatOutlinedIcon />
                            </ChatItem>
                            <AlertItem
                                type="button"
                                onClick={handleNotiListShowing}
                            >
                                <NotificationsOutlinedIcon />
                            </AlertItem>
                            {notification?.length ? (
                                <NotofictaionPoint />
                            ) : null}

                            <NotificationLayOut
                                notiListShowing={notiListShowing}
                            >
                                {notification?.length ? (
                                    notification.map((noti) => (
                                        <Applications
                                            onClick={(id) =>
                                                handleApplymentShowing(id)
                                            }
                                            detail={noti}
                                            key={noti.applymentId}
                                        />
                                    ))
                                ) : (
                                    <NoApplyment>
                                        <p>알림이 없습니다</p>
                                    </NoApplyment>
                                )}
                            </NotificationLayOut>
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
                            <DefaultButton
                                className="postBtn"
                                type="button"
                                onClick={handleWrite}
                            >
                                글쓰기
                            </DefaultButton>
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
            <ApplimentModal
                isShowing={applymentShowing}
                handleShowing={setApplymentShowing}
                detail={applymentDetail}
            />
            <Alram
                detail={alram}
                setDetail={setAlram}
                handleListShow={handleNotiListShowing}
            />
        </HeaderComponentLayout>
    )
}

export default HeaderComponent
