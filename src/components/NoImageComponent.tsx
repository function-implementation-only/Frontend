import { faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

const NoImageComponentLayout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: max-content;
    background-color: #f8f9fa;
    border-radius: 20px;
    padding: 24px;
    p {
        font-weight: 700;
        margin-top: 10px;
    }
`

function NoImageComponent() {
    return (
        <NoImageComponentLayout>
            <FontAwesomeIcon icon={faImage} size="6x" />
            <p>No Image Avaliable</p>
        </NoImageComponentLayout>
    )
}

export default NoImageComponent
