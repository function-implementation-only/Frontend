import { Link } from 'react-router-dom'
import styled from 'styled-components'
import useModal from '../../hooks/useModal'
import LoginModal from './modal/LoginModal'
import SignupModal from './modal/SignupModal'
import Logo from '../../assets/images/Logo.svg'

const HeaderComponentLayout = styled.div`
    width: 1440px;
    background-color: white;
    position: fixed;
    display: flex;
    height: var(--header-height);
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    top: 0;
`

const HeaderComponentLogoBox = styled.div``

const HeaderComponentBtnBox = styled.div`
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: 10px;
`

const HeaderComponentBtn = styled.button<{ default?: boolean }>`
    width: 100px;
    height: 45px;
    border-radius: 100px;
    border: none;
    cursor: pointer;
    background-color: ${(props) =>
        props.default ? 'white' : ' var(--primary-color)'};
    color: ${(props) => (props.default ? 'var(--primary-color)' : 'white')};
    border: ${(props) =>
        props.default ? 'solid 1px var(--primary-color)' : 'none'};
`

function HeaderComponent() {
    const { isShowing: isLoginModalOpen, handleShowing: handleLogin } =
        useModal()
    const { isShowing: isSignupModalOpen, handleShowing: handleSignUp } =
        useModal()
    return (
        <HeaderComponentLayout>
            <HeaderComponentLogoBox>
                <Link to="/">
                    <img src={Logo} alt="logoImg" />
                </Link>
            </HeaderComponentLogoBox>
            <HeaderComponentBtnBox>
                <HeaderComponentBtn default type="button" onClick={handleLogin}>
                    로그인
                </HeaderComponentBtn>
                <Link to="/post/create">
                    <HeaderComponentBtn type="button">
                        글쓰기
                    </HeaderComponentBtn>
                </Link>
                <HeaderComponentBtn
                    default
                    type="button"
                    onClick={handleSignUp}
                >
                    회원가입
                </HeaderComponentBtn>
            </HeaderComponentBtnBox>
            <LoginModal
                isShowing={isLoginModalOpen}
                handleShowing={handleLogin}
            />
            <SignupModal
                isShowing={isSignupModalOpen}
                handleShowing={handleSignUp}
            />
        </HeaderComponentLayout>
    )
}

export default HeaderComponent
