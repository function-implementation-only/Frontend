import { getRandomColor } from 'lib/utils'
import { TechObj } from 'src/types/post'
import styled from 'styled-components'
// import TableComponent from './TableComponent'
import TagComponent from './TagComponent'

interface InformationComponentProps {
    title: string
    contentsType: string
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

const TableComponentLayout = styled.table`
    border-collapse: separate;
    border-spacing: 10px;
    position: absolute;
    top: -18px;
    width: max-content;
`

function TableComponent() {
    return (
        <TableComponentLayout>
            <tbody>
                <tr>
                    <td>프론트엔드</td>
                    <td>00 명</td>
                </tr>
                <tr>
                    <td>백엔드</td>
                    <td>00 명</td>
                </tr>
                <tr>
                    <td>디자이너</td>
                    <td>00 명</td>
                </tr>
            </tbody>
        </TableComponentLayout>
    )
}

export default function InformationComponent({
    title,
    contentsType,
    contents,
}: InformationComponentProps) {
    if (typeof contents === 'string') contents = [contents]
    return (
        <InformationComponentLayout>
            <TitleBox>{title}</TitleBox>
            <ContentsBox>
                {contentsType === 'tag' ? (
                    contents.map((item) => {
                        return (
                            <TagComponent
                                backgroundColor={getRandomColor()}
                                key={typeof item === 'string' ? item : item.id}
                                title={
                                    typeof item === 'string' ? item : item.tech
                                }
                                displayCancelButton={false}
                            />
                        )
                    })
                ) : (
                    <TableComponent />
                )}
            </ContentsBox>
        </InformationComponentLayout>
    )
}
