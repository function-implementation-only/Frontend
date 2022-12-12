import { Link } from 'react-router-dom'
import styled from 'styled-components'
import useModal from '../../hooks/useModal'
import LoginModal from './modal/LoginModal'
import SignupModal from './modal/SignupModal'

const HeaderComponentLayout = styled.div``

function HeaderComponent() {
    const { isShowing: isLoginModalOpen, handleShowing: handleLogin } =
        useModal()
    const { isShowing: isSignupModalOpen, handleShowing: handleSignUp } =
        useModal()
    return (
        <HeaderComponentLayout>
            <Link to="/post">Post</Link>
            <button type="button" onClick={handleLogin}>
                LogIn
            </button>

            <LoginModal
                isShowing={isLoginModalOpen}
                handleShowing={handleLogin}
            />
            <button type="button" onClick={handleSignUp}>
                SignUp
            </button>
            <SignupModal
                isShowing={isSignupModalOpen}
                handleShowing={handleSignUp}
            />
        </HeaderComponentLayout>
    )
}

export default HeaderComponent
