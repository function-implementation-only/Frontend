import React from 'react'
import { useAppSelector } from 'src/store/hooks'
import styled from 'styled-components'
import RecruitingCheckBoxComponent from './checkbox/RecruitingCheckBoxComponent'
import TagComponent from './TagComponent'

const TagBarComponentLayout = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`

const TagsBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 800px;
    gap: 8px;
`

const RecruitingFilterBox = styled.div``

function TagBarComponent() {
    const tags = useAppSelector((state) => state.tagReducer.tags)
    return (
        <TagBarComponentLayout>
            <TagsBox>
                {tags.map((tag) => {
                    return (
                        <TagComponent
                            key={tag.title}
                            title={tag.title}
                            backgroundColor={tag.backgroundColor}
                        />
                    )
                })}
            </TagsBox>
            <RecruitingFilterBox>
                <RecruitingCheckBoxComponent />
            </RecruitingFilterBox>
        </TagBarComponentLayout>
    )
}

export default TagBarComponent
