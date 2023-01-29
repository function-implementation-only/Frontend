import { getRandomColor } from 'utils/random'
import { TechObj } from 'src/types/post'
import styled from 'styled-components'
import TagComponent from './TagComponent'

interface InformationComponentProps {
    title: string
    contents: string[] | TechObj[]
}

const InformationComponentLayout = styled.div`
    display: flex;
    align-items: center;
    column-gap: 16px;
`

const TitleBox = styled.div`
    font-weight: 700;
    font-size: 14px;
    color: var(--gray-700);
`

const ContentsBox = styled.div`
    position: relative;
    display: flex;
    column-gap: 8px;
    font-weight: 400;
    font-size: 14px;
    color: var(--gray-700);
`
export default function InformationComponent({
    title,
    contents,
}: InformationComponentProps) {
    if (typeof contents === 'string') contents = [contents]
    return (
        <InformationComponentLayout>
            <TitleBox>{title}</TitleBox>
            <ContentsBox>
                {contents.map((item) => {
                    return (
                        <TagComponent
                            backgroundColor={getRandomColor()}
                            key={typeof item === 'string' ? item : item.id}
                            title={typeof item === 'string' ? item : item.tech}
                            displayCancelButton={false}
                        />
                    )
                })}
            </ContentsBox>
        </InformationComponentLayout>
    )
}
