import React from 'react'
import styled from 'styled-components'

const LookupLayout = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
`

interface LookupInterface {
    viewCount: number
}

function Lookup({ viewCount }: LookupInterface) {
    return (
        <LookupLayout>
            <img src="/assets/images/lookup.svg" alt="lookupImg" /> {viewCount}
        </LookupLayout>
    )
}

export default Lookup
