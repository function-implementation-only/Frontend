import React from 'react'
import styled from 'styled-components'

const LookupLayout = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
`
function Lookup() {
    return (
        <LookupLayout>
            <img src="/assets/images/lookup.svg" alt="lookupImg" /> 0
        </LookupLayout>
    )
}

export default Lookup
