import React from 'react'
import styled from 'styled-components'
import { TechObj } from 'types/post'

const TechImage = styled.img`
    width: 16px;
    height: 16px;
    margin-right: 12px;
`

interface TechListProps {
    techs: TechObj[]
}

function TechList({ techs }: TechListProps) {
    return (
        <div>
            {techs.map((item: TechObj) => {
                const basePath = '/assets/images/techIcon'
                const imgPath = `${basePath}/${item.tech.toLowerCase()}.svg`
                return <TechImage key={item.id} src={imgPath} alt="techImg" />
            })}
        </div>
    )
}

export default TechList
