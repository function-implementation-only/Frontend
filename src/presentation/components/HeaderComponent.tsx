import { Link } from 'react-router-dom'
import styled from 'styled-components'

const HeaderComponentLayout = styled.div``

function HeaderComponent() {
    return (
        <HeaderComponentLayout>
            <Link to="/post">Post</Link>
        </HeaderComponentLayout>
    )
}

export default HeaderComponent
