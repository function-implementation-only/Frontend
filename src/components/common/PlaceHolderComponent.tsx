import styled from 'styled-components'

const PlaceHolder = styled.span`
    color: var(--gray-400);
`

interface PlaceHolderComponentProps {
    text: string
}

function PlaceHolderComponent({ text }: PlaceHolderComponentProps) {
    return <PlaceHolder>{text}</PlaceHolder>
}

export default PlaceHolderComponent
